import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';

import User from '../../../server/models/User';
import {signToken} from '../../../server/middlewares/auth';
import db from "../../../server/db/db";
import {ROLE_OPTIONS, USER_STATUS} from "../../../utils/enums";
import {sendResultRegister} from "../../../server/middlewares/mailer";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, name, password} = req.body
  try {
    await db.connect();
    if (await User.findOne({email})) {
      res.status(409).send({message: `Email "${email}" already exists`});
    }
    const newUser = new User({
      name, email, password,
      role: ROLE_OPTIONS.CUSTOMER,
      status: USER_STATUS.ACTIVE
    });
    const user = await newUser.save();
    await db.disconnect();

    await sendResultRegister({email});
    const token = signToken(user);
    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: {
            token,
            expireAt: 1654420589070,
            refreshAt: 1654420589070,
          },
          profile: {
            name: user.name,
            email: user.email,
            role: user.role,
            status: USER_STATUS.ACTIVE
          }
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;
