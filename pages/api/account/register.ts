import {NextApiRequest, NextApiResponse} from "next";

const bcrypt = require('bcryptjs');
import nc from 'next-connect';

import User from '../../../server/models/User';
import {signToken} from '../../../server/middlewares/auth';
import db from "../../../server/db/db";
import {ROLE_OPTIONS, USER_STATUS} from "../../../utils/enums";
import {sendResultRegister} from "../../../server/middlewares/mailer";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    if (await User.findOne({email: req.body.email})) {
      res.status(409).send({message: `Email "${req.body.email}" already exists`});
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      role: ROLE_OPTIONS.CUSTOMER,
      status: USER_STATUS.ACTIVE
    });

    const user = await newUser.save();
    await db.disconnect();

    // @ts-ignore
    await sendResultRegister({email: req.body.email});

    const token = signToken(user);
    // res.send({
    //   token,
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   status: USER_STATUS.ACTIVE
    // });

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: USER_STATUS.ACTIVE
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;
