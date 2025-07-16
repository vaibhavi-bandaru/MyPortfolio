const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Connect to MongoDB (correct DB: online_therapy_guidance_system)
mongoose.connect('mongodb://localhost:27017/online_therapy_guidance_system')
  .then(() => console.log("✅ Connected to MongoDB: online_therapy_guidance_system"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define models (collections)
const Admin = mongoose.model('Admin', new mongoose.Schema({}, { strict: false }), 'admin');
const ModernDoctor = mongoose.model('ModernDoctor', new mongoose.Schema({}, { strict: false }), 'modern_doctor');
const TraditionalDoctor = mongoose.model('TraditionalDoctor', new mongoose.Schema({}, { strict: false }), 'traditinal_doctor');
const Trainer = mongoose.model('Trainer', new mongoose.Schema({}, { strict: false }), 'yoga_trainer');
const Patient = mongoose.model('Patient', new mongoose.Schema({}, { strict: false }), 'patient');

// ✅ Login Route
app.post('/api/login', async (req, res) => {
  const { email, password, domain } = req.body;
  let Model;

  if (domain === 'admin') Model = Admin;
  else if (domain === 'doctor_modern') Model = ModernDoctor;
  else if (domain === 'doctor_traditional') Model = TraditionalDoctor;
  else if (domain === 'trainer') Model = Trainer;
  else if (domain === 'patient') Model = Patient;
  else return res.status(400).json({ message: "❌ Invalid domain" });

  try {
    console.log("🛂 Login attempt:", req.body);

    const user = await Model.findOne({ email: email.trim() });

    console.log("🔎 Found user:", user);

    if (!user || String(user.password) !== String(password)) {
      return res.status(401).json({ message: "❌ Invalid email or password" });
    }

    res.json({ message: "✅ Login successful", user });
  } catch (err) {
    console.error("🚨 Login error:", err);
    res.status(500).json({ message: "Login error" });
  }
});

// ✅ Admin Dashboard APIs

// 🩺 All doctors (modern + traditional)
app.get('/api/admin/doctors', async (req, res) => {
  try {
    const modern = await ModernDoctor.find();
    const traditional = await TraditionalDoctor.find();
    res.json({ modern, traditional });
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// 🧘 Trainers
app.get('/api/admin/trainers', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trainers" });
  }
});

// 👨‍⚕️ Patients
app.get('/api/admin/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients" });
  }
});

// 🌐 Redirect root to login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
