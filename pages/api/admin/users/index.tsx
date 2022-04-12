import nc from 'next-connect';
import User from '../../../../models/User';
import {NextApiRequest, NextApiResponse} from "next";
import {isAdmin, isAuth} from "../../../../utils/middlewares/auth";
import db from "../../../../utils/db/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    handler.use(isAuth, isAdmin);
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
});

export default handler;