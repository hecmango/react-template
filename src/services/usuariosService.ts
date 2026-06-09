import { api } from '../utils/http_client';

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    documento: string;
    activo: boolean;
}

export interface LaravelPaginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface ListadoParams {
    page?: number;
    per_page?: number;
    instructor?: boolean | number;
    estudiante?: boolean | number;
}

const listado = async (params: ListadoParams) => {
    return api.get<LaravelPaginated<Usuario>>('usuarios/listado', { params });
}

export default {
    listado
}
