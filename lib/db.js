const mongoose = require('mongoose');
const chalk = require('chalk');

const config = require('config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl);
console.log('Connecting to', config.mongoUrl);

mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

module.exports = mongoose.connection;
