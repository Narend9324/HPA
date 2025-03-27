// server.js
const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();


app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const nadoRoutes = require('./routes/nadoRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use("/run", nadoRoutes);

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Start the server
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
