const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 3001
const { Sequelize } = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL)

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json())

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
    //TODO: イベントを新規作成
    console.log(req.body)
    //TODO: 作成したIDを返却
    res.json({
        id: 1
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})