const { connection } = require('./connect')

module.exports = function ({ name, date, state, location, price, link, type }) {
  return new Promise((resolve, reject) => {
    if (name && date && state && location && price && link && type) {

      connection.query(`
      INSERT INTO tournaments (name, date, state, location, price, link, type) 
      VALUES (
        ${name},
        ${date},
        ${state},
        ${location},
        ${price},
        ${link},
        ${type}
      )
      `, (err, queryResponse) => {
        if (err) return reject(err);
        resolve(queryResponse);
      })
    }
    return reject({ err: 'missing parameter'})
  })
}