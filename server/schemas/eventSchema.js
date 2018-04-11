const { Schema } = require('dynamoose');

const eventSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  price: {
    type: String,
  },
  location: {
    type: String,
  },
  state: {
    type: String,
  },
  link: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = eventSchema;
