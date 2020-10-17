const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getAllQuestions(req, callback) {
  let getAllQuestions = "SELECT * FROM question"
  connection.query(getAllQuestions, function (err, result, fields) {
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

function updateQuestion(req, callback) {
  let updateQuestion = "UPDATE question SET " +
                       "question = " + mysql.escape(req.body.question) + " " +
                       "WHERE question.num_question = " + mysql.escape(req.body.questionId)

  connection.query(updateQuestion, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      console.log(result.protocol41)
      callback(null, result)
    }
  })
}

function getNextQuestion(req, callback) {
  let getNextQuestion = "SELECT question.* FROM question " +
                        "LEFT JOIN possede " +
                        "ON question.num_question = possede.num_question " +
                        "WHERE possede.num_question = " + mysql.escape(req.body.questionId) + " " +
                        "AND possede.num_reponse = " + mysql.escape(req.body.reponseId)

  connection.query(getNextQuestion, function (err, result, fields) {
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

function getQR(req, callback) {
  let getQR = "SELECT question.*, reponse.* FROM question " +
              "LEFT JOIN possede " +
              "ON question.num_question = possede.num_question " +
              "LEFT JOIN reponse " +
              "ON possede.num_reponse = reponse.num_reponse " +
              "WHERE question.num_question = " + mysql.escape(req.body.questionId)

  connection.query(getQR, function (err, result, fields) {
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

function setQuestion(req, callback) {
  let checkQuestion = "SELECT * FROM question " +
                      "WHERE question.question = " + mysql.escape(req.body.questionLib.trim())

  connection.query(checkQuestion, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      if (result.length != 0) {
        callback("Cette question existe déjà.", null);
      }
      else {
        let setQuestion = "INSERT INTO question " +
                          "(question) VALUES ?"
        let value = [[req.body.questionLib.trim()]]

        connection.query(setQuestion, [value], function (err, result, fields) {
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
  getAllQuestions,
  updateQuestion,
  getNextQuestion,
  getQR,
  setQuestion
}
