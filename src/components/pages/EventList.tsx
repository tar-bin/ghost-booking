import * as React from 'react';
import {Container} from "@mui/material";
import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Event {
    id: number
    name: string
    description: string
}

export default function EventList() {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((data) => setEvents(data.events));
    }, [])

    const rows = events.map(value => {
        return {id: value.id, name: value.name, description: value.description}
    })
    rows.sort((a, b) => b.id - a.id)

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>イベント名</TableCell>
                            <TableCell>説明</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => {
                                    navigate("/event/" + row.id)
                                }}
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

