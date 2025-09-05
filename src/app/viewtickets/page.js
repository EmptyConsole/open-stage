"use client";
import React, { useState } from 'react';
import "@/app/globals.css";

let tickets = [
    { title: 'Ticket 1', description: 'Description for ticket 1.' },
];
for (let i = 1; i < 20; i++) {
    tickets[i] = { title: `Ticket ${i}`, description: `Description for ticket ${i}.` };
}

export default function ViewTickets() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f5f5' }}>
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
                    <h2 style={{ marginBottom: '24px', color: '#1976d2', fontWeight: "bold", fontSize: "25px" }}>Bought Tickets</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {tickets.map((ticket, idx) => {
                            const isHovered = hoveredIndex === idx;

                            return (
                                <div
                                    key={idx}
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
                <main style={{ flex: 1, padding: '32px' }}>
                </main>
            </div>
        </div>
    );
}
