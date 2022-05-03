import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../server/models/User';
import {isAuth, rolesCanCreate, rolesCanView} from "../../../../server/middlewares/auth";
import db from "../../../../server/db/db";

const handler = nc();
handler.use(isAuth, rolesCanView);
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
});

handler.use(rolesCanCreate);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    if (await User.findOne({email: req.body.email})) {
        res.status(409).send({message: `"${req.body.email}" already exists`});
    }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        isVerified: false,
        // isBanned: req.body.isBanned,
        isBanned: false,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
    });
    await newUser.save();
    await db.disconnect();

    res.status(200).send({message: 'created user success'});
});

export default handler;