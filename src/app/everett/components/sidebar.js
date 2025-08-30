"use client";
import { useState } from "react";

export default function Sidebar() {
  const [musicians, setMusicians] = useState([
    { name: "Everett", instrument: "Drums" },
    { name: "Hanson", instrument: "Guitar" },
    { name: "Shaayer", instrument: "Bass" },
    { name: "Copilot", instrument: "Keyboard" },
    { name: "Mitch", instrument: "Vocals" },
    { name: "Landon", instrument: "Guitar" },
    { name: "Morgan", instrument: "Bass" },
    { name: "Josh", instrument: "Keyboard" },
    { name: "Nate", instrument: "Vocals" },
    { name: "Everett", instrument: "Drums" },
    { name: "Hanson", instrument: "Guitar" },
    { name: "Shaayer", instrument: "Bass" },
  ]);

  const [newMusicianName, setNewMusicianName] = useState("");
  const [newMusicianInstrument, setNewMusicianInstrument] = useState("");

  const addMusician = () => {
    if (newMusicianName.trim() && newMusicianInstrument.trim()) {
      setMusicians([
        ...musicians,
        {
          name: newMusicianName.trim(),
          instrument: newMusicianInstrument.trim(),
        },
      ]);
      setNewMusicianName("");
      setNewMusicianInstrument("");
    }
  };

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "fit-content",
      }}
    >
      <div
        style={{
          margin: "1rem",
          fontSize: "1.2rem",
          padding: "1rem",
          lineHeight: "2.5",
          background: "black",
          color: "white",
          borderRadius: "8px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", marginBottom: "0.5rem" }}>
          OpenStage Musicians
        </p>
        {musicians.map((musician, index) => (
          <p key={index} style={{ margin: 0, fontSize: "1rem" }}>
            {musician.name} - {musician.instrument}
          </p>
        ))}

        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid #333",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", marginBottom: "0.5rem" }}>
            Add New Musician
          </p>
          <input
            type="text"
            placeholder="Musician name"
            value={newMusicianName}
            onChange={(e) => setNewMusicianName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            placeholder="Instrument"
            value={newMusicianInstrument}
            onChange={(e) => setNewMusicianInstrument(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={addMusician}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Add Musician
          </button>
        </div>
      </div>
    </aside>
  );
}
