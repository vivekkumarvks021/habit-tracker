require("dotenv").config();

const express = require("express");
const connectDB = require("./config/mongoose");

const app = express();

// Establish connection with MongoDB database
connectDB();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware to parse form data, JSON requests, and serve static assets
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const habitRoutes = require("./routes/habitRoutes");

// Register application routes
app.use("/", habitRoutes);

// Use the environment port in production or fallback to 8000 for local development
const PORT = process.env.PORT || 8000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
