import React from 'react';

export default function MainButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#1565c0";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#1976d2";
      }}
    >
      {children}
    </button>
  );
}
