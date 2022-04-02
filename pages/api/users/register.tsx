import {NextApiRequest, NextApiResponse} from "next";

const bcrypt = require('bcryptjs');

import {apiHandler} from "../../../helper/api";
import {userRepo} from "../../../helper/api";

export default apiHandler({
    post: register
});

function register(req: NextApiRequest, res: NextApiResponse) {
    console.log('req-body', req.body)
    const {password, ...user} = req.body;

    // validate
    if (userRepo.find(x => x.email === user.email))
        throw `User with the email "${user.email}" already exists`;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);
    console.log('user', user)

    userRepo.create(user);
    return res.status(200).json({});
}
