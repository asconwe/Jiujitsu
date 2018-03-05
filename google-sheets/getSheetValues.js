require('dotenv').config()
const google = require('googleapis');
const sheets = google.sheets('v4');

const getEventsRequestUrl = (dateRange, location) => {
  sheets.spreadsheets.get({
    key: process.env.GSHEETS_KEY,
    spreadsheetId: process.env.GSHEET_ID,
    // range: 'A2',
  }, (err, values) => {
    if (err) return console.error(err);
    return console.log(values.data.sheets[0].properties.gridProperties)
  })
}

getEventsRequestUrl();