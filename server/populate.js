const insert = require('./controllers/insert');
const Event = require('./models/EventModel');
const Change = require('./models/ChangeModel');
const mockData = require('./mock-data');

const insertStarterDataRecursively = (list, index = 0) => {
  if (list[index]) {
    const event = list[index];
    return insert(event, Event)
      .then(id => insert({ event_id: id, createdAt: Date.now() }, Change))
      .then(() => {
        insertStarterDataRecursively(list, index + 1);
      })
      .catch(err => console.log(err));
  }
};

module.exports = () => {
  insertStarterDataRecursively(mockData);
};
