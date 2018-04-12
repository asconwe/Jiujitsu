const { Schema } = require('dynamoose');

const changeSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  event_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

module.exports = changeSchema;
