const mongoose = require('mongoose')

const access = ['public', 'donors', 'private']
const states = ['active', 'deleted']

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  access: { type: String, enum: access, default: 'private' },
  status: { type: String, enum: states, default: 'active' },
  organization: { type: mongoose.Schema.ObjectId, ref: 'Org' },
  managedAccountId: { type: Number },
  managedAccountName: { type: String },
  managedAccountCreated: Number
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
