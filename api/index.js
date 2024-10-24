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


const cors = require('cors');
app.use(cors({
  origin: 'https://my-portfolio-sable-chi-29.vercel.app', // Replace '*' with the specific frontend domain if necessary
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


// Middleware to parse JSON
app.use(express.json(
  
));

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes for API
app.use("/auth", authRoute);
app.use("/projects", projectRoute);
app.use("/homeProject", homeProjectRoute);
app.use("/homeHeader", homeHeaderRoute);
app.use("/footer", footerRoute);
app.use("/contact", contactRoute);

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
