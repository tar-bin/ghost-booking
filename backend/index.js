const express = require('express')
const path = require("path");
const moment = require("moment");

const app = express()
const port = process.env.PORT || 3001

require('dotenv').config()

const db = require("../models/index");
const {dateRangePickerDayClasses} = require("@mui/lab");

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json())

app.get("/api/events", (req, res) => {
    db.Events.findAll().then((events) => {
        res.json({
            events: events
        });
    });
});

app.get("/api/event/:id", async (req, res) => {
    const event = await db.Events.findByPk(req.params.id);
    const dates = await db.EventDates.findAll({where: {eventId: event.id}});
    const eventDates = dates.map(value => {
        return {
            id: value.id,
            date: moment(value.date).format("YYYY/MM/DD"),
            djStatuses: {'Ohagi': 1, 'tar_bin': 1, 'cocothume': 1},
            vjStatuses: {'Tuna': 1, 'KillU': 1}
        }
    })

    res.json({
        id: event.id,
        name: event.name,
        description: event.description,
        djs: ['Ohagi', 'tar_bin', 'cocothume'],
        vjs: ['Tuna', 'KillU'],
        dates: eventDates
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

        data.dates?.forEach(date => {
            db.EventDates.create({
                date: date,
                eventId: event.id
            })
        })
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, async () => {
})