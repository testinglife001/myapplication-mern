
// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


 if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    }));
 } else {
    app.use(cors({ credentials: true }));
 }

// ✅ Routers
const authRoute = require('./routes/authRoutes');
const dashboardRoute = require('./routes/Dashboard/dashboardRoutes');
const homeRoute = require('./routes/home/homeRoutes');
const homeCommentRoute = require('./routes/home/homeCommentRoutes');

// ✅ API routes first
app.use('/rest-api', authRoute);
app.use('/rest-api', dashboardRoute);
app.use('/rest-api', homeRoute);
app.use('/rest-api', homeCommentRoute);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./frontend/dist")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './', 'frontend', 'dist', 'index.html'))  
    });
}

// ✅ Health check route
app.get('/', (req, res) => {
  res.send("server is running.");
});

// ✅ Serve React build only in production
/*
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'frontend', 'dist');
   app.use(express.static(frontendPath));

  // ⚠️ fallback only for non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}
*/

// ✅ DB connection
const dbConnect = async () => {
  try {
    // if (process.env.NODE_ENV === 'local') {
      const conn = await mongoose.connect(process.env.DB_URL_LOCAL);
      console.log(`MongoDB connected : ${conn.connection.host}`);
    // }  
    // if (process.env.NODE_ENV === 'production') {
    //   const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL_LOCAL);
      // const conn = await mongoose.connect(process.env.DB_URL_LOCAL);
    //  console.log(`MongoDB connected (production): ${conn.connection.host}`);
    // }
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
};
dbConnect();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`🚀 Server running on port ${PORT}`);
  } else {
    console.error("❌ Server start error:", error);
  }
});
