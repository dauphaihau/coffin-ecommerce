import nc from 'next-connect';
import User from '../../../server/models/User';
import db from "../../../server/db/db";
import {NextApiRequest, NextApiResponse} from "next";
import {encryptText} from "../../../utils/helpers";
import config from "../../../config.json";

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, password, newPassword} = req.body;

  try {
    await db.connect();
    let user = await User.findOne({email});
    if (user && password !== user.password) {
      res.status(401).send({
        code: '401',
        message: 'Password not match'
      });
    }
    user.password = encryptText(newPassword, config.cryptoKey)
    await user.save();
    await db.disconnect();
    res.send({
      code: '200',
      message: 'Updated Successfully'
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default handler;