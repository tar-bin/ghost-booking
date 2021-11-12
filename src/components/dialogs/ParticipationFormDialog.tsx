import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ParticipationFormDialog(props: any) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [name, setName] = React.useState('');
    const [inputErrorName, setInputErrorName] = useState(false);
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    let dateStatesMap = new Map();
    let dateTypesMap = new Map();
    props.dates.forEach((date: any) => {
        dateStatesMap.set(date.id, 0);
        dateTypesMap.set(date.id, ["0"]);
    });

    const [dateStates, setDateStates] = React.useState(dateStatesMap)
    const [dateTypes, setDateTypes] = React.useState(dateTypesMap)
    const handleStatusChange = (event: any, dateId: number) => {
        setDateStates(prev => new Map(prev).set(dateId, event.target.value));
    };
    const handleTypeChange = (event: any, dateId: number) => {
        const {target: {value}} = event;
        setDateTypes(prev => new Map(prev).set(dateId, typeof value === 'string' ? value.split(',') : value));
    };

    const [comment, setComment] = React.useState('');
    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        if (name === null || name === "") {
            setInputErrorName(true)
        }
        if (inputErrorName) {
            return
        }

        const body = JSON.stringify({
            id: props.eventId,
            name: name,
            dateStates: Array.from(dateStates.entries()),
            dateTypes: Array.from(dateTypes.entries()),
            comment: comment
        });

        fetch("/api/participationEvent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then((res) => res.json())

        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                参加申請
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>参加申請</DialogTitle>
                <DialogContent dividers={true}>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        label="名前"
                        fullWidth
                        value={name}
                        error={inputErrorName}
                        onChange={handleNameChange}
                    />
                    <div style={{margin: "8px 0px"}}>
                        {props.dates.map((date: any) => {
                            return (
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <span style={{display: "block", margin: "20px 0"}}>{date.date}</span>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{m: 1, minWidth: 120}}>
                                            <InputLabel id="status-select-label">参加可否</InputLabel>
                                            <Select
                                                required
                                                labelId="status-select-label"
                                                id="status-select"
                                                label="参加可否"
                                                value={dateStates.get(date.id)}
                                                onChange={(event) => handleStatusChange(event, date.id)}
                                            >
                                                <MenuItem value={0}>×</MenuItem>
                                                <MenuItem value={1}>○</MenuItem>
                                                <MenuItem value={2}>△</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControl sx={{m: 1, width: 150}}>
                                            <InputLabel id="type-select-label">種類</InputLabel>
                                            <Select
                                                required
                                                multiple
                                                labelId="type-select-label"
                                                id="type-select"
                                                label="種類"
                                                value={dateTypes.get(date.id)}
                                                onChange={(event) => handleTypeChange(event, date.id)}
                                            >
                                                <MenuItem value={0}>DJ</MenuItem>
                                                <MenuItem value={1}>VJ</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </div>
                    <TextField
                        id="comment"
                        label="コメント"
                        fullWidth
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleSubmit}>申請</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}