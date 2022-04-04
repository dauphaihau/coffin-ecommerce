import {NextApiRequest, NextApiResponse} from "next";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import {apiHandler, userRepo} from "../../../helper/api";

const {serverRuntimeConfig} = getConfig();

export default apiHandler({
    post: authenticate
});

function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const {email, password} = req.body;
    const user = userRepo.find(u => u.email === email);

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    const token = jwt.sign({sub: user.id}, serverRuntimeConfig.secret, {expiresIn: '7d'});

    return res.status(200).json({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        token
    });
}
