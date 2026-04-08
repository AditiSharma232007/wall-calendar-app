#  Wall Calendar App

An interactive and visually appealing **Wall Calendar Web Application** built using **React.js**.
This project allows users to view calendars, select date ranges, add notes, and view holidays — all in a clean dashboard layout.

---

##  Features

 **Dynamic Calendar**

* Displays any month and year
* Automatically adjusts days and layout

 **Date Range Selection**

* Select single date or a range of dates
* Smart handling (auto swap if selected in reverse)

 **Hover Preview**

* Preview date range while hovering (smooth UX)

 **Notes Panel**

* Add and view notes for selected dates
* Helps in planning and productivity

 **Holiday Indicator**

* Highlights holidays with a dot
* Shows holiday name on hover

 **Modern UI Design**

* Clean dashboard layout (Hero + Calendar + Notes)
* Smooth hover animations and transitions

 **Hero Section**

* Displays month-specific image and details

---

##  Tech Stack

* **Frontend:** React.js
* **Styling:** Inline CSS (Custom styling)
* **State Management:** React Hooks (`useState`)
* **Utilities:** Custom date functions

---

##  Project Structure

```
src/
│
├── components/
│   ├── Calendar/
│   │   ├── CalendarGrid.js
│   │   ├── DayCell.js
│   │   └── WallCalendar.js
│   │
│   ├── Notes/
│   │   └── NotesPanel.js
│   │
│   └── Hero/
│       └── HeroSection.js
│
├── utils/
│   ├── dateUtils.js
│   ├── holidays.js
│   └── constants.js
│
├── App.js
└── index.js
```

---

##  How to Run the Project

### 1️. Install dependencies

```
npm install
```

### 2️. Start the development server

```
npm start
```

### 3️. Open in browser

```
http://localhost:3000
```

---

##  Key Concepts Used

* Dynamic rendering using `.map()`
* Date manipulation using JavaScript Date API
* Component-based architecture
* State management with React Hooks
* Conditional styling
* Interactive UI (hover + click handling)

---

##  Use Case

This project can be used for:

* Personal scheduling
* Event tracking
* Productivity planning
* Learning React fundamentals

---

##  Future Improvements

* Add backend for persistent notes
* Add user authentication
* Add drag-and-drop event system
* Add dark/light theme toggle
* Mobile responsiveness improvements

---

##  Author

**Aditi Sharma**

---

##  If you like this project

Give it a star on GitHub and feel free to fork it!

---
