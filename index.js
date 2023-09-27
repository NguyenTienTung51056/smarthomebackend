const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 8000;
const connectDB = require("./config/db");
const cors = require("cors");
//use color for console
const colors = require("colors");
const cookieParser = require("cookie-parser");
const route = require("./router/index");
//connect to database
connectDB.connectDB();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://smartthomee.netlify.app",
        ],
        credentials: true,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
        exposedHeaders: ["Set-Cookie"],
    })
);

app.use(cookieParser());
app.use(express.json());

//router
route(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT} `.cyan.white.bold));
