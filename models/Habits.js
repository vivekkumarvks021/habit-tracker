const mongoose = require("mongoose");

// Schema for storing habit details and tracking history
const habitSchema = new mongoose.Schema(
  {
    // Unique name of the habit
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // Stores daily habit status in the format:
    // {
    //   "2026-07-21": "done",
    //   "2026-07-22": "not-done"
    // }
    history: {
      type: Object,
      default: {},
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  },
);

module.exports = mongoose.model("Habit", habitSchema);
