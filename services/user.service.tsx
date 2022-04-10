import {BehaviorSubject} from "rxjs";
import getConfig from "next/config";

import {fetchWrapper} from "../helper";

const {publicRuntimeConfig} = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const register = (user) => {
    return fetchWrapper.post(`${baseUrl}/register`, user)
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}
//

const login = (email, password) => {
    return fetchWrapper.post(`${baseUrl}/authenticate`, {email, password})
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}

const getAll = () => {
    return fetchWrapper.get(baseUrl)
};

const getById = (id) => {
    return fetchWrapper.get(`${baseUrl}/${id}`)
};

const create = (params) => {
    return fetchWrapper.post(baseUrl, params);
};

const update = (id, params, type) => {
    if (type === 'updatePassword') {
        console.log('base-url', baseUrl)
        return fetchWrapper.put(`${baseUrl}/updatePassword`, params)
    }
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
};

export const userService = {
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value
    },
    register,
    login,
    getAll,
    getById,
    create,
    update,
};
