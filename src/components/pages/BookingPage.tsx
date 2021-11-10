import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Container} from "@mui/material";

interface Column {
    type: 'date' | 'djName' | 'vjName';
    id?: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    date: string;
    djStatuses: any,
    vjStatuses: any,
}

function createData(
    date: string,
    djStatuses: any,
    vjStatuses: any,
): Data {
    return {date, djStatuses, vjStatuses};
}

export default function BookingPage() {
    const columns: Column[] = [
        {type: 'date', label: '日程', minWidth: 170},
        {type: 'djName', id: 'Ohagi', label: 'Ohagi' },
        {type: 'djName', id: 'tar_bin', label: 'tar_bin'},
        {type: 'vjName', id: 'Tuna', label: 'Tuna' },
        {type: 'vjName', id: 'KillU', label: 'KillU' },
    ];

    const rows = [
        createData('2020/11/10 (22:00 JST)', {'Ohagi': '○', 'tar_bin': '○'}, {'Tuna': '○', 'KillU': '○'}),
        createData('2020/11/17 (22:00 JST)', {'Ohagi': '○', 'tar_bin': '○'}, {'Tuna': '×', 'KillU': '○'}),
    ];

    return (
        <Container>
            {/* イベント名 */}
            <h1>Ghost Week3(Test)</h1>
            {/* 説明 */}
            <p>Ghost Week3の募集です(テストデータ)</p>
            {/* 日程と参加希望状況 */}
            <h3>日程と参加希望状況</h3>
            <Paper sx={{width: '100%'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={1}/>
                                <TableCell align="left" colSpan={2}>
                                    DJ
                                </TableCell>
                                <TableCell align="left" colSpan={2}>
                                    VJ
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.type}
                                        align={column.align}
                                        style={{top: 57, minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                                            {columns.map((column) => {
                                                if (column.type === "date") {
                                                    const value = row[column.type];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                                if (column.type === "djName" && column.id !== undefined) {
                                                    const map = row["djStatuses"];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {map[column.id]}
                                                        </TableCell>
                                                    );
                                                }
                                                if (column.type === "vjName" && column.id !== undefined) {
                                                    const map = row["vjStatuses"];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {map[column.id]}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
