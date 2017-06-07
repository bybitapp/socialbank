const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: String,
  number: { type: String, unique: true },
  address: String,
  postcode: String,
  city: String,
  bankAccount: {
    owner: String,
    bankName: String,
    ibanCode: String,
    swiftCode: String,
    branchCode: String,
    bankCode: String,
    bankAccountNumber: String,
    externalAccountId: String,
    externalAccountName: String,
  },
  users: [{ type : mongoose.Schema.ObjectId, ref: 'User' }]
});

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
