const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({},{ "strict": false });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
