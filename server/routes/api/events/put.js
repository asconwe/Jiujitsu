const Event = require('../../../models/EventModel');
const Change = require('../../../models/ChangeModel');
const update = require('../../../controllers/update');
const insert = require('../../../controllers/insert');

module.exports = (app) => {
  app.put('/api/events/:id', (req, res) => {
    const id = req.params.id;
    const eventData = req.body;
    return update(id, eventData, Event)
      .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
      .then(changeId => res.status(200).json({ changeId }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  });
}