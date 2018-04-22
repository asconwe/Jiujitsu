const Event = require('../../../models/EventModel');
const getAll = require('../../../controllers/getAll');

module.exports = (app) => {
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
};
