const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  managedCardId: { type: Number },
  friendlyName: String,
  nameOnCard: String,
  project: { type : mongoose.Schema.ObjectId, ref: 'Project' },
},{ "strict": false });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
