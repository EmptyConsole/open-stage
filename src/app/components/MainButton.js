import React from 'react';
import { colors } from '../styles/colors';

export default function MainButton({ children, onClick, concertData, router }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (concertData && router) {
      // Import the navigation utility dynamically to avoid circular dependencies
      import('../utils/concertNavigation').then(({ navigateToPurchaseTicket }) => {
        navigateToPurchaseTicket(router, concertData);
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: colors.primary,
        color: colors.white,
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = colors.primaryHover;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = colors.primary;
      }}
    >
      {children}
    </button>
  );
}
