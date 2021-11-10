import React from 'react';
import {styled} from '@mui/material/styles';
import {AppBar, Box, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import BookingPage from "./components/pages/BookingPage";

function App() {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Ghost Booking
                    </Typography>
                </Toolbar>
            </AppBar>
            <BookingPage/>
        </React.Fragment>
    );
}

export default App;
