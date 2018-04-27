const dynamoose = require('dynamoose');
const populate = require('./populate');

module.exports = () => {
  dynamoose.ddb().deleteTable({ TableName: 'Event' }, (err, resp) => {
    if (err) {
      console.error(err);
    }
    console.log(resp);
    dynamoose.ddb().deleteTable({ TableName: 'Change' }, (err2, resp2) => {
      if (err2) {
        console.error(err2);
      }
      console.log(resp2)
      populate();
    });
  });
};
