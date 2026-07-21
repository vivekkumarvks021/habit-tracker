const statusButtons = document.querySelectorAll(".status-btn");
const saveButton = document.getElementById("save-btn");
const habitId = window.location.pathname.split("/").pop();

// Stores only the modified habit statuses
let updatedHistory = {};

// Defines the status transition sequence
const statusFlow = {
  none: "done",
  done: "not-done",
  "not-done": "none",
};

// Returns the corresponding icon for each habit status
function getStatusIcon(status) {
  switch (status) {
    case "done":
      return "✅";

    case "not-done":
      return "❌";

    default:
      return "⚪";
  }
}

// Handle status updates for each day
statusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentStatus = button.dataset.status;

    const nextStatus = statusFlow[currentStatus];

    const selectedDate = button.dataset.date;

    const originalStatus = button.dataset.originalStatus;

    // Update the current status
    button.dataset.status = nextStatus;

    // Update the displayed status icon
    button.textContent = getStatusIcon(nextStatus);

    // Refresh the status-specific CSS class
    button.classList.remove("status-none", "status-done", "status-not-done");

    button.classList.add(`status-${nextStatus}`);

    // Track only the dates whose status has changed
    if (nextStatus === originalStatus) {
      delete updatedHistory[selectedDate];
    } else {
      updatedHistory[selectedDate] = nextStatus;
    }

    // Enable the Save button only when changes exist
    saveButton.disabled = Object.keys(updatedHistory).length === 0;
  });
});

// Save all modified statuses without reloading the page
saveButton.addEventListener("click", async () => {
  if (Object.keys(updatedHistory).length === 0) {
    return;
  }

  try {
    toggleSaveButton(true);

    const response = await fetch(`/habits/${habitId}/update-history`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        history: updatedHistory,
      }),
    });

    const result = await response.json();

    if (result.success) {
      // Clear tracked changes after a successful save
      updatedHistory = {};

      toggleSaveButton(false);

      // Store the latest saved status as the new original state
      statusButtons.forEach((button) => {
        button.dataset.originalStatus = button.dataset.status;
      });

      // Disable Save button until another change is made
      saveButton.disabled = true;

      showNotification("Habit updated successfully!", "success");
    }
  } catch (error) {
    console.log(error);

    toggleSaveButton(false);
  }
});

// Toggle loading state for the Save button
function toggleSaveButton(isLoading) {
  if (isLoading) {
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
  } else {
    saveButton.textContent = "Save Changes";
    saveButton.disabled = Object.keys(updatedHistory).length === 0;
  }
}
