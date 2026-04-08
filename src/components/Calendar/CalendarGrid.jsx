// Import React hook for managing hover state
import { useState } from "react";

// Import utility functions and constants
import { DAYS, getDaysInMonth, getFirstDayOfMonth } from "../../utils/dateUtils";

// Import DayCell component
import DayCell from "./DayCell";

export default function CalendarGrid(props) {

  // Extract year and month from props
  const { year, month } = props;

  // State to track which date is being hovered
  const [hoverDate, setHoverDate] = useState(null);

  // Get total number of days in the selected month
  const daysInMonth = getDaysInMonth(year, month);

  // Get starting day of the month (e.g., Monday = 1)
  const firstDay = getFirstDayOfMonth(year, month);

  // Array to store all calendar cells (including empty ones)
  const cells = [];

  // Add empty cells before the first day (for alignment)
  for (let i = 0; i < firstDay; i++) cells.push(null);

  // Add actual days (1 → last day of month)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>

      {/* ===== WEEKDAY HEADER (Sun, Mon, Tue...) ===== */}
      <div style={headerStyle}>
        {DAYS.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* ===== CALENDAR GRID ===== */}
      <div style={gridStyle}>

        {/* Loop through all cells (empty + dates) */}
        {cells.map((day, i) => (

          <DayCell
            key={i}

            // day => number (1,2,3...) OR null (empty cell)
            day={day}

            // hover state (used for range selection UI)
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}

            // spread all other props (year, month, startDate, etc.)
            {...props}
          />

        ))}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

// Style for weekday header (Sun, Mon...)
const headerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7,1fr)",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: 10
};

// Style for calendar grid
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7,1fr)",
  gap: 8
};