const Habit = require("../models/Habits");
const calculateHabitStats = require("../utils/habitStats");

// Render the home page with all habits and their statistics
module.exports.home = async (req, res) => {
  try {
    const habits = await Habit.find();

    // Calculate statistics for each habit before rendering
    const habitsWithStats = habits.map((habit) => {
      const stats = calculateHabitStats(habit.history, habit.createdAt);

      return {
        ...habit.toObject(),
        stats,
      };
    });

    return res.render("home", {
      habits: habitsWithStats,
      success: req.query.success,
      error: req.query.error,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create a new habit after validating the input
module.exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    // Prevent empty habit names
    if (!name.trim()) {
      return res.redirect("/?error=habit-required");
    }

    // Prevent duplicate habit creation
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

// Render the weekly tracking page for a selected habit
module.exports.showHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const weekData = [];
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.redirect("/");
    }

    // Generate data for the last seven days
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

        // Disable dates before the habit was created
        isDisabled: currentDate < habit.createdAt,
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

// Update and save modified habit history
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

    // Merge the existing history with newly updated statuses
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
