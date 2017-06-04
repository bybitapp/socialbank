const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({},{ "strict": false });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
