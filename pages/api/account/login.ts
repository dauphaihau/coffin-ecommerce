import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';

const bcrypt = require('bcryptjs');
const CryptoJS = require("crypto-js");

import User from '../../../server/models/User';
import db from "../../../server/db/db";
import {signToken} from '../../../server/middlewares/auth';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, password} = req.body;
  try {
    await db.connect();
    const user = await User.findOne({email});
    if (!user) {
      return res.status(422).send({code: '422', messages: 'Invalid credentials!'})
    }
    await db.disconnect();


    // register or user login post password was encrypted
    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    // // console.log('test', ciphertext)
    //
    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    // console.log('bytes', bytes)
    //
    //
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //
    // // console.log('test', bytes)
    // console.log('test', originalText)
    // console.log('test', originalText === 'my message')

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      res.json(
        {
          code: '200',
          message: 'You have been successfully logged in',
          data: {
            auth: {
              token,
              expireAt: 1654420589070,
              refreshAt: 1654420589070,
            },
            profile: {
              name: user.name,
              role: user.role,
              status: user.status,
            }
          }
        });
    } else {
      res.status(422).send({message: 'Invalid password!'});
    }

  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default handler;