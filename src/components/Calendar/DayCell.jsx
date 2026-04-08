// Import helper functions for date comparison
import { isSameDay, isBetween } from "../../utils/dateUtils";

// Import holiday data
import { HOLIDAYS } from "../../utils/holidays";

export default function DayCell({
  day,
  year,
  month,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  hoverDate,
  setHoverDate,
  setSelectedDate
}) {

  // If no day (empty cell), render blank div
  if (!day) return <div></div>;

  // Create date object for this cell
  const date = new Date(year, month, day);

  // Get today's date
  const today = new Date();

  // ===== HOLIDAY LOGIC =====

  // Format date as YYYY-MM-DD (to match holiday keys)
  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // Check if this date is a holiday
  const holiday = HOLIDAYS[dateKey];

  // ===== CLICK HANDLER =====

  const handleClick = () => {

    // Store selected date (used for holiday display panel)
    setSelectedDate(date);

    // If no start date OR range already completed → reset selection
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);

    } else {

      // If clicked date is before start → swap range
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        // Otherwise set as end date
        setEndDate(date);
      }
    }
  };

  // If endDate not selected yet, use hoverDate for preview
  const effectiveEnd = endDate || hoverDate;

  // ===== DATE STATE CHECKS =====

  const isStart = isSameDay(date, startDate); // start of range
  const isEnd = isSameDay(date, endDate);     // end of range
  const isToday = isSameDay(date, today);     // today's date
  const inRange = isBetween(date, startDate, effectiveEnd); // between dates

  // ===== BASE STYLE =====

  let style = {
    padding: 12,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
    borderRadius: 0,
    transform: "scale(1)"
  };

  // ===== HOVER EFFECT =====

  const handleHover = (e, scale) => {
    e.currentTarget.style.transform = `scale(${scale})`;

    // Add shadow when hovering
    e.currentTarget.style.boxShadow =
      scale > 1 ? "0 6px 14px rgba(0,0,0,0.15)" : "none";
  };

  // ===== CONDITIONAL STYLING =====

  // Highlight today's date
  if (isToday) {
    style.border = "2px solid #facc15";
  }

  // Start date styling
  if (isStart) {
    style.background = "#4f46e5";
    style.color = "#fff";
    style.fontWeight = "bold";
    style.borderTopLeftRadius = 12;
    style.borderBottomLeftRadius = 12;

  // End date styling
  } else if (isEnd) {
    style.background = "#22c55e";
    style.color = "#fff";
    style.fontWeight = "bold";
    style.borderTopRightRadius = 12;
    style.borderBottomRightRadius = 12;

  // Dates inside selected range
  } else if (inRange) {
    style.background = "#c7d2fe";

  // Default style
  } else {
    style.background = "#fff";
  }

  return (
    <div
      onClick={handleClick}

      // On hover → set hover date + animation
      onMouseEnter={(e) => {
        setHoverDate(date);
        handleHover(e, 1.08);
      }}

      // On leave → reset hover
      onMouseLeave={(e) => {
        setHoverDate(null);
        handleHover(e, 1);
      }}

      style={style}

      // Show holiday name on hover tooltip
      title={holiday || ""}
    >
      /* Display day number */
      {day}

      /*  HOLIDAY DOT (small indicator) */
      {holiday && (
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#c01c5d"
          }}
        />
      )}
    </div>
  );
}