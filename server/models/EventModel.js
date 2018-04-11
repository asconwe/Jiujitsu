const dynamoose = require('dynamoose');
const eventSchema = require('../schemas/eventSchema');

const Event = dynamoose.model('Event', eventSchema);

module.exports = Event;
