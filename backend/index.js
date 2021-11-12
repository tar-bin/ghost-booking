const express = require('express')
const path = require("path");
const moment = require("moment");

const app = express()
const port = process.env.PORT || 3001

require('dotenv').config()

const db = require("../models/index");

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json())

function uniq(array) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
}

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
    const users = await db.EventUserData.findAll({where: {eventId: event.id}});
    const djs = await db.EventUserTypes.findAll({where: {eventId: event.id, value: 0}});
    const vjs = await db.EventUserTypes.findAll({where: {eventId: event.id, value: 1}});
    const statuses = await db.EventUserStatus.findAll({where: {eventId: event.id}});

    const eventDates = dates.map((date) => {
        return {
            id: date.id,
            date: moment(date.date).format("YYYY/MM/DD")
        }
    })

    res.json({
        id: event.id,
        name: event.name,
        description: event.description,
        djs: uniq(djs.map(vj => vj.userId)),
        vjs: uniq(vjs.map(vj => vj.userId)),
        users: users,
        statuses: statuses,
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

app.post("/api/participationEvent", (req, res) => {
    const data = req.body;
    db.EventUserData.create({
        name: data.name,
        eventId: data.id,
        comment: data.comment
    }).then(user => {
        data.dateStates.forEach(state => {
            db.EventUserStatus.create({
                eventId: data.id,
                dateId: state[0],
                userId: user.id,
                value: state[1]
            });
        })
        data.dateTypes.forEach(type => {
            type[1].forEach(typeId => {
                db.EventUserTypes.create({
                    eventId: data.id,
                    dateId: type[0],
                    userId: user.id,
                    value: typeId
                });
            })
        })
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, async () => {
})