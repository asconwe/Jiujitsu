const events = require('./events');
const changes = require('./changes');
const suggestions = require('./suggestions');

module.exports = (app) => {
  events(app);
  changes(app);
  suggestions(app);
};
