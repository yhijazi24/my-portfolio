const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const homeProjectRoute = require("./routes/homeProjects");
const homeHeaderRoute = require("./routes/homeHeader");
const footerRoute = require("./routes/footer");
const contactRoute = require("./routes/contact");

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://main.dskc3hnhs7ow3.amplifyapp.com',
    credentials: true,  // If you're dealing with cookies or credentials
    optionsSuccessStatus: 200
}));

// Log headers to check for duplicates
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://main.dskc3hnhs7ow3.amplifyapp.com');
    console.log('CORS Headers:', res.getHeaders()); // Logs headers to verify
    next();
});

// Handle preflight requests for all routes (OPTIONS method)
app.options('*', cors());

// Middleware to handle JSON requests
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.use("/auth", authRoute);
app.use("/projects", projectRoute);
app.use("/homeProject", homeProjectRoute);
app.use("/homeHeader", homeHeaderRoute);
app.use("/footer", footerRoute);
app.use("/contact", contactRoute);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}!`);
});
