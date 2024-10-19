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
const corsOptions = {
    origin: 'https://main.dskc3hnhs7ow3.amplifyapp.com', // Your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // To allow cookies or authorization headers
    optionsSuccessStatus: 200, // Legacy browser support
};

// Middleware to handle CORS
app.use(cors(corsOptions));

// Middleware to ensure correct CORS headers are added
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://main.dskc3hnhs7ow3.amplifyapp.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Handling Preflight Requests (OPTIONS)
app.options('*', cors(corsOptions));


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
