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
    "WHERE r.reponse = " + mysql.escape(req.body.textResponse.trim())

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
        let value = [[req.body.textResponse.trim()]]

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

function updateResponse(req, callback) {
  let checkResponse = "SELECT * FROM reponse r " +
    "WHERE r.reponse = " + mysql.escape(req.body.reponseLib.trim()) + " " +
    "AND r.num_reponse <> " + req.body.reponseId

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
        let updateResponse = "UPDATE reponse r SET " +
          "reponse = " + mysql.escape(req.body.reponse) + " " +
          "WHERE r.num_reponse = " + req.body.reponseId

        connection.query(updateResponse, function (err, result, fields) {
          if (err) {
            console.log(err)
            callback(err.sqlMessage, null)
          }
          else {
            console.log(result.protocol41)
            callback(null, result.protocol41)
          }
        })
      }
    }
  })
}

function deleteResponse(req, callback) {
  let deletePossede = "DELETE FROM possede " +
    "WHERE num_reponse = " + req.body.reponseId

  connection.query(deletePossede, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      console.log(result)
      let deleteResponse = "DELETE FROM reponse " +
        "WHERE num_reponse = " + req.body.reponseId

      connection.query(deleteResponse, function (err, result, fields) {
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
  })
}


function addResponse(req, callback) {
  let addResponse = 'INSERT INTO reponse VALUES (null,"'+req.body.textResponse+'" ) '

  connection.query(addResponse, function (err, result, fields) {
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
  getAllResponses,
  getResponses,
  setResponse,
  updateResponse,
  deleteResponse,
  addResponse
}
