const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');  // Make sure to require 'path'

const sequelize = require('./db');

const authRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const homeProjectRoute = require("./routes/homeProjects");
const homeHeaderRoute = require("./routes/homeHeader");
const footerRoute = require("./routes/footer");
const contactRoute = require("./routes/contact");

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://www.yhijaziportfolio.com"], // your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));




// Middleware to parse JSON
app.use(express.json(
  
));

// Database connection
sequelize.sync({ alter: true })
  .then(() => console.log("PostgreSQL DB synced"))
  .catch((err) => console.error("DB sync error:", err));


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
