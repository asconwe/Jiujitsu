require('dotenv').config();
require('appmetrics-dash').monitor();
const rp = require('request-promise');
const { connect, readEvents, createEvent } = require('./models');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/events', (req, res) => {
  const { start_date, end_date, location } = req.query;
  return readEvents({ start_date, end_date, location })
    .then(events => res.status(200).json(events))
    .catch((err) => {
      console.error(err)
      res.status(400).json(err)
    })
})

app.post('/api/events', (req, res) => {
  const { event } = req.body;
  return createEvent(event)
    .then((event) => res.status(200).json(event))
    .catch((err) => {
      console.error(err)
      res.status(400).json(err)
    })
})

app.put('/api/events/:id', (req, res) => {
  const { event } = req.body;
  return updateEvent(event)
    .then((event) => res.status(200).json(event))
    .catch((err) => {
      console.error(err)
      res.status(400).json(err)
    })
})

app.delete('/api/events/:id', (req, res) => {
  const { event } = req.body;
  return deleteEvent(event)
    .then((event) => res.status(200).json(event))
    .catch((err) => {
      console.error(err)
      res.status(400).json(err)
    })
})

app.use(express.static('dist'))

app.listen(PORT, () => {
  connect()
    .then(() => {
      console.log(`Connected to DB and listening on http://localhost:${PORT}`)
    })
    .catch((err) => {
      throw err;
    })
});