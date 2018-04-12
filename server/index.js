// require('dotenv').config({ path: '../.env' });
const dynamoose = require('dynamoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dynamoose.AWS.config.update({
    region: 'us-east-1',
  });

  dynamoose.local();
  require('./repopulate')();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Event = require('./models/EventModel');
const Change = require('./models/ChangeModel');
const insert = require('./controllers/insert');
const update = require('./controllers/update');
const getAll = require('./controllers/getAll');
const getAllWhere = require('./controllers/getAllWhere');

app.get('/api/events', (req, res) => {
  getAll(Event)
    .then(events => res.status(200).send(events))
    .catch(err => res.status(400).send({ success: false, error: err }));
});

app.get('/api/events/:id', (req, res) => {
  Event.get(req.params.id)
    .then(event => res.status(200).send(event))
    .catch(err => res.status(400).send({ success: false, error: err }));
});

app.post('/api/events/', (req, res) => {
  const eventData = req.body;
  return insert(eventData, Event)
    .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
    .then(changeId => res.status(200).json({ changeId }))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

app.put('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const eventData = req.body;
  return update(id, eventData, Event)
    .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
    .then(changeId => res.status(200).json({ changeId }))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

app.delete('/api/events/:id', (req, res) => {
  const id = req.params.id;
  return update(id, { deleted: true })
    .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
    .then(changeId => res.status(200).json({ changeId }))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

app.get('/api/changes/:last_updated_at?', (req, res) => {
  const getChanges = () => {
    if (!isNaN(parseInt(req.params.last_updated_at, 10))) {
      return getAllWhere(Change, { createdAt: { gt: parseInt(req.params.last_updated_at, 10) } });
    }
    return getAll(Change);
  };

  return getChanges()
    .then(changes => Promise.all(changes.map(change => change.populate({
      path: 'eventId',
      model: 'Event',
    }))))
    .then((populatedChanges) => {
      res.status(200).send(populatedChanges);
    })
    .catch(err => res.status(400).send({ success: false, error: err }));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on http://localhost:${PORT}`);
});
