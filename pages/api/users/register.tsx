import {NextApiRequest, NextApiResponse} from "next";
import getConfig from 'next/config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {serverRuntimeConfig} = getConfig();

import {apiHandler} from "../../../helper/api";
import {userRepo} from "../../../helper/api";

export default apiHandler({
    post: register
});

function register(req: NextApiRequest, res: NextApiResponse) {
    const {password, ...user} = req.body;

    if (userRepo.find(x => x.email === user.email))
        throw `User with the email "${user.email}" already exists`;

    user.hash = bcrypt.hashSync(password, 10);
    userRepo.create(user);

    const token = jwt.sign({sub: user.id}, serverRuntimeConfig.secret, {expiresIn: '7d'});

    return res.status(200).json({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        token
    });
}
