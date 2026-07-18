const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    history: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Habit", habitSchema);
