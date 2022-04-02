import {userService} from "../services/";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const authHeader = (url) => {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

const handleResponse = (response) => {
    if (response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
}

const get = (url: string) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse)
};

const post = (url, body) => {
    const requestOptions = {
        method: 'POST',
        // headers: {'Content-Type': 'application/json', ...authHeader(url)},
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const put = (url, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', ...authHeader(url)},
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
};


export const fetchWrapper = {
    get,
    post,
    put,
}

