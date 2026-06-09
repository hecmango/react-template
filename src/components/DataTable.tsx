import { DataTable as PrimeDataTable, type DataTableStateEvent, type DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
    field: keyof T & string;
    header: string;
    body?: (row: T) => ReactNode;
}

interface Props<T extends DataTableValue> {
    headers: DataTableColumn<T>[];
    items: T[];
    totalRecords: number;
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    emptyMessage?: string;
}

export const DataTable = <T extends DataTableValue,>({
    headers,
    items,
    totalRecords,
    page,
    rowsPerPage,
    rowsPerPageOptions = [10, 25, 50, 100],
    onPageChange,
    onRowsPerPageChange,
    emptyMessage = "Sin registros",
}: Props<T>) => {

    const first = (page - 1) * rowsPerPage;

    const handlePage = (e: DataTableStateEvent) => {
        const nextPage = (e.page ?? 0) + 1;
        const nextRows = e.rows;

        if (nextRows !== rowsPerPage) {
            onRowsPerPageChange(nextRows);
        }
        if (nextPage !== page) {
            onPageChange(nextPage);
        }
    };

    return (
        <PrimeDataTable
            value={items}
            lazy
            paginator
            first={first}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            rowsPerPageOptions={rowsPerPageOptions}
            onPage={handlePage}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
            currentPageReportTemplate="{first} - {last} de {totalRecords}"
            emptyMessage={() => <div className="text-center">{emptyMessage}</div>}
            dataKey="id"
            stripedRows
        >
            {headers.map((col) => (
                <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    body={col.body ? (row: T) => col.body!(row) : undefined}
                />
            ))}
        </PrimeDataTable>
    );
};
