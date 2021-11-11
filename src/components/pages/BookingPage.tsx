import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Container} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

interface Column {
    id: number;
    type: 'date' | 'dj' | 'vj';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    id: number;
    date: string;
    djStatuses: any,
    vjStatuses: any,
}

function createData(
    id: number,
    date: string,
    djStatuses: any,
    vjStatuses: any,
): Data {
    return {id, date, djStatuses, vjStatuses};
}

interface EventDate {
    id: number
    date: string
    djStatuses: any,
    vjStatuses: any,
}

interface Event {
    id: number
    name: string
    description: string
    djs: string[]
    vjs: string[]
    dates: EventDate[]
}

export default function BookingPage(props: any) {
    const [eventInfo, setEventInfo] = useState<Event>();
    const params = useParams();
    useEffect(() => {
        fetch('/api/event/' + params.id)
            .then((res) => res.json())
            .then((data) => setEventInfo(data));
    }, [params.id])

    if (eventInfo === undefined) {
        return (<>イベントデータがありません</>);
    }

    let columnId = 1;
    let columns: Column[] = [
        {id: 1, type: 'date', label: '日程', minWidth: 170},
    ]

    eventInfo.djs.forEach(value => {
        columnId+=1;
        columns.push({id: columnId, type: 'dj', label: value});
    })
    eventInfo.vjs.forEach(value => {
        columnId+=1;
        columns.push({id: columnId, type: 'vj', label: value});
    })

    const rows = eventInfo.dates.map(value => createData(value.id, value.date, value.djStatuses, value.vjStatuses))

    return (
        <Container>
            {/* イベント名 */}
            <h1>{eventInfo.name}</h1>
            {/* 説明 */}
            <p>{eventInfo.description}</p>
            {/* 日程と参加希望状況 */}
            <h3>日程と参加希望状況</h3>
            <Button variant="contained">参加申請</Button>
            <Paper sx={{width: '100%'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" colSpan={1}/>
                                <TableCell align="left" colSpan={eventInfo.djs.length}>
                                    DJ
                                </TableCell>
                                <TableCell align="left" colSpan={eventInfo.vjs.length}>
                                    VJ
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
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
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {/* eslint-disable-next-line array-callback-return */}
                                        {columns.map((column) => {
                                            if (column.type === "date") {
                                                const value = row[column.type];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.type === "dj" && column.label !== undefined) {
                                                const map = row["djStatuses"];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {map[column.label]}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.type === "vj" && column.label !== undefined) {
                                                const map = row["vjStatuses"];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {map[column.label]}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
