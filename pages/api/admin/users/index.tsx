import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import {NextApiRequest, NextApiResponse} from "next";
import {isAdmin, isAuth} from "../../../../utils/middlewares/auth";
import db from "../../../../utils/db/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.send(users);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    if (await User.findOne({email: req.body.email})) {
        res.status(409).send({message: `"${req.body.email}" already exists`});
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password),
        role: 'customer'
    });
    await newUser.save();
    await db.disconnect();
    res.status(200).send({message: 'created user success'});
});

export default handler;