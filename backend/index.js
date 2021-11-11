const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 3001

require('dotenv').config()

const db = require("../models/index");

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json())

app.get("/api/events", (req, res) => {
    db.Events.findAll().then((events) => {
        res.json({
            events: events
        });
    });
});

app.get("/api/event/:id", (req, res) => {
    res.json({
        id: 1,
        name: "Ghost Week3",
        description: "Ghost Week3 説明",
        djs: ['Ohagi', 'tar_bin', 'cocothume'],
        vjs: ['Tuna', 'KillU'],
        dates: [
            {
                id: 1,
                date: "2020/11/10",
                djStatuses: {'Ohagi': 1, 'tar_bin': 1, 'cocothume': 1},
                vjStatuses: {'Tuna': 1, 'KillU': 1}
            },
            {
                id: 2,
                date: "2020/11/17",
                djStatuses: {'Ohagi': 1, 'tar_bin': 1, 'cocothume': 1},
                vjStatuses: {'Tuna': 1, 'KillU': 0}
            },
        ]
    });
});

app.post("/api/registerEvent", (req, res) => {
    const data = req.body;
    //イベントを新規作成
    db.Events.create({
        name: data.name,
        description: data.description
    }).then(event => {
        //作成したIDを返却
        res.json({
            id: event.id
        });
    })
    //TODO: イベントごとの日付を指定
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, async () => {
})