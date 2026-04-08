// Importing React hook for managing state
import { useState } from "react";

// Importing custom components
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "../Notes/NotesPanel";
import HeroSection from "../Hero/HeroSection";

// Importing data
import { MONTH_DATA } from "../../utils/constants";
import { HOLIDAYS } from "../../utils/holidays";

export default function WallCalendar() {

  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // State for date selection (range + single)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

      {/* ===== TOP CONTROLS ===== */}
      <div style={controlsStyle}>

        {/* Month Dropdown */}
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={selectStyle}
        >
          {MONTH_DATA.map((m, i) => (
            <option key={i} value={i}>{m.name}</option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={selectStyle}
        >
          {Array.from({ length: 101 }, (_, i) =>
            new Date().getFullYear() - 50 + i
          ).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* Clear Button */}
        <button onClick={clearSelection} style={clearBtn}>
          Clear Selection
        </button>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div style={dashboardLayout}>

        {/* LEFT PANEL */}
        <div style={leftPanel}>
          <HeroSection
            month={current.name}
            year={year}
            image={current.image}
          />
        </div>

        {/* CENTER PANEL */}
        <div style={centerPanel}>

          {/* Selected Date Info */}
          {startDate && (
            <div style={rangeInfo}>
              {endDate
                ? `Selected: ${startDate.toDateString()} → ${endDate.toDateString()}`
                : `Selected: ${startDate.toDateString()}`}
            </div>
          )}

          {/* Calendar */}
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

        {/* RIGHT PANEL */}
        <div style={rightPanel}>

          {/* Notes */}
          <NotesPanel startDate={startDate} endDate={endDate} />

          {/* Holiday Info */}
          {selectedDate && (() => {

            // Format date as YYYY-MM-DD
            const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

            // Check holiday
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

// Main container
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

// Controls
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

const selectStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ddd"
};

const clearBtn = {
  padding: "10px 14px",
  borderRadius: 8,
  background: "#c21d7d",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const dashboardLayout = {
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between"
};

const leftPanel = {
  flex: "1.5",
  minWidth: 300
};

const centerPanel = {
  flex: "1",
  minWidth: 0,
  background: "#f9fafc",
  padding: 15,
  borderRadius: 12
};

const rightPanel = {
  flex: "0 0 300px",
  maxWidth: 300,
  display: "flex",
  flexDirection: "column",
  gap: 15
};

const rangeInfo = {
  marginBottom: 10,
  padding: "8px 12px",
  background: "#eef2ff",
  borderRadius: 8,
  fontWeight: "500"
};

const holidayBox = {
  padding: "10px",
  background: "#fff7ed",
  borderRadius: 8,
  color: "#c20c6a",
  fontWeight: "500"
};