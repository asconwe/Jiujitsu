const getEvent = require('./get');
const postEvent = require('./post');
const putEvent = require('./put');
const deleteEvent = require('./delete');

module.exports = (app) => {
  getEvent(app);
  postEvent(app);
  putEvent(app);
  deleteEvent(app);
};
