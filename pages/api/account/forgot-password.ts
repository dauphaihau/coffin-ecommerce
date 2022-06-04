import nc from 'next-connect';
import crypto from 'crypto';
const bcrypt = require('bcryptjs');
import {NextApiRequest, NextApiResponse} from 'next';
const {sendResetPasswordEmail} = require('../../../server/middlewares/mailer');

const bcryptSalt = process.env.BCRYPT_SALT;
import User from '../../../server/models/User';
import Token from '../../../server/models/Token';
import db from '../../../server/db/db';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    let user = await User.findOne({email: req.body.email});
    if (!user) res.send({
      status: '401',
      message: 'User does not exists! '
    });

    let token = await Token.findOne({userId: user._id});
    if (token) await token.deleteOne();

    // token will send to the user
    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await sendResetPasswordEmail({toUser: user, token: hash});
    // await sendResetPasswordEmail({toUser: user, hash: hash._id});

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    await db.disconnect();

    return res.send({
      status: '200',
      message: 'Please check your email to reset the password!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;