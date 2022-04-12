import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from "../../../utils/db/db";
import {signToken} from '../../../utils/middlewares/auth';
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

    await db.connect();
    const user = await User.findOne({email: req.body.email});
    await db.disconnect();

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = signToken(user);
        res.send({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401).send({message: 'Invalid email or password'});
    }
});

export default handler;