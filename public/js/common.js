const notification = document.getElementById("notification");

function showNotification(message, type) {
  if (!notification) return;

  notification.textContent = message;

  notification.className = `notification ${type}`;

  setTimeout(() => {
    notification.className = "notification";
  }, 3000);
}
