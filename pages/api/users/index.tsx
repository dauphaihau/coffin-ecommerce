import {userRepo} from "../../../helper/api";
import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case 'GET':
            return getUsers();
        case 'POST':
            return createUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getUsers() {
        const users = userRepo.getAll();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).send('Not Found!')
        }
    };

    function createUser() {
        try {
            userRepo.create(req.body)
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({message: error});
        }

    }

}

export default handler;