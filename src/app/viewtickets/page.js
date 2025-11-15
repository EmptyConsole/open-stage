"use client";
import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { names,  hobbyDescriptions } from "./holder";
import Sidebar from "../components/sidebar";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import Link from "next/link";
// import Footer from "../components/footer";
let tickets = [
    { title: 'Ticket 1', description: 'Description for ticket 1.' },
];


for (let i = 0; i <= 50; i++) {
    tickets[i] = { title: `${names[i]}`, description: `${hobbyDescriptions[i]}` };
}

export default function ViewTickets() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');   
    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedConcert, setSelectedConcert] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
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
            price: "$6",
            time: "7:00 PM",
        },
        {
            title: "Acoustic Night",
            date: "July 22",
            venue: "Blue Note",
            price: "$7",
            time: "8:30 PM",
        },
        {
            title: "Rock Concert",
            date: "Aug 5",
            venue: "Madison Square",
            price: "$8",
            time: "8:00 PM",
        },
        {
            title: "Jazz Session",
            date: "Aug 12",
            venue: "Birdland",
            price: "$5",
            time: "9:00 PM",
        },
        {
            title: "Indie Show",
            date: "Aug 20",
            venue: "Bowery Ballroom",
            price: "$6",
            time: "7:30 PM",
        },
    ];

    const TicketsListSection = ({ isMobileLayout }) => (
        <div>
            <MainContentHeader>Bought Tickets</MainContentHeader>

            <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    color: '#1a1a1a',
                    padding: isMobileLayout ? '12px' : '8px',
                    border: '1px solid #666666',
                    borderRadius: '6px',
                    margin: '0 0 24px 0',
                    fontSize: isMobileLayout ? '16px' : '14px',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobileLayout ? '12px' : '16px', paddingBottom: '24px' }}>
                {filteredTickets.map((ticket, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const concertData = concerts[idx % concerts.length];
                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                setClickedIndex(idx);
                                setSelectedConcert(concertData);
                            }}
                            style={{
                                background: isHovered ? '#dce6f1' : '#ededed',
                                borderRadius: isMobileLayout ? '12px' : '8px',
                                padding: isMobileLayout ? '12px' : '16px',
                                boxShadow: isHovered
                                    ? '0 4px 12px rgba(0,0,0,0.1)'
                                    : '0 2px 4px rgba(0,0,0,0.04)',
                                transition: 'background 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => {
                                setHoveredIndex(idx);
                            }}
                            onMouseLeave={() => {
                                setHoveredIndex(null);
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobileLayout ? '8px' : '12px' }}>
                                <div
                                    style={{
                                        width: isMobileLayout ? '60px' : '80px',
                                        height: isMobileLayout ? '60px' : '80px',
                                        background: '#f8f8f8',
                                        borderRadius: '8px',
                                        border: '2px dashed #ccc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999',
                                        fontSize: isMobileLayout ? '8px' : '10px',
                                        flexShrink: 0,
                                    }}
                                >
                                    Image
                                </div>
                                
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ 
                                        margin: '0 0 4px 0', 
                                        color: '#1976d2', 
                                        fontWeight: 'bold', 
                                        fontSize: isMobileLayout ? '12px' : '14px', 
                                        textAlign: 'left' 
                                    }}>
                                        {ticket.title}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#333', 
                                        fontSize: isMobileLayout ? '10px' : '12px', 
                                        textAlign: 'left', 
                                        lineHeight: '1.3' 
                                    }}>
                                        {ticket.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5', overflow: 'hidden', paddingTop: isMobile ? '60px' : '72px'}}>
            <DynamicHeader />
            {isMobile ? (
                <main className="main-content-background" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <MainContentHeader>Selected Concert</MainContentHeader>
                    <div
                        style={{
                            background: '#1976d2',
                            color: 'white',
                            padding: '20px 24px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            width: '100%',
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            height: 'auto',
                            minHeight: '60px',
                        }}
                    >
                        {clickedTicket ? `${clickedTicket.title}'s Epic Concert!!!` : "No ticket selected"}
                    </div>

                    <MainContentHeader>Concert Details</MainContentHeader>
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                            {clickedTicket 
                                ? `Welcome to ${clickedTicket.title}'s concert! This is where you'll find all the details about the event, including venue information, set times, and special announcements.`
                                : "Select a ticket from the sidebar to view concert details and information."
                            }
                        </p>
                    </div>

                    <MainContentHeader>Artist Overview</MainContentHeader>
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            minHeight: '120px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                width: '100px',
                                height: '100px',
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
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#1976d2', fontWeight: 'bold', fontSize: '18px' }}>
                                {clickedTicket ? (
                                    <Link href="/artistsprofiles" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                                        {clickedTicket.title}
                                    </Link>
                                ) : 'Select an Artist'}
                            </h3>
                            <p style={{ margin: 0, color: '#333', fontSize: '14px', lineHeight: '1.5' }}>
                                {clickedTicket ? clickedTicket.description : 'Choose a ticket on the left to view the artist\'s description and details.'}
                            </p>
                        </div>
                    </div>
                    
                    <TicketsListSection isMobileLayout={true} />
                </main>
            ) : (
                <div style={{ display: 'flex', flex: 1 }}>
                    <Sidebar>
                        <TicketsListSection isMobileLayout={false} />
                    </Sidebar>
                    <main className="main-content-background" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <MainContentHeader>Selected Concert</MainContentHeader>
                        <div
                            style={{
                                background: '#1976d2',
                                color: 'white',
                                padding: '24px 32px',
                                borderRadius: '8px',
                                marginBottom: '24px',
                                fontSize: '34px',
                                fontWeight: 'bold',
                                width: '100%',        
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

                        <MainContentHeader>Artist Overview</MainContentHeader>
                        <div
                            style={{
                                background: '#fff',
                                padding: '24px 28px',
                                borderRadius: '8px',
                                marginBottom: '24px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                minHeight: '140px',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    background: '#f8f8f8',
                                    borderRadius: '8px',
                                    border: '2px dashed #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: '12px',
                                    flexShrink: 0,
                                }}
                            >
                                Image
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h3 style={{ margin: '0 0 8px 0', color: '#1976d2', fontWeight: 'bold', fontSize: '22px' }}>
                                    {clickedTicket ? (
                                        <Link href="/artistsprofiles" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                                            {clickedTicket.title}
                                        </Link>
                                    ) : 'Select an Artist'}
                                </h3>
                                <p style={{ margin: 0, color: '#333', fontSize: '16px', lineHeight: '1.5' }}>
                                    {clickedTicket ? clickedTicket.description : 'Choose a ticket on the left to view the artist\'s description and details.'}
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}
