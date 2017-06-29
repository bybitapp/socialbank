const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  name: String,
  status: String,
  virtualCardId: String,
  virtualCardName: String,
  project: { type: mongoose.Schema.ObjectId, ref: 'Project' }
})

cardSchema.index({name: 1, project: 1}, {unique: true})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card
