require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection(process.env.DB_URI)

const connect = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err, info) => {
      if (err) return reject(err);
      return resolve(info);
    })
  })
}

module.exports = { connect, connection };