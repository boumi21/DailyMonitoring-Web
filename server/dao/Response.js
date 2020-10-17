const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getAllResponses(req, callback) {
  let getAllResponses = "SELECT * FROM reponse r "

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
  let getResponses = "SELECT * FROM reponse r " +
                     "LEFT JOIN possede p " +
                     "ON r.num_reponse = p.num_reponse " +
                     "WHERE p.num_question = " + mysql.escape(req.body.questionId)

  connection.query(getResponses, function (err, result, fields) {
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

function setResponse(req, callback) {
  let checkResponse = "SELECT * FROM reponse r " +
    "WHERE r.reponse = " + mysql.escape(req.body.reponse.trim())

  connection.query(checkResponse, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      if (result.length != 0) {
        callback("Cette réponse existe déjà.", null);
      }
      else {
        let setResponse = "INSERT INTO reponse " +
          "(reponse) VALUES ?"
        let value = [[req.body.reponseLib.trim()]]

        connection.query(setResponse, [value], function (err, result, fields) {
          if (err) {
            console.log(err)
            callback(err.sqlMessage, null)
          }
          else {
            callback(null, result)
          }
        })
      }
    }
  })
}

module.exports = {
  getAllResponses,
  getResponses,
  setResponse
}
