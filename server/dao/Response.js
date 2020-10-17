const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getAllResponses(req, callback) {
  let getAllResponses = "SELECT * FROM reponse"

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

function getResponses(req, callback) {
  let getResponses = "SELECT * FROM reponse " +
                     "INNER JOIN possede " +
                     "WHERE reponse.num_reponse = possede.num_reponse " +
                     "AND possede.num_question = " + mysql.escape(req.body.questionId)

  connection.query(getResponses, function (err, result, fields) {
    if (err) {
      console.log(err)
      callaback(err.sqlMessage, null)
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

module.exports = {
  getAllResponses,
  getResponses
}
