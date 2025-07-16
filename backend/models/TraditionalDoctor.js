const mongoose = require('mongoose');

const traditionalDoctorSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Change from `name` to `username` for consistency
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  doctorType: { type: String, default: 'Traditional' },
  specialization: String
});

module.exports = mongoose.model('TraditionalDoctor', traditionalDoctorSchema);
