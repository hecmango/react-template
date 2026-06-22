import { useEffect } from "react";
import { useState } from "react";
import { useRef } from 'react';

import horariosService, { type Horario } from "../services/horariosService";
import { useToastStore } from "../store/useToastStore";


export function useHorarios() {

    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [horarioSelected, setHorarioSelected] = useState({ id: 0, dia_semana: '', hora_inicio: '', hora_fin: '' });
    const [mostrarDialogEliminar, setMostrarDialogEliminar] = useState(false);
    const [editando, setEditando] = useState<boolean>(false);
    const [mostrarDialog, setMostrarDialog] = useState(false);

    const calendarInicioRef = useRef<any>(null);
    const calendarFinRef = useRef<any>(null);

    const formatTime = (value: Date | null | undefined): string => {
        if (!value || Array.isArray(value)) return '';
        return value.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    const stringToDate = (timeString: string) => {
        if (!timeString) return null;
        const [horas, minutos] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(horas, minutos, 0, 0);
        return date;
    };

    const obtenerHorarios = async () => {
        try {
            const response = await horariosService.obtenerHorarios();
            if (response.status === 200) {
                setHorarios(response.data);
            }

        } catch (error) { }
    }
    
    useEffect(() => {
        obtenerHorarios();
    }, []);

    const handleEliminarConfirmado = async () => {
        try {
            const response = await horariosService.eliminarHorario(horarioSelected.id);
            if (response.status === 200) {
                useToastStore.getState().showToast({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: response.data.message || 'Horario eliminado con éxito'
                });
                obtenerHorarios();
                setMostrarDialogEliminar(false);
            }
        } catch (error) { }
    }

    const handleConfigurarEdicion = async (id: number, dia_semana: string, hora_inicio: string, hora_fin: string) => {
        setHorarioSelected({ id, dia_semana, hora_inicio: hora_inicio, hora_fin: hora_fin });
    }

    const handleCrearEditarHorario = async () => {
        if (!horarioSelected.hora_inicio || !horarioSelected.hora_fin) {
            useToastStore.getState().showToast({
                severity: 'warn',
                summary: 'Campos incompletos',
                detail: 'Por favor, selecciona hora de inicio y hora de fin'
            });
            return;
        }
        if (editando) {
            await handleEditarHorario();
        } else {
            await crearHorario();
        }
    }

    const crearHorario = async () => {
        try {
            const response = await horariosService.crearHorario(horarioSelected.dia_semana, horarioSelected.hora_inicio, horarioSelected.hora_fin);
            if (response.status === 201) {
                useToastStore.getState().showToast({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Horario creado con éxito'
                });
                obtenerHorarios();
                setMostrarDialog(false);
            }
        } catch (error) { }
    }

    const handleEditarHorario = async () => {
        try {
            const response = await horariosService.editarHorario(horarioSelected.id, horarioSelected.dia_semana, horarioSelected.hora_inicio, horarioSelected.hora_fin);
            if (response.status === 200) {
                useToastStore.getState().showToast({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Horario editado con éxito'
                });
                obtenerHorarios();
                setMostrarDialog(false);
            }
        } catch (error) { }
        finally {
            setEditando(false);
        }
    }

    return {
        formatTime,
        stringToDate,
        obtenerHorarios,
        horarios,
        horarioSelected,
        setHorarioSelected,
        handleEliminarConfirmado,
        handleConfigurarEdicion,
        handleCrearEditarHorario,
        mostrarDialogEliminar,
        setMostrarDialogEliminar,
        mostrarDialog,
        setMostrarDialog,
        editando,
        setEditando,
        calendarInicioRef,
        calendarFinRef
    }
}
