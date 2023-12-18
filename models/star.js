const mongoose = require('mongoose');

const starSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  
});

module.exports = mongoose.model('star', starSchema);