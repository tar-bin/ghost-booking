import React, {useState} from 'react';
import {Button, Container, FormControl, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function RegisterEvent() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const [description, setDescription] = useState('');
    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };

    const [dates, setDates] = useState('');
    const handleDatesChange = (event: any) => {
        setDates(event.target.value);
    };

    const handleSubmit = () => {
        const body = JSON.stringify({name: name, description: description, dates: dates});

        fetch("/api/registerEvent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then((res) => res.json())
            .then(res => navigate("/event/" + res.id))
    };

    return (
        <Container>
            <h1>イベント新規登録</h1>
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-name"
                    label="イベント名"
                    required
                    value={name}
                    onChange={handleNameChange}
                />
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-description"
                    label="説明"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-dates"
                    label="日付"
                    required
                    multiline
                    rows={4}
                    helperText="yyyy/MM/DD 形式, 複数指定の場合は改行して指定してください"
                    value={dates}
                    onChange={handleDatesChange}
                />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>登録</Button>
        </Container>
    )
}
