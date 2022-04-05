import {userRepo} from "../../../helper/api";

export default (req, res) => {
    switch (req.method) {
        case 'GET':
            return getUserById();
        case 'PUT':
            return updateUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    function getUserById() {
        const users = userRepo.getById(req.query.id);
        return res.status(200).json(users);
    }

    function updateUser() {
        try {
            const users = userRepo.update(req.query.id, req.body);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({message: error});
        }
    }

}
