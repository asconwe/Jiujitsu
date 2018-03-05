const { connection } = require('./connect')

module.exports = function ({ id }) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE * FROM tournaments WHERE id=${id}`, (err, queryResponse) => {
      if (err) return reject(err);
      resolve(queryResponse);
    })
  })
}