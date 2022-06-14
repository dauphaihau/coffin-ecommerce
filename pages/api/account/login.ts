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
    if (!user) return res.status(422).send({code: '422', messages: 'User doesn\'t exist'});
    await db.disconnect();

    // const key = 'dauphaihau';
    // const keyutf = CryptoJS.enc.Utf8.parse(key);
    // const iv = CryptoJS.enc.Base64.parse(key);
    //
    // const dec = CryptoJS.AES.decrypt(
    //   {ciphertext: CryptoJS.enc.Base64.parse(user.password)},
    //   keyutf,
    //   {iv}
    // );
    // const decPassword = CryptoJS.AES.decrypt(
    //   {ciphertext: CryptoJS.enc.Base64.parse(password)},
    //   keyutf,
    //   {iv}
    // );
    // const decStr = CryptoJS.enc.Utf8.stringify(dec)
    // const decStrPassword = CryptoJS.enc.Utf8.stringify(decPassword)

    // console.log('dec-str', decStr)
    // console.log('dec-password', decStrPassword)
    // console.log('compare', decStrPassword === decStr)

    // if (user && decStrPassword === decStr) {
    if (user && password === user.password) {
    // if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      res.json(
        {
          code: '200',
          message: 'You have been successfully logged in',
          data: {
            auth: {
              token,
              expireAt: new Date(Date.now() + 8 * 3600000),
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