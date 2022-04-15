import nc from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import User from "../../../../../models/User";
import db from "../../../../../utils/db/db";
import {isAuth, rolesCanView, rolesCanDelete, rolesCanUpdate,} from "../../../../../utils/middlewares/auth";

const handler = nc();
handler.use(isAuth, rolesCanView);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    await db.disconnect();
    res.send(user);
});

handler.use(rolesCanUpdate);
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (user) {
        user.name = req.body.name;
        user.password = req.body.password;
        user.address = req.body.address;
        user.email = req.body.email;
        user.color = req.body.color;
        user.phoneNumber = req.body.phoneNumber;
        user.role = req.body.role;
        await user.save();
        await db.disconnect();
        res.send({ message: 'User Updated Successfully' });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'User Not Found' });
    }
});

handler.use(rolesCanDelete)
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