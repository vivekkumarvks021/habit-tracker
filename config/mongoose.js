const mongoose = require("mongoose");

// Establish a connection with the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed");

    // Log the error message and terminate the application
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
