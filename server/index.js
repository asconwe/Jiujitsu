// require('dotenv').config({ path: '../.env' });
const dynamoose = require('dynamoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dynamoose.AWS.config.update({
    region: 'us-east-1',
  });

  dynamoose.local();
  require('./repopulate')();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/api');

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on http://localhost:${PORT}`);
});
