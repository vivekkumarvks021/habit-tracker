const notification = document.getElementById("notification");

// Display a notification message with the specified type (success or error)
function showNotification(message, type) {
  if (!notification) return;

  notification.textContent = message;

  // Apply the appropriate notification style
  notification.className = `notification ${type}`;

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    notification.className = "notification";
  }, 3000);
}
