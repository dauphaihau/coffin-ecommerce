// import {NextApiRequest, NextApiResponse} from "next";
// import getConfig from 'next/config';
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const {serverRuntimeConfig} = getConfig();
//
// import {apiHandler} from "../../../helper/api";
// import {userRepo} from "../../../helper/api";
//
// export default apiHandler({
//     post: register
// });
//
// function register(req: NextApiRequest, res: NextApiResponse) {
//     const {password, ...user} = req.body;
//
//     if (userRepo.find(x => x.email === user.email))
//         throw `User with the email "${user.email}" already exists`;
//
//     user.hash = bcrypt.hashSync(password, 10);
//     userRepo.create(user);
//
//     const token = jwt.sign({sub: user.id}, serverRuntimeConfig.secret, {expiresIn: '7d'});
//
//     return res.status(200).json({
//         id: user.id,
//         email: user.email,
//         password: user.password,
//         name: user.name,
//         token
//     });
// }

import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import {signToken} from '../../../utils/middlewares/auth';
import db from "../../../utils/db/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        // password: bcrypt.hashSync(password, salt),
        // password: req.body.password,
        isAdmin: false,
    });

    const user = await newUser.save();
    await db.disconnect();

    const token = signToken(user);
    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

export default handler;
