const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, '../build')));

app.get("/api/events", (req, res) => {
    res.json({
        events: [
            {
                id: 1,
                name: "Ghost Week3",
                description: "Ghost Week3 説明",
            },
            {
                id: 2,
                name: "通常開催",
                description: "通常開催 説明",
            },
        ]
    });
});

app.get("/api/event/:id", (req, res) => {
    res.json({
        id: 1,
        name: "Ghost Week3",
        description: "Ghost Week3 説明",
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
    console.log(`listening on *:${port}`);
})