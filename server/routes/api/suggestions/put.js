const Suggestion = require('../../../models/SuggestionMondel');
const update = require('../../../controllers/update');

module.exports = (app) => {
  app.put('/api/suggestion/:id', (req, res) => {
    const id = req.params.id;
    const suggestionData = req.body;
    return update(id, suggestionData, Suggestion)
      .then(suggestionId => res.status(200).json({ suggestionId }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  });
};
