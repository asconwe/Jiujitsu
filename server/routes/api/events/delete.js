const update = require('../../../controllers/update');
const insert = require('../../../controllers/insert');
const Change = require('../../../models/ChangeModel');
const Event = require('../../../models/EventModel');

module.exports = (app) => {
  app.delete('/api/events/:id', (req, res) => {
    const id = req.params.id;
    return update(id, { deleted: true }, Event)
      .then(eventId => insert({ eventId, createdAt: Date.now() }, Change))
      .then(changeId => res.status(200).json({ changeId }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  });
};
