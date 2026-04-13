import { api } from '../utils/http_client';

interface loginRequest {
    email: string;
    password: string;
}

interface loginResponse {
    access_token: string;
    token_type: string;
}

interface getUserResponse {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    documento: string;
    activo : boolean;
    created_at: string;
    updated_at: string;
}

const login = async (credentials: loginRequest) => {
    return api.post<loginResponse>('auth/login', credentials);
}

const logout = async () => {
    return api.post('auth/logout');
}

const getUser = async () => {
    return api.get<getUserResponse>('user');
}

export default {
    login,
    logout,
    getUser
}