const express = require("express")
const reponse = require("../dao/Response.js")
const router = express.Router();

router.post("/getAllResponses", function (req, res) {
  reponse.getAllResponses(req, function callback(err, result) {
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
