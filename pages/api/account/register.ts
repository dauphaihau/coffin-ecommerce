import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import User from '../../../models/User';
import {signToken} from '../../../utils/middlewares/auth';
import db from "../../../utils/db/db";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    if (await User.findOne({email: req.body.email})) {
        res.status(409).send({message: `Email "${req.body.email}" already exists`});
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: 'customer'
    });

    const user = await newUser.save();
    await db.disconnect();

    const token = signToken(user);
    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
});

export default handler;
