const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2. SELF-CONTAINED DATABASE CONNECTION LAYER
const connectDB = async () => {
  try {
    console.log('--------------------------------------------');
    console.log('⏳ Attempting to connect to MongoDB Atlas...');
    
    if (!process.env.MONGO_URI) {
      console.log('❌ CRITICAL ERROR: MONGO_URI is missing from your .env file!');
      return;
    }
    
    console.log(`🔗 Target Connection String Loaded Safely.`);

    // Advanced connection flags to eliminate the OpenSSL alert 80 error
    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true // Bypasses local VPN/Antivirus proxy SSL injection hooks
    });

    console.log('✅ MongoDB Connected Successfully to Cloud Atlas!');
    console.log('--------------------------------------------');
  } catch (error) {
    console.log('--------------------------------------------');
    console.error('❌ MongoDB Connection Failed Abruptly!');
    console.error('📋 System Error Message:', error.message);
    console.log('--------------------------------------------');
  }
};

// Execute Database Connection Immediate Initialization
connectDB();

// 3. DATABASE SCHEMA & DATA MODEL
const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  requestType: { type: String, enum: ['project', 'callback'], default: 'project' },
  callbackTime: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', RequestSchema);

// 4. API ROUTE ENDPOINTS
app.post('/api/requests', async (req, res) => {
  try {
    const { name, email, description, requestType, callbackTime } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({ success: false, error: "Please complete all mandatory fields." });
    }

    const newRequest = new Request({
      name,
      email,
      description,
      requestType,
      callbackTime: requestType === 'callback' ? callbackTime : null
    });

    await newRequest.save();
    return res.status(201).json({ success: true, message: "Portfolio request compiled and saved successfully!" });

  } catch (error) {
    console.error("❌ Submission Route Error:", error.message);
    return res.status(500).json({ success: false, error: "Internal Database processing failure." });
  }
});

// 5. BOOT SERVER LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Express App active and monitoring Port: ${PORT}`);
});