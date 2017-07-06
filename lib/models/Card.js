const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  status: String,
  virtualCardId: String,
  virtualCardName: String,
  project: { type: mongoose.Schema.ObjectId, ref: 'Project' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

cardSchema.index({user: 1, project: 1}, {unique: true})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card
