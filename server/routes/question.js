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

router.post("/getQRNQ", function (req, res) {
  question.getQRNQ(req, function callback(err, result) {
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

router.post("/setQuestion", function (req, res) {
  question.setQuestion(req, function callback(err, result) {
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

router.post("/deleteQuestion", function (req, res) {
  question.deleteQuestion(req, function callback(err, result) {
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

router.post("/addQuestion", function (req, res) {
  question.addQuestion(req, function callback(err, result) {
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
