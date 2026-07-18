const express = require("express");

const router = express.Router();

const habitController = require("../controllers/habitController");

router.get("/", habitController.home);

router.post("/habits", habitController.createHabit);

router.get("/habits/:id", habitController.showHabit);

router.post("/habits/:id/update-history", habitController.updateHistory);

module.exports = router;
