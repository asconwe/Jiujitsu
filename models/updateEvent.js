const { connection } = require('./connect')

module.exports = function ({ id, columnValuesToUpdate }) {
  const queryParameters = columnValuesToUpdate.reduce((column, combo) =>s `${column.key}=${column.value}, ${combo}`);
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE tournaments SET ${queryParameters} WHERE id=${id}`, (err, queryResponse) => {
      if (err) return reject(err);
      resolve(queryResponse);
    })
  })
}