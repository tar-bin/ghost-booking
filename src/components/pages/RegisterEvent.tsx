import React, {useState} from 'react';
import {Button, Container, FormControl, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function RegisterEvent() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [inputErrorName, setInputErrorName] = useState(false);
    const handleNameChange = (event: any) => {
        setName(event.target.value);
        if (name === null || name === "") {
            setInputErrorName(true)
        } else {
            setInputErrorName(false)
        }
    };

    const [description, setDescription] = useState('');
    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    };

    const [dates, setDates] = useState('');
    const [inputErrorDates, setInputErrorDates] = useState(false);
    const handleDatesChange = (event: any) => {
        const value: string = event.target.value;
        if (value !== null || value !== "") {
            setDates(value);
            const dateList = value.split("\n");
            let result = false;
            dateList.forEach((date: string) => {
                result = result || (date.match(/^[2][0-9]{3}\/([0]?[1-9]|[1][0-2])\/([0]?[0-9]|[1-2][0-9]|[3][0-1])$/g) === null)
            })
            setInputErrorDates(result)
        }
    };

    const handleSubmit = () => {
        const dateList = dates.split("\n");
        const body = JSON.stringify({name: name, description: description, dates: dateList});

        if (name === null || name === "") {
            setInputErrorName(true)
        }
        if (dateList.length === 1 && dateList[0] === "") {
            setInputErrorDates(true)
        }
        if (inputErrorName || inputErrorDates) {
            return
        }

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
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-name"
                    label="???????????????"
                    required
                    value={name}
                    onChange={handleNameChange}
                    error={inputErrorName}
                />
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-description"
                    label="??????"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
                <TextField
                    id="event-dates"
                    label="??????"
                    required
                    multiline
                    rows={4}
                    helperText="yyyy/MM/DD ??????, ????????????????????????????????????????????????????????????"
                    value={dates}
                    onChange={handleDatesChange}
                    error={inputErrorDates}
                />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>??????</Button>
        </Container>
    )
}
