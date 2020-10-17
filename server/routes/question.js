const express = require("express")
const reponse = require("../dao/Question.js")
const router = express.Router();

router.post("/getAllQuestions", function (req, res) {
  reponse.getAllQuestions(req, function callback(err, result) {
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
