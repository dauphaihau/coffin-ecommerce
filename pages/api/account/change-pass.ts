import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../server/models/User';
import db from "../../../server/db/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {

  await db.connect();
  let user = await User.findOne({email: req.body.email});

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    user.password = bcrypt.hashSync(req.body.newPassword)
    await user.save();
    await db.disconnect();
    res.send({message: 'Updated Successfully'});
  } else {
    await db.disconnect();
    res.status(401).send({message: 'Password not match'});
  }
});

export default handler;