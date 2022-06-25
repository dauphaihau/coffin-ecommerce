import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';
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
    if (password !== user.password) {
      res.status(422).send({message: 'Invalid password!'});
    }
    const token = signToken(user);
    res.json(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: {
            token,
            expireAt: new Date(Date.now() + 8 * 3600000),
            refreshAt: 1654420589070,
          },
          profile: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            status: user.status,
          }
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;