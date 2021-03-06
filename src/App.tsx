import * as React from 'react';
import BookingPage from "./components/pages/BookingPage";
import {Route, Routes} from "react-router";
import EventList from "./components/pages/EventList";
import RegisterNewEvent from "./components/pages/RegisterEvent";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {ListItemButton} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const drawerWidth = 200;

function App() {
    const navigate = useNavigate();
    const [pageName, setPageName] = useState<string>("イベント一覧");

    const handleOnClickEventList = (event: any) => {
        setPageName("イベント一覧")
        navigate("/")
    }
    const handleOnClickRegisterEvent = (event: any) => {
        setPageName("イベント登録")
        navigate("/registerNewEvent")
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {pageName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleOnClickEventList}>
                            <ListItemIcon>
                                <AutoStoriesIcon/>
                            </ListItemIcon>
                            <ListItemText primary='イベント一覧'/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleOnClickRegisterEvent}>
                            <ListItemIcon>
                                <AutoStoriesIcon/>
                            </ListItemIcon>
                            <ListItemText primary='イベント登録'/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<EventList/>}/>
                    <Route path="/registerNewEvent" element={<RegisterNewEvent/>}/>
                    <Route path="/event/:id" element={<BookingPage updateTitle={(name: string) => setPageName(name)}/>}/>
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
