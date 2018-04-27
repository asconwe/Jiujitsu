const getSuggestion = require('./get');
const putSuggestion = require('./put');
const postSuggestion = require('./post');

module.exports = (app) => {
  getSuggestion(app);
  putSuggestion(app);
  postSuggestion(app);
};
