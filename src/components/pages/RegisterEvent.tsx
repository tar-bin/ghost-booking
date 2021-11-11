import React from 'react';
import {Container, FormControl, TextField} from "@mui/material";
import { useForm } from "react-hook-form";

export default function RegisterEvent(props: any) {
    const { handleSubmit } = useForm({
        defaultValues: {
            checkBox: false,
            textBox: "",
            pullDown: "",
        },
    });
    const onSubmit = () => {
        props.handleNext();
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>イベント新規登録</h1>
                <FormControl fullWidth sx={{m: 1}}>
                    <TextField
                        id="event-name"
                        label="イベント名"
                        required
                    />
                </FormControl>
                <FormControl fullWidth sx={{m: 1}}>
                    <TextField
                        id="event-description"
                        label="説明"
                        required
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
                    />
                </FormControl>
            </form>
        </Container>
    )
}
