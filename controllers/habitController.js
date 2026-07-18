const Habit = require("../models/Habits");

module.exports.home = async (req, res) => {
  try {
    const habits = await Habit.find();

    return res.render("home", {
      habits,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res.redirect("/");
    }

    const existingHabit = await Habit.findOne({
      name: name.trim(),
    });

    if (existingHabit) {
      return res.redirect("/");
    }

    await Habit.create({
      name: name.trim(),
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
