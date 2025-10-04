"use client";
import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { names, hobbyDescriptions } from "../viewtickets/holder";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";
import { colors } from "../styles/colors";

// Generate tickets data
let tickets = [
  { title: 'Ticket 1', description: 'Description for ticket 1.' },
];

for (let i = 0; i <= 20; i++) {
  tickets[i] = { 
    title: `${names[i]}`, 
    description: `${hobbyDescriptions[i]}`,
    id: i,
    date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: i % 3 === 0 ? 'purchased' : i % 3 === 1 ? 'upcoming' : 'late'
  };
}

export default function MobileTicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const itemsPerPage = 6;
  
  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'purchased':
        return '#e3f2fd';
      case 'upcoming':
        return '#e8f5e8';
      case 'late':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'purchased':
        return '#1976d2';
      case 'upcoming':
        return '#2e7d32';
      case 'late':
        return '#d32f2f';
      default:
        return '#666';
    }
  };

  return (
    <div className="main" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      background: '#f5f5f5',
      overflow: 'hidden'
    }}>
      <DynamicHeader />
      
      <main className="main_content" style={{ 
        flex: 1, 
        padding: '16px', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <MainContentHeader>Your Tickets</MainContentHeader>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Tickets Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '16px',
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '20px'
        }}>
          {currentTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: selectedTicket?.id === ticket.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Ticket Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#f0f0f0', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#666'
                }}>
                  {ticket.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div style={{
                  background: getStatusColor(ticket.status),
                  color: getStatusTextColor(ticket.status),
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {ticket.status}
                </div>
              </div>

              {/* Ticket Content */}
              <div>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  color: '#1976d2', 
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  {ticket.title}
                </h3>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#666', 
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {ticket.description}
                </p>
                <div style={{ 
                  color: '#999', 
                  fontSize: '12px',
                  marginTop: '8px'
                }}>
                  {formatDate(ticket.date)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '12px', 
            marginTop: '20px',
            padding: '16px 0'
          }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: currentPage === 1 ? '#f5f5f5' : 'white',
                color: currentPage === 1 ? '#999' : '#333',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                minHeight: '40px'
              }}
            >
              Previous
            </button>
            
            <span style={{ 
              padding: '8px 12px', 
              fontSize: '14px',
              color: '#666',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: currentPage === totalPages ? '#f5f5f5' : 'white',
                color: currentPage === totalPages ? '#999' : '#333',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                minHeight: '40px'
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
