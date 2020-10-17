const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getAllReponses(req, callback) {
  let getAllReponses = 'SELECT * FROM reponse'
  connection.query(getAllResponses, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

module.exports = {
  getAllResponses
}
