const dynamoose = require('dynamoose');
const populate = require('./populate');

module.exports = () => {
  dynamoose.ddb().deleteTable({ TableName: 'Event' }, (err, resp) => {
    if (err) {
      console.error('err::::', err);
    }
    dynamoose.ddb().deleteTable({ TableName: 'Change' }, (err2, resp2) => {
      if (err2) {
        console.error('err::::', err2);
      }
      populate();
    });
  });
};
