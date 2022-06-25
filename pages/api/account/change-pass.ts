import nc from 'next-connect';
import User from '../../../server/models/User';
import db from "../../../server/db/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, password, newPassword} = req.body;
  try {
    await db.connect();
    let user = await User.findOne({email});
    if (!user) return res.status(422).send({code: '422', messages: 'User doesn\'t exist'});
    if (user && password !== user.password) {
      res.status(401).send({
        code: '401',
        message: 'Password not match'
      });
    }
    user.password = newPassword;
    await user.save();
    await db.disconnect();
    res.send({code: '200', message: 'OK'});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default handler;