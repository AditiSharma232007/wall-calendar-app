// Importing React hook for managing state
import { useState } from "react";

// Importing custom components
import CalendarGrid from "./CalendarGrid";   // Displays the calendar days
import NotesPanel from "../Notes/NotesPanel"; // Handles notes for selected dates
import HeroSection from "../Hero/HeroSection"; // Displays image + month info

// Importing data
import { MONTH_DATA } from "../../utils/constants"; // Contains month names & images
import { HOLIDAYS } from "../../utils/holidays";    // Contains holiday dates

export default function WallCalendar() {

  // Get today's date
  const today = new Date();

  // State for current year and month
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // State for date selection (range + single)
  const [startDate, setStartDate] = useState(null); // start of selection
  const [endDate, setEndDate] = useState(null);     // end of selection
  const [selectedDate, setSelectedDate] = useState(null); // single clicked date

  // Get current month data (name + image)
  const current = MONTH_DATA[month];

  // Function to clear all selected dates
  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
  };

  return (
    <div style={containerStyle}>
      
      /* ===== TOP CONTROLS (Month + Year + Clear Button) ===== */
      <div style={controlsStyle}>

        {/* Dropdown to select month */}
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={selectStyle}
        >
          {MONTH_DATA.map((m, i) => (
            <option key={i} value={i}>{m.name}</option>
          ))}
        </select>

        /* Dropdown to select year */
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={selectStyle}
        >
          /* Generates years from currentYear-50 to currentYear+50 */
          {Array.from({ length: 101 }, (_, i) =>
            new Date().getFullYear() - 50 + i
          ).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        /* Button to clear selected dates */
        <button onClick={clearSelection} style={clearBtn}>
          Clear Selection
        </button>
      </div>

      /* ===== MAIN DASHBOARD LAYOUT ===== */
      <div style={dashboardLayout}>

        /* LEFT PANEL → Shows hero image + month/year */
        <div style={leftPanel}>
          <HeroSection
            month={current.name}
            year={year}
            image={current.image}
          />
        </div>

        /* CENTER PANEL → Calendar grid */
        <div style={centerPanel}>

          /* Display selected date range */
          {startDate && (
            <div style={rangeInfo}>
              {endDate
                ? `Selected: ${startDate.toDateString()} → ${endDate.toDateString()}`
                : `Selected: ${startDate.toDateString()}`}
            </div>
          )}

          /* Calendar component */
          <CalendarGrid
            year={year}
            month={month}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSelectedDate={setSelectedDate}
          />

        </div>

        /* RIGHT PANEL → Notes + Holiday Info */
        <div style={rightPanel}>

          /* Notes section */
          <NotesPanel startDate={startDate} endDate={endDate} />

          /* Holiday display */
          {selectedDate && (() => {

            // Format date as YYYY-MM-DD
            const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

            // Check if selected date is a holiday
            const holiday = HOLIDAYS[key];

            return holiday ? (
              <div style={holidayBox}>
                <strong>Holiday:</strong> {holiday}
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {selectedDate.toDateString()}
                </div>
              </div>
            ) : null;

          })()}

        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

// Main container styling
const containerStyle = {
  maxWidth: 1200,
  margin: "40px auto",
  padding: 20,
  background: "#ffffff",
  borderRadius: 16,
  boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
  fontFamily: "Inter, sans-serif",
  overflow: "hidden" 
};

// Top controls styling
const controlsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 15,
  padding: 15,
  background: "#f3f6fb",
  borderRadius: 12,
  marginBottom: 20,
  flexWrap: "wrap"
};

// Dropdown styling
const selectStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ddd"
};

// Clear button styling
const clearBtn = {
  padding: "10px 14px",
  borderRadius: 8,
  background: "#c21d7d",
  color: "white",
  border: "none",
  cursor: "pointer"
};

// Layout for 3 panels
const dashboardLayout = {
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between"
};

// Left panel (image section)
const leftPanel = {
  flex: "1.5",
  minWidth: 300
};

// Center panel (calendar)
const centerPanel = {
  flex: "1",
  minWidth: 0,
  background: "#f9fafc",
  padding: 15,
  borderRadius: 12
};

// Right panel (notes + holiday)
const rightPanel = {
  flex: "0 0 300px",
  maxWidth: 300,
  display: "flex",
  flexDirection: "column",
  gap: 15
};

// Selected date info box
const rangeInfo = {
  marginBottom: 10,
  padding: "8px 12px",
  background: "#eef2ff",
  borderRadius: 8,
  fontWeight: "500"
};

// Holiday box styling
const holidayBox = {
  padding: "10px",
  background: "#fff7ed",
  borderRadius: 8,
  color: "#c20c6a",
  fontWeight: "500"
};