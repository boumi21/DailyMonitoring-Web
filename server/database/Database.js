/*
  Connexion à la bdd MySQL
*/

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tx52",
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("info", "Connected to MySQL DB");
  }
});

module.exports = {
  mysql,
  connection,
};
