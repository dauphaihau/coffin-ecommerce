import {NextApiRequest, NextApiResponse} from "next";
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import {apiHandler, userRepo} from "../../../helper/api";

const {serverRuntimeConfig} = getConfig();

export default apiHandler({
    // post: updatePassword
});

function updatePassword(req: NextApiRequest, res: NextApiResponse) {
    console.log('req-body', req.body)
    const {id, password, newPassword} = req.body;
    const user = userRepo.find(u => u.id === id);

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'old password is incorrect';
    } else {
        user.hash = bcrypt.hashSync(newPassword, 10);
        console.log('user', user)
        try {
            userRepo.update(id, user);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({message: error});
        }
    };

    // return res.status(200).json({});
}
