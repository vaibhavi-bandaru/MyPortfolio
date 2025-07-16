const mongoose = require('mongoose');

const modernDoctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },  // Add if you want to store contact
  doctorType: { type: String, default: 'Modern' },
  specialization: String
});

module.exports = mongoose.model('ModernDoctor', modernDoctorSchema);
