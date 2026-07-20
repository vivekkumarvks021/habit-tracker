const statusButtons = document.querySelectorAll(".status-btn");
const saveButton = document.getElementById("save-btn");
const habitId = window.location.pathname.split("/").pop();

let updatedHistory = {};

const statusFlow = {
  none: "done",
  done: "not-done",
  "not-done": "none",
};

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

statusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentStatus = button.dataset.status;

    const nextStatus = statusFlow[currentStatus];

    const selectedDate = button.dataset.date;

    const originalStatus = button.dataset.originalStatus;

    // Update current status
    button.dataset.status = nextStatus;

    // Update button text
    button.textContent = getStatusIcon(nextStatus);

    // Update button class
    button.classList.remove("status-none", "status-done", "status-not-done");

    button.classList.add(`status-${nextStatus}`);

    // Compare with original status
    if (nextStatus === originalStatus) {
      delete updatedHistory[selectedDate];
    } else {
      updatedHistory[selectedDate] = nextStatus;
    }

    // Enable / Disable Save button
    saveButton.disabled = Object.keys(updatedHistory).length === 0;

    console.log(updatedHistory);
  });
});

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
      // Clear updated history
      updatedHistory = {};
      toggleSaveButton(false);
      // Update original status
      statusButtons.forEach((button) => {
        button.dataset.originalStatus = button.dataset.status;
      });

      // Disable save button
      saveButton.disabled = true;

      showNotification("Habit updated successfully!", "success");
    }

    console.log(result);
  } catch (error) {
    console.log(error);
    toggleSaveButton(false);
  }
});

function toggleSaveButton(isLoading) {
  if (isLoading) {
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
  } else {
    saveButton.textContent = "Save Changes";
    saveButton.disabled = Object.keys(updatedHistory).length === 0;
  }
}
