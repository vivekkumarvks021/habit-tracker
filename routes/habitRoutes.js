const express = require("express");

const router = express.Router();

const habitController = require("../controllers/habitController");

router.get("/", habitController.home);

router.post("/habits", habitController.createHabit);

module.exports = router;
