const mongoose = require('mongoose');

const yogaTrainerSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Change from `name` to `username`
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  doctorType: { type: String, default: 'YogaTrainer' },
  specialization: String
});

module.exports = mongoose.model('YogaTrainer', yogaTrainerSchema);
