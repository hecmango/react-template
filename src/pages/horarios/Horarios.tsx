import { Title } from '../../components/Title';
import { Chip } from 'primereact/chip';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { CustomButton } from '../../components/CustomButton';
import { useHorarios } from '../../hooks/useHorarios';


export function Horarios() {

    const {
        horarios, 
        horarioSelected, 
        setHorarioSelected, 
        mostrarDialogEliminar, 
        setMostrarDialogEliminar, 
        editando, 
        setEditando, 
        mostrarDialog, 
        setMostrarDialog, 
        handleConfigurarEdicion, 
        handleCrearEditarHorario,
        handleEliminarConfirmado,
        formatTime,
        stringToDate,
        calendarInicioRef,
        calendarFinRef
    } = useHorarios();


    const headerModalElement = (
        <div className="flex items-center justify-between">
            <Title size='2xl' className='text-center'>{editando ? 'Editar' : 'Crear'} horario para {horarioSelected.dia_semana}</Title>
        </div>
    )

    const footerModalElement = (
        <div className="flex justify-center gap-2">
            <CustomButton label="Cancelar" outlined 
            onClick={() => {
                setMostrarDialog(false);
                setHorarioSelected({ id: 0, dia_semana: '', hora_inicio: '', hora_fin: '' });
                setEditando(false);
            }} />
            <CustomButton label={editando ? 'Editar' : 'Crear'} 
            onClick={() => {
                handleCrearEditarHorario();
            }} />
        </div>
    )

    return (
        <div className="flex flex-col gap-4">
            <Title className='text-center' size='4xl'>
                Horarios
            </Title>

            <div className="w-full flex flex-col gap-5">
                {horarios.map((horario) => (
                    <div key={horario.dia_semana} className="grid grid-cols-1 sm:grid-cols-12 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <div className="col-span-1 sm:col-span-2 flex flex-col justify-start gap-3">
                            <h3 className="text-xl text-center md:text-start uppercase font-bold mb-2">{horario.dia_semana}</h3>
                            <h3 className="text-lg text-center md:text-start ">{`${horario.periodos.length} horarios definidos`}</h3>
                        </div>
                        <div className="col-span-1 sm:col-span-8">
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {horario.periodos.map((periodo, index) => {
                                    const chipTemplate = (
                                        <div className="flex items-center gap-2 px-2 py-1">
                                            <span className="text-blue-600">{`${periodo.hora_inicio} - ${periodo.hora_fin}`}</span>
                                            <i title='Editar' className="pi pi-pencil text-blue-600 hover:text-orange-500 cursor-pointer"
                                            onClick={() => {
                                                handleConfigurarEdicion(periodo.id, horario.dia_semana, periodo.hora_inicio, periodo.hora_fin);
                                                setEditando(true);
                                                setMostrarDialog(true);
                                            }} />
                                            <i title='Eliminar' className="pi pi-times-circle text-blue-600 hover:text-red-500 cursor-pointer"
                                            onClick={() => {
                                                handleConfigurarEdicion(periodo.id, horario.dia_semana, periodo.hora_inicio, periodo.hora_fin);
                                                setMostrarDialogEliminar(true);
                                            }} />
                                        </div>
                                    );

                                    return (
                                        <Chip key={index} className="border-blue-950! border bg-blue-200" template={chipTemplate} />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2 mt-4 flex justify-center items-center sm:m-0!">
                            <CustomButton label="Agregar" icon="pi pi-plus" outlined 
                            className="max-h-14" 
                            onClick={
                                () => {
                                    setMostrarDialog(true);
                                    const ahora = new Date()
                                    const ahoraMasUnaHora = new Date(ahora.getTime() + 60 * 60 * 1000);
                                    const horaActualFormateada = formatTime(ahora);
                                    const horaMasUnaHoraFormateada = formatTime(ahoraMasUnaHora);
                                    setHorarioSelected({ id: 0, dia_semana: horario.dia_semana, hora_inicio: horaActualFormateada, hora_fin: horaMasUnaHoraFormateada });
                                }
                            } 
                            />
                        </div>
                    </div>
                ))}
            </div>


            {/* Modal de selección de horario */}
            <Dialog visible={mostrarDialog} onHide={() => setMostrarDialog(false)}  header={headerModalElement} footer={footerModalElement}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Hora inicio</label>
                        <Calendar ref={calendarInicioRef} timeOnly className="w-full" placeholder="Selecciona hora de inicio" showIcon icon={() => <i className="pi pi-clock"/>}
                        onChange={(e) => setHorarioSelected(prev => ({ ...prev, hora_inicio: formatTime(e.value) }))}
                        value={stringToDate(horarioSelected.hora_inicio)}
                        footerTemplate={() =>
                            <div className="flex justify-end gap-2 p-2">
                                <CustomButton 
                                label="Cancelar" 
                                outlined 
                                onClick={() => {
                                    setHorarioSelected(prev => ({ ...prev, hora_inicio: '' }));
                                    calendarInicioRef.current?.hide();
                                }} 
                                />
                                <CustomButton 
                                label="Seleccionar" 
                                onClick={() => {
                                    calendarInicioRef.current?.hide();
                                } } 
                                />
                            </div>
                        }
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Hora fin</label>
                        <Calendar  ref={calendarFinRef} timeOnly className="w-full" placeholder="Selecciona hora de fin" showIcon icon={() => <i className="pi pi-clock"/>}
                        onChange={(e) => setHorarioSelected(prev => ({ ...prev, hora_fin: formatTime(e.value) }))}
                        value={stringToDate(horarioSelected.hora_fin)}
                        footerTemplate={() =>
                            <div className="flex justify-end gap-2 p-2">
                                <CustomButton 
                                label="Cancelar" 
                                outlined 
                                onClick={() => {
                                    setHorarioSelected(prev => ({ ...prev, hora_fin: '' }));
                                    calendarFinRef.current?.hide();
                                }} />
                                <CustomButton 
                                label="Seleccionar" 
                                onClick={() => 
                                    calendarFinRef.current?.hide()
                                } />
                            </div>
                        }
                        />
                    </div>
                </div>
            </Dialog>

            {/* Modal de confirmación de eliminación */}
            <Dialog 
            visible={mostrarDialogEliminar} 
            onHide={() => setMostrarDialogEliminar(false)} 
            header={
                <div className="flex items-center">
                    <Title size='2xl' className='text-center'>Confirmar eliminación</Title>
                </div>
            } 
            footer={
                <div className="flex justify-center gap-2">
                    <CustomButton label="Cancelar" outlined onClick={() => setMostrarDialogEliminar(false)} />
                    <CustomButton label="Eliminar" className="bg-red-500 hover:bg-red-600" onClick={() => {
                        handleEliminarConfirmado();
                    }} />
                </div>
            }>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                    ¿Estás seguro de que deseas eliminar el horario seleccionado? <br />
                    <strong>{`${horarioSelected.dia_semana} - ${horarioSelected.hora_inicio} a ${horarioSelected.hora_fin}`}</strong>
                </p>
            </Dialog>
        </div>
    )
}