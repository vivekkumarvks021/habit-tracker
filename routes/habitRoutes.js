const express = require("express");

const router = express.Router();

const habitController = require("../controllers/habitController");

// Render the home page with all habits
router.get("/", habitController.home);

// Create a new habit
router.post("/habits", habitController.createHabit);

// Display weekly tracking page for a specific habit
router.get("/habits/:id", habitController.showHabit);

// Save updated weekly habit history
router.post("/habits/:id/update-history", habitController.updateHistory);

module.exports = router;
