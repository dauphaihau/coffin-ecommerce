import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import crypto from "crypto";

import User from '../../../../server/models/User';
import {isAuth, rolesCanCreate, rolesCanView} from "../../../../server/middlewares/auth";
import db from "../../../../server/db/db";
import {sendResetPasswordEmail} from '../../../../server/middlewares/mailer';
// const {sendResetPasswordEmail} = require('../../../');
// const {sendResetPasswordEmail} = require('../../../server/middlewares/mailer');
import Token from "../../../../server/models/Token";
import {USER_STATUS} from "../../../../utils/enums";

const bcryptSalt = process.env.BCRYPT_SALT;

const handler = nc();
handler.use(isAuth, rolesCanView);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const total = await User.countDocuments();
  const users = await User.find({});
  await db.disconnect();
  const data = {
    list: users,
    total
  }
  res.send(data);
});

handler.use(rolesCanCreate);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    if (await User.findOne({email: req.body.email})) {
      res.status(409).send({message: `"${req.body.email}" already exists`});
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      // isVerified: false,
      // isBanned: req.body.isBanned,
      // isBanned: false,
      phone: req.body.phone,
      // phoneNumber: req.body.phoneNumber,
      // password: bcrypt.hashSync(req.body.password),
      role: req.body.role,
      status: USER_STATUS.NOT_ACTIVATED
    });
    await newUser.save();

    let user = await User.findOne({email: req.body.email});
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

    await db.disconnect();
    return res.send({
      status: '200',
      message: 'created user success'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;