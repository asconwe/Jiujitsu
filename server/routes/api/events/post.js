const Event = require('../../../models/EventModel');
const Change = require('../../../models/ChangeModel');
const insert = require('../../../controllers/insert');

module.exports = (app) => {
  app.post('/api/events/', (req, res) => {
    const eventData = req.body;
    return insert(eventData, Event)
      .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
      .then(changeId => res.status(200).json({ changeId }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  });
};
