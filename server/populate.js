const insert = require('./controllers/insert');
const Event = require('./models/EventModel');
const Change = require('./models/ChangeModel');
const mockData = require('./mock-data');

const insertStarterDataRecursively = (list, index = 0) => {
  if (list[index]) {
    const event = list[index];
    return insert(event, Event)
      .then(id => insert({ eventId: id, createdAt: Date.now() }, Change))
      .then(() => {
        insertStarterDataRecursively(list, index + 1);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log('error:::', err));
  }
  // eslint-disable-next-line no-console
  console.log('Finished populating');
  return null;
};
module.exports = () => {
  insertStarterDataRecursively(mockData);
};
