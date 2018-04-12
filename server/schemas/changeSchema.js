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
    type: Number,
    required: true,
  },
});

module.exports = changeSchema;
