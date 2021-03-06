var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var logger = require("morgan");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var responseRouter = require("./routes/response");
var questionRouter = require("./routes/question");

var app = express();
var db = require("./database/Database.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRouter);
app.use("/response", responseRouter);
app.use("/question", questionRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
