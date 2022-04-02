const fs = require('fs');

let users = require('../../assets/data/users.json');

const saveData = () => {
    fs.writeFileSync('assets/data/users.json', JSON.stringify(users, null, 4));
}

const create = ({name, password, hash, email, phoneNumber}) => {
    const user = {name, password, hash, email, phoneNumber};

    // validate
    if (users.find(x => x.email === user.email))
        throw `User with the email ${user.email} already exists`;

    // if (users.find(x => x.username === user.username))
    //     throw `User with the username "${user.username}" already exists`;

    // generate new user id
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

const update = (id, {name, password, email, phoneNumber}) => {
    const params = {name, password, email, phoneNumber};
    const user = users.find(x => x.id.toString() === id.toString());

    // validate
    if (params.email !== user.email && users.find(x => x.email === params.email))
        throw `User with the email ${params.email} already exists`;

    // only update password if entered
    if (!params.password) {
        delete params.password;
    }

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

export const userRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
}
