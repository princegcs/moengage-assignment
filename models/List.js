const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  responseCodes: [String],
  imageLinks: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('List', listSchema);
