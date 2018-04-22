const dynamoose = require('dynamoose');
const suggestionSchema = require('../schemas/suggestionSchema');

const Suggestion = dynamoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;
