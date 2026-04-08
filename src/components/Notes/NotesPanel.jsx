import { useState, useEffect } from "react";

export default function NotesPanel({ startDate, endDate }) {
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState({});

  //  UNIQUE KEY (date OR range)
  const getKey = () => {
    if (startDate && endDate) {
      return `${startDate.toDateString()} → ${endDate.toDateString()}`;
    }
    if (startDate) {
      return startDate.toDateString();
    }
    return null;
  };

  const key = getKey();

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("calendar_notes");
    if (stored) {
      setAllNotes(JSON.parse(stored));
    }
  }, []);

  // Load note when date changes
  useEffect(() => {
    if (key && allNotes[key]) {
      setNote(allNotes[key]);
    } else {
      setNote("");
    }
  }, [key, allNotes]);

  // Save note
  const saveNote = () => {
    if (!key || !note.trim()) return;

    const updated = {
      ...allNotes,
      [key]: note
    };

    setAllNotes(updated);
    localStorage.setItem("calendar_notes", JSON.stringify(updated));
    setNote("");
  };

  // Delete single
  const deleteNote = (dateKey) => {
    const updated = { ...allNotes };
    delete updated[dateKey];

    setAllNotes(updated);
    localStorage.setItem("calendar_notes", JSON.stringify(updated));
  };

  // Delete all
  const deleteAllNotes = () => {
    setAllNotes({});
    localStorage.removeItem("calendar_notes");
  };

  return (
    <div style={container}>
      <h3>Notes</h3>

      {startDate ? (
        <>
          <p style={dateText}>
            {endDate
              ? `${startDate.toDateString()} → ${endDate.toDateString()}`
              : startDate.toDateString()}
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write something..."
            style={textareaStyle}
          />

          <div style={buttonRow}>
            <button onClick={saveNote} style={saveBtn}>
              Save
            </button>

            {Object.keys(allNotes).length > 0 && (
              <button onClick={deleteAllNotes} style={deleteAllBtn}>
                Delete All
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Select a date or range</p>
      )}

      /* SAVED NOTES */
      <div style={{ marginTop: 20 }}>
        <h4>Saved Notes</h4>

        {Object.keys(allNotes).length === 0 && (
          <p style={emptyText}>No notes yet</p>
        )}

        {Object.entries(allNotes).map(([date, text]) => (
          <div key={date} style={noteCard}>
            <div style={noteDate}>{date}</div>
            <div>{text}</div>

            <button
              onClick={() => deleteNote(date)}
              style={deleteBtn}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  width: "100%",
  padding: 15,
  background: "#f9fafb",
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const dateText = {
  fontSize: 12,
  color: "#666"
};

const textareaStyle = {
  width: "100%",
  height: 100,
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
  boxSizing: "border-box", 
  resize: "none"
};

const buttonRow = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap"
};

const saveBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "none",
  background: "#4f8cff",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const deleteAllBtn = {
  padding: "6px 12px",
  background: "#c81368",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer"
};

const emptyText = {
  fontSize: 12,
  color: "#888"
};

const noteCard = {
  background: "#f3f4f6",
  padding: 10,
  borderRadius: 8,
  marginBottom: 8,
  position: "relative"
};

const noteDate = {
  fontSize: 12,
  color: "#555"
};

const deleteBtn = {
  position: "absolute",
  top: 5,
  right: 5,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#c90f66",
  fontSize: 16
};