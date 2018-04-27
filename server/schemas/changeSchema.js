const { Schema } = require('dynamoose');

const changeSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  createdAt: {
    rangeKey: true,
    type: Number,
    required: true,
  },
});

module.exports = changeSchema;
