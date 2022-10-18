import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
    const baseUrl = '/api/rest-auth/login/';
    return api.create(`${baseUrl}`, params);
}

function logout() {
    const baseUrl = '/api/rest-auth/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: { username: string; email: string; password1: string, password2: string }) {
    const baseUrl = '/api/rest-auth/registration/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function getPortfolio(params: { username: string }) {
    const baseUrl: string = `/api/user/${params.username}/`;
    return api.get(`${baseUrl}`, {});
}

export { login, logout, signup, forgotPassword, getPortfolio };
