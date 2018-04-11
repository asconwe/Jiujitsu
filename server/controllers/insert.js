const uuidv4 = require('uuid/v4');

module.exports = (item, Model) => new Promise((resolve, reject) => {
  const id = uuidv4();
  const newItem = new Model({ ...event, id });
  newItem.save((err) => {
    if (err) reject(err);
    resolve(id);
  });
});
