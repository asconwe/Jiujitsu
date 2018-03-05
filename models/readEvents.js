const { connection } = require('./connect')

module.exports = function ({location, start_date, end_date}) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM tournaments`, (err, queryResponse) => {
      if (err) return reject(err);
      resolve(queryResponse);
    })
  })
}