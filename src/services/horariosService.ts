import { api } from "../utils/http_client";

export interface Horario {
    dia_semana: string;
    periodos: { horaInicio: string ; horaFin: string }[];
}

const obtenerHorarios = async () => {
    return api.get<Horario[]>('horarios');
}

const crearHorario = async (dia_semana: string, horaInicio: string, horaFin: string) => {
    return api.post('horarios', { dia_semana, horaInicio, horaFin });
}

const editarHorario = async (id: number, dia_semana: string, horaInicio: string, horaFin: string) => {
    return api.put(`horarios/${id}`, { dia_semana, horaInicio, horaFin });
}

const eliminarHorario = async (id: number) => {
    return api.delete(`horarios/${id}`);
}

export default {
    obtenerHorarios,
    crearHorario,
    editarHorario,
    eliminarHorario
}