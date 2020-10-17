const express = require("express")
const question = require("../dao/Question.js")
const router = express.Router();

router.post("/getAllQuestions", function (req, res) {
  question.getAllQuestions(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
})

router.post("/updateQuestion", function (req, res) {
  question.updateQuestion(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
})

router.post("/getNextQuestion", function (req, res) {
  question.getNextQuestion(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
})
router.post("/getQR", function (req, res) {
  question.getQR(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
})

module.exports = router;
