const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({},{ "strict": false });

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
