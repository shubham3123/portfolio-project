const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Only load dotenv if we are running locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 🚀 INITIALIZE EXPRESS APP FIRST BEFORE USING IT
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
      console.log('❌ CRITICAL ERROR: MONGO_URI is missing from your Environment Variables!');
      return;
    }
    
    console.log(`🔗 Target Connection String Loaded Safely.`);

    await mongoose.connect(process.env.MONGO_URI, {
      tlsAllowInvalidCertificates: true 
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

app.get('/', (req, res) => {
  res.send('🚀 Express Backend Server is running successfully on Vercel!');
});

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
    return res.status(500).json({ success: false, error: "Internal Database processing failure." });
  }
});

// 5. BOOT SERVER LISTENER (Conditional for Local Env)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Express App active locally on Port: ${PORT}`);
  });
}

// CRITICAL FOR VERCEL SERVERLESS ENVIRONMENT: Must be exported globally at the bottom
module.exports = app;