// Calculate habit statistics from the complete tracking history
function calculateHabitStats(history, createdAt) {
  let completedDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  // Normalize today's date to ignore time while calculating total days
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize the habit creation date
  const createdDate = new Date(createdAt);
  createdDate.setHours(0, 0, 0, 0);

  // Calculate the total number of days since the habit was created
  const totalDays = Math.max(
    1,
    Math.floor((today - createdDate) / (1000 * 60 * 60 * 24)) + 1,
  );

  // Convert the history object into an array for chronological processing
  const historyEntries = Object.entries(history);

  // Sort history entries from oldest to newest
  historyEntries.sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  historyEntries.forEach(([date, status]) => {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    // Skip any history that exists before the habit creation date
    if (currentDate < createdDate) {
      return;
    }

    // Count the number of completed days
    if (status === "done") {
      completedDays++;
    }

    if (previousDate) {
      const differenceInDays =
        (currentDate - previousDate) / (1000 * 60 * 60 * 24);

      if (status === "done") {
        // Continue the streak if the habit was completed on consecutive days
        if (differenceInDays === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }

        // Update the longest streak whenever a new maximum is reached
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        // Reset the current streak if the habit was not completed
        currentStreak = 0;
      }
    } else {
      // Initialize the streak from the first completed entry
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
