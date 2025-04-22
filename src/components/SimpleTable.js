import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function SimpleTable({ ariaLabel, columns, data }) {
    return (
        <>
            <Table aria-label={ariaLabel}>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableCell key={column.key}>{column.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((item) => (
                            <TableRow>
                                {
                                    columns.map((column) => (
                                        <TableCell key={column.key}>{item[column.key]}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
}