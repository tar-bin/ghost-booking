import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Container} from "@mui/material";
import { useState,useEffect } from 'react'

export default function EventList() {
    const [message, setMessage] = useState('');
    useEffect(() =>{
        fetch('/api')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    },[])
    return (
        <Container>
            <h1>イベント一覧</h1>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/event">
                                <ListItemText primary="Ghost Week3"/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="通常開催"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <p>{ message }</p>
        </Container>
    );
}

