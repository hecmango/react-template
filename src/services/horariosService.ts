import { api } from "../utils/http_client";

export interface Horario {
    dia_semana: string;
    periodos: { id: number; hora_inicio: string; hora_fin: string }[];
}

export interface eliminarResponse {
    message: string;
    status: number;
}

const obtenerHorarios = async () => {
    return api.get<Horario[]>('horarios');
}

const crearHorario = async (dia_semana: string, hora_inicio: string, hora_fin: string) => {
    return api.post('horarios', { dia_semana, hora_inicio, hora_fin });
}

const editarHorario = async (id: number, dia_semana: string, hora_inicio: string, hora_fin: string) => {
    return api.put(`horarios/${id}`, { dia_semana, hora_inicio, hora_fin });
}

const eliminarHorario = async (id: number) => {
    return api.delete<eliminarResponse>(`horarios/${id}`);
}

export default {
    obtenerHorarios,
    crearHorario,
    editarHorario,
    eliminarHorario
}