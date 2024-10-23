const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');  // Make sure to require 'path'

const authRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const homeProjectRoute = require("./routes/homeProjects");
const homeHeaderRoute = require("./routes/homeHeader");
const footerRoute = require("./routes/footer");
const contactRoute = require("./routes/contact");

dotenv.config();

const app = express();

// Use cors middleware

app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../ui/dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../ui/dist', 'index.html'));
});
// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes for API
app.use("api/auth", authRoute);
app.use("api/projects", projectRoute);
app.use("api/homeProject", homeProjectRoute);
app.use("api/homeHeader", homeHeaderRoute);
app.use("api/footer", footerRoute);
app.use("api/contact", contactRoute);

// Serve static files from React app (build folder)
app.use(express.static(path.join(__dirname, 'build')));

// Handle any other requests by serving the React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
