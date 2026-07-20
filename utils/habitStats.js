function calculateHabitStats(history, createdAt) {
  let completedDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  // Today's date (used to calculate total days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Habit creation date
  const createdDate = new Date(createdAt);
  createdDate.setHours(0, 0, 0, 0);

  // Total days since habit was created
  const totalDays = Math.max(
    1,
    Math.floor((today - createdDate) / (1000 * 60 * 60 * 24)) + 1,
  );

  const historyEntries = Object.entries(history);

  // Sort history by date (oldest → newest)
  historyEntries.sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  historyEntries.forEach(([date, status]) => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    // Ignore history entries before the habit was created
    if (currentDate < createdDate) {
      return;
    }

    // Count completed days
    if (status === "done") {
      completedDays++;
    }

    if (previousDate) {
      const differenceInDays =
        (currentDate - previousDate) / (1000 * 60 * 60 * 24);

      if (status === "done") {
        if (differenceInDays === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    } else {
      if (status === "done") {
        currentStreak = 1;
        longestStreak = 1;
      }
    }

    previousDate = currentDate;
  });

  return {
    completedDays,
    longestStreak,
    totalDays,
  };
}

module.exports = calculateHabitStats;

// ---------- Temporary Test ----------

const stats = calculateHabitStats(
  {
    "2026-07-13": "done",
    "2026-07-14": "done",
    "2026-07-15": "done",
    "2026-07-16": "done",
    "2026-07-17": "not-done",
    "2026-07-18": "done",
    "2026-07-19": "done",
    "2026-07-20": "done",
  },
  new Date("2026-07-15"),
);

console.log(stats);
