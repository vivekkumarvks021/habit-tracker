require("dotenv").config();

const express = require("express");
const connectDB = require("./config/mongoose");

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const habitRoutes = require("./routes/habitRoutes");

app.use("/", habitRoutes);

// app.get("/", (req, res) => {
//   res.render("home");
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
