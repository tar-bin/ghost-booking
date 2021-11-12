import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, Theme, useTheme
} from "@mui/material";
import {useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const types = [
    {id: 0, label: 'DJ', selected: true},
    {id: 1, label: 'VJ', selected: false},
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ParticipationFormDialog(props: any) {
    const theme = useTheme();

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
        if (name === null || name === "") {
            setInputErrorName(true)
        }
    };

    const [age, setAge] = React.useState('');
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChangeSelect = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
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
                                    <Grid item xs={4}>
                                        <span style={{display: "block", margin: "28px 0"}}>{date.date}</span>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{m: 1, minWidth: 120}}>
                                            <InputLabel id="status-select-label">参加可否</InputLabel>
                                            <Select
                                                required
                                                labelId="status-select-label"
                                                id="status-select"
                                                label="参加可否"
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={0} selected>×</MenuItem>
                                                <MenuItem value={1}>○</MenuItem>
                                                <MenuItem value={2}>△</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl sx={{m: 1, width: 120}}>
                                            <InputLabel id="type-select-label">種類</InputLabel>
                                            <Select
                                                required
                                                multiple
                                                labelId="type-select-label"
                                                id="type-select"
                                                label="種類"
                                                value={personName}
                                                onChange={handleChangeSelect}
                                            >
                                                <MenuItem value={0} selected>DJ</MenuItem>
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
                        margin="dense"
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