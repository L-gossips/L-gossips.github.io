import { userService } from "../service/userService.js";
import { api } from "./requests.js";

const host = "https://parseapi.back4app.com/classes/";

const endpoints = {
    register: '/users',
    login: '/login',
    logout: '/logout'
};

 async function register(username, password) {
    const result = await api.post(host + endpoints.register, { username, password });
    
    const userData = {
        username: username,
        objectId: result.objectId,
        sessionToken: result.sessionToken
    };
    userService.setUser(userData);
}

 async function login(username, password) {
    const result = await api.post(host + endpoints.login, { username, password });
    
    const userData = {
        username: username.username,
        objectId: result.objectId,
        sessionToken: result.sessionToken
    };

    userService.setUser(userData);
}

 async function logout() {
    await api.post(host + endpoints.logout);

    userService.removeUser();
}
async function getAll(){
    return await api.get(host + endpoints.register);
}
export const userUtils = {
    register,
    login,
    logout,
    getAll
}