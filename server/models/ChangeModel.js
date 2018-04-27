const dynamoose = require('dynamoose');
const changeSchema = require('../schemas/changeSchema');

const ChangeModel = dynamoose.model('Change', changeSchema);

module.exports = ChangeModel;
