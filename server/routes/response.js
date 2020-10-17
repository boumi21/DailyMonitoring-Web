const express = require("express")
const response = require("../dao/Response.js")
const router = express.Router();

router.post("/getAllResponses", function (req, res) {
  response.getAllResponses(req, function callback(err, result) {
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

router.post("/getResponses", function (req, res) {
  response.getResponses(req, function callback(err, result) {
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

router.post("/getResponses", function (req, res) {
  response.getResponses(req, function callback(err, result) {
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

router.post("/setResponse", function (req, res) {
  response.setResponse(req, function callback(err, result) {
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
