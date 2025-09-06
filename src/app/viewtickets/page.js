"use client";
import React, { useState } from 'react';
import "@/app/globals.css";
import { names,  hobbyDescriptions } from "@/app/viewtickets/holder";
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
    const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
);
const clickedTicket = clickedIndex !== null ? filteredTickets[clickedIndex] : null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f5f5',overflow: 'hidden'}}>
            <h1
                className="header-bar"
                style={{
                    color: '#1976d2',
                    marginLeft: '30px',
                    fontSize: '32px',
                    fontWeight: 'bold'
                }}
            >
                O
            </h1>
            <div style={{ display: 'flex', flex: 1 }}>
                <aside style={{
                    height: '100vh',
                    width: '400px',
                    background: '#fff',
                    padding: '24px',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    overflowY: 'auto'
                }}>
                   <h2 style={{ color: '#1976d2', fontWeight: "bold", fontSize: "25px" }}>
    Bought Tickets
</h2>

<input
    type="text"
    placeholder="Search tickets..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
        color: '#000000ff',
        padding: '10px',
        border: '1px solid #5e5e5eff',
        borderRadius: '6px',
        margin: '12px 0 24px 0',
        fontSize: '14px',
        outline: 'none',
    }}
/>

<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '24px' }}>
    {filteredTickets.map((ticket, idx) => {
        const isHovered = hoveredIndex === idx;
        return (
            <div
                key={idx}
                onClick={() => setClickedIndex(idx)}
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
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>{ticket.title}</h3>
                <p style={{ margin: 0, color: '#333' }}>{ticket.description}</p>
            </div>
        );
    })}
</div>

                </aside>
 <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
  <div
    style={{
      background: '#1976d2',
      color: 'white',
      padding: '24px 32px',   // More vertical padding for taller bar
      borderRadius: '8px',
      marginBottom: '16px',
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

  {/* Add more content below as needed */}
</main>

            </div>
        </div>
    );
}
