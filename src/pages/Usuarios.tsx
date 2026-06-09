import { useEffect, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Chip } from 'primereact/chip';
import { DataTable, type DataTableColumn } from '../components/DataTable';
import { Title } from '../components/Title';
import usuariosService, { type Usuario, type ListadoParams } from '../services/usuariosService';


type Filter = 'todos' | 'instructor' | 'estudiante';

const filterOptions = [
    { label: 'Todos', value: 'todos' },
    { label: 'Instructores', value: 'instructor' },
    { label: 'Estudiantes', value: 'estudiante' },
];

const columns: DataTableColumn<Usuario>[] = [
    { field: 'nombre',    header: 'Nombre' },
    { field: 'apellido',  header: 'Apellido' },
    { field: 'email',     header: 'Email' },
    { field: 'documento', header: 'Documento' },
    {   field: 'activo',
        header: 'Estado',
        body: (row) => (
            <Chip
                label={row.activo ? 'Activo' : 'Inactivo'}
                className={`px-2 py-1 rounded text-xs font-medium ${row.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            />
        )
    },
];

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [filter, setFilter] = useState<Filter>('todos');

    useEffect(() => {
        getEstudiantes();
    }, [page, perPage, filter]);

    const getEstudiantes = async () => {
        const params: ListadoParams = {
            page,
            per_page: perPage,
        };
        if (filter === 'instructor') params.instructor = 1;
        if (filter === 'estudiante') params.estudiante = 1;

        try {
            const res = await usuariosService.listado(params);
            if(res.status === 200) {
                setUsuarios(res.data.data);
                setTotal(res.data.total);
            }
        } catch (error) {}
    }

    const handleFilterChange = (value: Filter) => {
        if (!value) return;
        setFilter(value);
        setPage(1);
    };

    return (
        <div className="flex flex-col gap-4">
            <Title className='text-center' size='4xl'>
                Usuarios
            </Title>

            <SelectButton
                value={filter}
                options={filterOptions}
                onChange={(e) => handleFilterChange(e.value)}
                allowEmpty={false}
            />

            <DataTable<Usuario>
                headers={columns}
                items={usuarios}
                totalRecords={total}
                page={page}
                rowsPerPage={perPage}
                onPageChange={setPage}
                onRowsPerPageChange={setPerPage}
                emptyMessage="No se encontraron usuarios"
            />
        </div>
    );
};
