"use client";
import React, { useState } from 'react';
import "@/app/globals.css";
import { names,  hobbyDescriptions } from "@/app/viewtickets/holder";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import Footer from "../components/footer";
let tickets = [
    { title: 'Ticket 1', description: 'Description for ticket 1.' },
];


for (let i = 0; i <= 50; i++) {
    tickets[i] = { title: `${names[i]}`, description: `${hobbyDescriptions[i]}` };
}

export default function ViewTickets() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');   
    const [clickedIndex, setClickedIndex] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredType, setHoveredType] = useState(null);
    const [selectedConcert, setSelectedConcert] = useState(null);
    const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
);
const clickedTicket = clickedIndex !== null ? filteredTickets[clickedIndex] : null;

    // Concert data for popup
    const concerts = [
        {
            title: "Summer Festival",
            date: "July 15",
            venue: "Central Park",
            price: "$45",
            time: "7:00 PM",
        },
        {
            title: "Acoustic Night",
            date: "July 22",
            venue: "Blue Note",
            price: "$35",
            time: "8:30 PM",
        },
        {
            title: "Rock Concert",
            date: "Aug 5",
            venue: "Madison Square",
            price: "$75",
            time: "8:00 PM",
        },
        {
            title: "Jazz Session",
            date: "Aug 12",
            venue: "Birdland",
            price: "$40",
            time: "9:00 PM",
        },
        {
            title: "Indie Show",
            date: "Aug 20",
            venue: "Bowery Ballroom",
            price: "$30",
            time: "7:30 PM",
        },
    ];

    const handleItemHover = (item, type) => {
        setHoveredItem(item);
        setHoveredType(type);
    };

    const handleItemLeave = () => {
        setHoveredItem(null);
        setHoveredType(null);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5', overflow: 'auto'}}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar>
                    <div style={{ marginTop: '-40px' }}>
                        <MainContentHeader>Bought Tickets</MainContentHeader>

                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                color: '#000000ff',
                                padding: '12px',
                                border: '1px solid #5e5e5eff',
                                borderRadius: '6px',
                                margin: '0 0 24px 0',
                                fontSize: '14px',
                                outline: 'none',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
                            {filteredTickets.map((ticket, idx) => {
                                const isHovered = hoveredIndex === idx;
                                const concertData = concerts[idx % concerts.length]; // Cycle through concerts
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setClickedIndex(idx);
                                            setSelectedConcert(concertData);
                                        }}
                                        style={{
                                            background: isHovered ? '#dce6f1' : '#ededed',
                                            borderRadius: '8px',
                                            padding: '16px',
                                            boxShadow: isHovered
                                                ? '0 4px 12px rgba(0,0,0,0.1)'
                                                : '0 2px 4px rgba(0,0,0,0.04)',
                                            transition: 'background 0.2s ease, box-shadow 0.2s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={() => {
                                            setHoveredIndex(idx);
                                            handleItemHover(concertData, "concert");
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredIndex(null);
                                            handleItemLeave();
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {/* Image placeholder */}
                                            <div
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    background: '#f8f8f8',
                                                    borderRadius: '8px',
                                                    border: '2px dashed #ccc',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#999',
                                                    fontSize: '10px',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                Image
                                            </div>
                                            
                                            {/* Text content */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h3 style={{ margin: '0 0 4px 0', color: '#1976d2', fontWeight: 'bold', fontSize: '14px', textAlign: 'left' }}>{ticket.title}</h3>
                                                <p style={{ margin: 0, color: '#333', fontSize: '12px', textAlign: 'left', lineHeight: '1.3' }}>{ticket.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Sidebar>
 <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
  <MainContentHeader>Selected Concert</MainContentHeader>
  <div
    style={{
      background: '#1976d2',
      color: 'white',
      padding: '24px 32px',   // More vertical padding for taller bar
      borderRadius: '8px',
      marginBottom: '24px',
      fontSize: '34px',       // Slightly bigger font
      fontWeight: 'bold',
      width: '120%',        
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',  
      height: '72px',      
    }}
  >
    {clickedTicket ? `${clickedTicket.title}'s Epic Concert!!!` : "No ticket selected"}
  </div>

  <MainContentHeader>Concert Details</MainContentHeader>
  <div
    style={{
      background: '#fff',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    <p style={{ color: '#333', fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
      {clickedTicket 
        ? `Welcome to ${clickedTicket.title}'s concert! This is where you'll find all the details about the event, including venue information, set times, and special announcements.`
        : "Select a ticket from the sidebar to view concert details and information."
      }
    </p>
  </div>

  {/* Add more content below as needed */}
  {/* <Footer /> */}
</main>

            </div>

            {/* Detailed View Popup */}
            {(hoveredItem || selectedConcert) && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: "330px", // sidebar width
                        right: 0,
                        background: "#fff",
                        borderTop: "3px solid #1976d2",
                        padding: "24px",
                        boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        maxHeight: "40vh",
                        overflowY: "auto",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        {/* Close button for selected concert */}
                        {selectedConcert && (
                            <button
                                onClick={() => setSelectedConcert(null)}
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
                                    background: "#ff4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                ×
                            </button>
                        )}
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                background: "#ededed",
                                borderRadius: "8px",
                                border: "2px dashed #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#999",
                                fontSize: "12px",
                            }}
                        >
                            Concert Image
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3
                                style={{
                                    color: "#1976d2",
                                    fontSize: "28px",
                                    margin: "0 0 8px 0",
                                    fontWeight: "bold",
                                }}
                            >
                                {(selectedConcert || hoveredItem).title}
                            </h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "16px",
                                    marginBottom: "16px",
                                    fontSize: "16px",
                                    color: "#111", // darker, stronger text
                                }}
                            >
                                <div>
                                    <span style={{ fontWeight: 600, color: "#1976d2" }}>
                                        Date:
                                    </span>{" "}
                                    {(selectedConcert || hoveredItem).date}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600, color: "#1976d2" }}>
                                        Time:
                                    </span>{" "}
                                    {(selectedConcert || hoveredItem).time}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600, color: "#1976d2" }}>
                                        Venue:
                                    </span>{" "}
                                    {(selectedConcert || hoveredItem).venue}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600, color: "#1976d2" }}>
                                        Price:
                                    </span>{" "}
                                    {(selectedConcert || hoveredItem).price}
                                </div>
                            </div>
                            <p
                                style={{
                                    margin: "0 0 16px 0",
                                    color: "#333",
                                    lineHeight: "1.5",
                                }}
                            >
                                Join {clickedTicket ? clickedTicket.title : "the artist"} for an unforgettable{" "}
                                {(selectedConcert || hoveredItem).title.toLowerCase()} experience. This special event
                                promises to deliver an amazing night of music and entertainment.
                            </p>
                            <MainButton>
                                Buy Tickets
                            </MainButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
