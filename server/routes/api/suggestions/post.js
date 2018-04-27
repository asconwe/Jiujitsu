const Suggestion = require('../../../models/SuggestionMondel');
const insert = require('../../../controllers/insert');

module.exports = (app) => {
  app.post('/api/suggestions/', (req, res) => {
    const suggestionData = req.body;
    return insert(suggestionData, Suggestion)
      .then(suggestionId => res.status(200).json({ suggestionId }))
      .catch(err => res.status(400).json({ success: false, error: err }));
  });
};
