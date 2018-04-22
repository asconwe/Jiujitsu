const getAll = require('../../../controllers/getAll');
const Suggestion = require('../../../models/SuggestionMondel');

module.exports = (app) => {
  app.get('/api/suggestions', (req, res) => {
    return getAll(Suggestion)
      .then(suggestions => res.status(200).send(suggestions))
      .catch(err => res.status(400).send({ success: false, error: err }));
  });

  app.get('/api/suggestions/:id', (req, res) => {
    Suggestion.get(req.params.id)
      .then(suggestion => res.status(200).send(suggestion))
      .catch(err => res.status(400).send({ success: false, error: err }));
  });
};
