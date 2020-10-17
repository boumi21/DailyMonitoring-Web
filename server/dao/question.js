const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getAllQuestions(req, callback) {
  let getAllQuestions = "SELECT * FROM question q "
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
  let checkQuestion = "SELECT * FROM question q " +
                      "WHERE q.question = " + mysql.escape(req.body.questionLib.trim()) + " " +
                      "AND q.num_question <> " + mysql.escape(req.body.questionId)

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
          let updateQuestion = "UPDATE question q SET " +
                               "question = " + mysql.escape(req.body.question) + " " +
                               "WHERE q.num_question = " + mysql.escape(req.body.questionId)

          connection.query(updateQuestion, function (err, result, fields) {
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

function getNextQuestion(req, callback) {
  let getNextQuestion = "SELECT q.* FROM question q " +
                        "LEFT JOIN possede p " +
                        "ON q.num_question = p.num_question_suivante " +
                        "WHERE p.num_question = " + mysql.escape(req.body.questionId) + " " +
                        "AND p.num_reponse = " + mysql.escape(req.body.reponseId)

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

function getQRNQ(req, callback) {
  let getQRNQ = "SELECT q.num_question, q.question, r.num_reponse, r.reponse, p.num_question_suivante, pq.question FROM question q " +
                "LEFT JOIN possede p " +
                "ON q.num_question = p.num_question " +
                "LEFT JOIN reponse r " +
                "ON p.num_reponse = r.num_reponse " +
                "LEFT JOIN question pq " +
                "ON p.num_question_suivante = pq.num_question " +
                "WHERE q.num_question = " + mysql.escape(req.body.questionId)

  connection.query(getQRNQ, function (err, result, fields) {
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
  let checkQuestion = "SELECT * FROM question q " +
                      "WHERE q.question = " + mysql.escape(req.body.questionLib.trim())

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

function deleteQuestion(req, callback) {
  let updatePossede = "UPDATE possede p " +
    "SET p.num_question_suivante = NULL " +
    "WHERE p.num_question_suivante = " + req.body.questionId

  connection.query(updatePossede, function (err, result, fields) {
    if (err) {
      console.log(err)
      callback(err.sqlMessage, null)
    }
    else {
      console.log(result.protocol41)
      let deleteQuestion = "DELETE FROM question " +
                           "WHERE num_question = " + mysql.escape(req.body.questionId)

      connection.query(deleteQuestion, function (err, result, fields) {
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

module.exports = {
  getAllQuestions,
  updateQuestion,
  getNextQuestion,
  getQRNQ,
  setQuestion,
  deleteQuestion
}
