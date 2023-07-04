import { HTTPTransport } from "../utils/HTTPTransport";

const url = 'https://ya-praktikum.tech/api/v2/auth/';


type LoginData = {
    login: string;
    password: string;
}

type RegisterData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export default class AuthApi {

    _transport : HTTPTransport;

    constructor() {
        this._transport = new HTTPTransport();
    }

    public async login( data : LoginData) {

        const response = await this._transport.post(`${url}signin`, { data });

        return response.responseText;

    }
    public async register(user: RegisterData) {

        const response = await this._transport.post('/auth/signup', { data: user });

        return response.responseText;
    }

    public async logout() {

        const response = await this._transport.post('/auth/logout');

        return response.responseText;
        
    }

    public async getUser() {

        const response = await this._transport.get('/auth/user');

        return response;

    }
}

export const authApi = new AuthApi();