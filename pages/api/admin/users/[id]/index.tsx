import User from "../../../../../models/User";
import db from "../../../../../utils/db/db";
import {isAdmin, isAuth} from "../../../../../utils/middlewares/auth";
import nc from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    await db.disconnect();
    res.send(user);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (user) {
        await user.remove();
        await db.disconnect();
        res.send({message: 'User Deleted'});
    } else {
        await db.disconnect();
        res.status(404).send({message: 'User Not Found'});
    }
});

export default handler;