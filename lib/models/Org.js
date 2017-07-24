const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
  name: String,
  number: { type: String, unique: true },
  location: {
    address: String,
    postcode: String,
    city: String,
    lat: Number,
    lng: Number
  },
  status: { type: String, default: 'ACTIVE' },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

const Org = mongoose.model('Org', orgSchema)

module.exports = Org
