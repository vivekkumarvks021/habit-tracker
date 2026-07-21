# 📝 Habit Tracker

A full-stack Habit Tracker application built with **Node.js, Express.js, EJS, MongoDB, and Mongoose**. It allows users to create habits, track their daily progress, monitor weekly performance, and view habit statistics such as completed days and longest streak.

## 🚀 Live Demo

🔗 https://YOUR-RENDER-URL.onrender.com

---

## 📖 Project Overview

Habit Tracker is a simple and intuitive application that helps users build consistency by tracking their daily habits.

Users can:

- Create new habits.
- View all created habits.
- Track habit status for the last 7 days.
- Mark a habit as **Done**, **Not Done**, or **None**.
- Save changes instantly without refreshing the page.
- View habit statistics including:
  - Total Completed Days
  - Longest Streak
  - Total Tracking Days

---

# ✨ Features

### 🏠 Home Page

- Add a new habit.
- Prevent duplicate habit creation.
- Empty input validation.
- Success and error notifications.
- Display all habits.
- Show habit statistics:
  - Completed Days
  - Total Tracking Days
  - Longest Streak

---

### 📅 Weekly Habit Tracker

Track the habit status for the most recent 7 days.

Status cycle:

```
None → Done → Not Done → None
```

Each day's status can be updated with a single click.

---

### 💾 Smart Save

- Save button remains disabled until changes are made.
- Only modified data is sent to the server.
- Saves using AJAX without page refresh.
- Success notification after saving.

---

### 📊 Habit Statistics

Each habit automatically calculates:

- ✅ Completed Days
- 🔥 Longest Streak
- 📅 Total Tracking Days

Statistics are calculated dynamically from the stored history.

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Render

---

# 📁 Project Structure

```
habit-tracker/
│
├── config/
│   └── mongoose.js
│
├── controllers/
│   └── habitController.js
│
├── models/
│   └── habits.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   └── habitRoutes.js
│
├── utils/
│   └── habitStats.js
│
├── views/
│   ├── partials/
│   ├── home.ejs
│   └── weekly.ejs
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository.

```bash
git clone https://github.com/vivekkumarvks021/habit-tracker.git
```

Move into the project.

```bash
cd habit-tracker
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the development server.

```bash
npm run dev
```

Or start normally.

```bash
npm start
```

Open your browser.

```
http://localhost:8000
```

---

# 📂 Environment Variables

Create a `.env` file in the project root.

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

---

# Project Live URL

Live URL: https://habit-tracker-svh9.onrender.com/

---

# 👨‍💻 Author

**Vivek Kumar**

GitHub:
https://github.com/vivekkumarvks021

LinkedIn:
https://www.linkedin.com/in/vivek-kumar-a35282141/

---

# 📜 License

This project is created for learning purposes and Coding Ninjas Mini Project submission.
