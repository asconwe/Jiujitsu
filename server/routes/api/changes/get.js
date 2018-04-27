const getAll = require('../../../controllers/getAll');
const getAllWhere = require('../../../controllers/getAllWhere');
const Change = require('../../../models/ChangeModel');

module.exports = (app) => {
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
};
