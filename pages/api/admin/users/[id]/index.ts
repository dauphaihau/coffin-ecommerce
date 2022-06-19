import nc from "next-connect";
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import {NextApiRequest, NextApiResponse} from "next";

import User from "../../../../../server/models/User";
import db from "../../../../../server/db/db";
import {isAuth, rolesCanView, rolesCanDelete, rolesCanUpdate,} from "../../../../../server/middlewares/auth";
import Token from "../../../../../server/models/Token";
import {sendResetPasswordEmail} from "../../../../../server/middlewares/mailer";

const bcryptSalt = process.env.BCRYPT_SALT;

const handler = nc();
handler.use(isAuth, rolesCanView);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
});

handler.use(rolesCanUpdate);
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, name, status, avatar, address, phone, role} = req.body
  try {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (!user) res.status(404).send({message: 'User Not Found'});

    user.name = name;
    user.address = address;
    user.email = email;
    user.avatar = avatar;
    user.phone = phone;
    user.status = status;
    user.role = role;
    await user.save();

    if (req.body.sendResetPasswordEmail) {
      let user = await User.findOne({email});
      if (!user) res.send({
        status: '401',
        message: 'User does not exists! '
      });

      let resetToken = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
      await sendResetPasswordEmail({toUser: user, token: hash});
      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();
    }
    await db.disconnect();
    return res.send({
      status: '200',
      message: 'updated user successfully'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

handler.use(rolesCanDelete)
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (!user) res.status(404).send({message: 'User Not Found'});
  await user.remove();
  await db.disconnect();
  res.send({code: '200', message: 'User Deleted'});
});

export default handler;