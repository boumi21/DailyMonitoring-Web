/*
  Connexion à la bdd MySQL
*/

const { Sequelize } = require('sequelize');

const connection = new Sequelize('tx52', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = {
  Sequelize,
  connection,
};
