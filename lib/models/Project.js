const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  access: String,
  status: String,
  organization: { type: mongoose.Schema.ObjectId, ref: 'Org' },
  managedAccountId: { type: Number },
  managedAccountName: { type: String },
  managedAccountCreated: Number
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
