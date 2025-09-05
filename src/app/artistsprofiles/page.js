"use client";
import React, { useState } from 'react';
import "@/app/globals.css";
import Sidebar from "../components/sidebar";

export default function HomePage() {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f5f5', overflow: 'hidden'}}>
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
          justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
          {/* Image placeholder with follow button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: 'auto', width: '100%' }}>
            <div style={{
              width: '100%',
              height: '220px',
              background: '#f0f0f0',
              border: '2px dashed #ccc',
              borderRadius: '0',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                color: '#000',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
              }}>Tooffu</div>
              <button 
                onClick={toggleFollow}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: isFollowing ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
            <div style={{ color: '#000', fontSize: '14px', textAlign: 'center' }}>description...</div>
          </div>
          
          {/* Bottom content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', padding: '20px', marginBottom: '20px' }}>
            <div style={{ color: '#000', fontSize: '14px', textAlign: 'center', marginBottom: '20px', lineHeight: '1.4' }}>
              One small step for you, one giant leap for Tooffu.
            </div>
            <button style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              Help Support!
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
          {/* <div
            style={{
              background: '#1976d2',
              color: 'white',
              padding: '24px 32px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '34px',
              fontWeight: 'bold',
              width: '120%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              height: '72px',
            }}
          >
            {/* Tooffu's Artist Profile */}
          {/* </div> */}
          {/* Add more content below as needed */}
        </main>
      </div>
    </div>
  );
}