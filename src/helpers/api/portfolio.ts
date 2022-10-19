import { APICore } from './apiCore';

const api = new APICore();


function getPortfolio(params: { username: string }) {
    const baseUrl: string = `/api/user/${params.username}/`;
    return api.get(`${baseUrl}`, {});
}

export { getPortfolio };
