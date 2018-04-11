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
}, {
  timestamps: true,
});

module.exports = changeSchema;
