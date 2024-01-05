const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true }
  
});

module.exports = mongoose.model('thing', thingSchema);