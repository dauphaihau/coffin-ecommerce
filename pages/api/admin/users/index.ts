import {NextApiRequest, NextApiResponse} from 'next';
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import User from '../../../../server/models/User';
import {isAuth, rolesCanCreate, rolesCanView} from '../../../../server/middlewares/auth';
import db from '../../../../server/db/db';
import {sendResetPasswordEmail} from '../../../../server/middlewares/mailer';
import Token from '../../../../server/models/Token';
import {USER_STATUS} from '../../../../utils/enums';

const bcryptSalt = process.env.BCRYPT_SALT;

const handler = nc();
handler.use(isAuth, rolesCanView);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const limit = Number(req.query.limit)
  const skip = Number(req.query.skip)
  const total = await User.countDocuments();
  const users = await User.find({}).limit(limit).skip(skip);
  await db.disconnect();
  res.send({
    list: users,
    total
  });
});

handler.use(rolesCanCreate);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, name, address, phone, role, avatar, sendSetPasswordEmail} = req.body
  try {
    await db.connect();
    if (await User.findOne({email})) {
      res.status(409).send({message: `'${email}' already exists`});
    }
    const newUser = new User({
      name,
      email,
      avatar,
      address,
      phone,
      role,
      status: USER_STATUS.NOT_ACTIVATED
    });
    await newUser.save();

    if (!sendSetPasswordEmail) {
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
      message: 'created user updated successfully'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;