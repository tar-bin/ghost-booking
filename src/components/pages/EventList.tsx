import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Container} from "@mui/material";
import {useState, useEffect} from 'react'

interface Event {
    id: number
    name: string
    description: string
}

export default function EventList() {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        fetch('/api/events')
            .then((res) => res.json())
            .then((data) => setEvents(data.events));
    }, [])
    return (
        <Container>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <nav aria-label="secondary mailbox folders">
                    <List>
                        {events.map(value => {
                            return (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href={"/event/" + value.id}>
                                            <ListItemText primary={value.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider/>
                                </>
                            )
                        })}
                    </List>
                </nav>
            </Box>
        </Container>
    );
}

