const Habit = require("../models/Habits");

module.exports.home = async (req, res) => {
  try {
    const habits = await Habit.find();

    return res.render("home", {
      habits,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      return res.redirect("/?error=habit-required");
    }

    const existingHabit = await Habit.findOne({
      name: name.trim(),
    });

    if (existingHabit) {
      return res.redirect("/?error=habit-exists");
    }

    await Habit.create({
      name: name.trim(),
    });

    return res.redirect("/?success=habit-added");
  } catch (error) {
    console.log(error);
  }
};

module.exports.showHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.redirect("/");
    }

    const weekData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();

      currentDate.setDate(currentDate.getDate() - i);

      const fullDate = currentDate.toISOString().split("T")[0];

      weekData.push({
        fullDate,
        day: currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }),
        status: habit.history[fullDate] || "none",
      });
    }

    return res.render("weekly", {
      habit,
      weekData,
    });
  } catch (error) {
    console.log(error);

    return res.redirect("/");
  }
};

module.exports.updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { history } = req.body;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    // Merge updated history
    habit.history = {
      ...habit.history,
      ...history,
    };

    await habit.save();

    return res.json({
      success: true,
      message: "History updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
