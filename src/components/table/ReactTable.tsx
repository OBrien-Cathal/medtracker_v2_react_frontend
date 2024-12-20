import {getCoreRowModel, useReactTable, flexRender, ColumnDef} from "@tanstack/react-table";

interface ReactTableProps<T> {
    data: T[],
    columns: ColumnDef<T>[]
}

export const ReactTable = <T, >({columns, data}: ReactTableProps<T>) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });
    const {getHeaderGroups, getRowModel, getFooterGroups} = table;

    return (
        <div>
            <table class="styled-table">
                <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.footer, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </tfoot>
            </table>
        </div>
    );
};