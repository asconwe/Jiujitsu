const { Schema } = require('dynamoose');

const suggestionSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  isNewEvent: {
    type: Boolean,
  },
  eventId: {
    type: Number,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  suggestionBody: {
    type: Object,
    required: true,
  },
});

module.exports = suggestionSchema;
