"use client";
import React from 'react';
import "@/app/globals.css";
import Header from "../components/Header";
import MainContentHeader from "../components/MainContentHeader";

export default function AboutUs() {
    const teamMembers = [
        {
            name: "Everett Yeh",
            description: "Full-stack developer with a passion for creating seamless user experiences. Specializes in React and Node.js development."
        },
        {
            name: "Hanson Fang",
            description: "UI/UX designer focused on creating intuitive and beautiful interfaces. Expert in design systems and user research."
        },
        {
            name: "Shaayer Alam",
            description: "Backend engineer with expertise in scalable architecture and database design. Loves solving complex technical challenges."
        },
        {
            name: "Lucas",
            description: "Our team's technical coach who helped us with the development of the website."
        },
        {
            name: "Johnny",
            description: "Our team's Business Coach who helped us with the design and interview process."
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5', overflow: 'auto'}}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <main className="main-content-background" style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
                    {/* Main Title Section */}
                    <MainContentHeader>About Us</MainContentHeader>
                    <div
                        style={{
                            background: '#fff',
                            padding: '32px',
                            borderRadius: '8px',
                            marginBottom: '32px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h1 style={{ 
                            color: '#1976d2', 
                            fontSize: '36px', 
                            fontWeight: 'bold', 
                            margin: '0 0 16px 0' 
                        }}>
                            Empty Console
                        </h1>
                        <p style={{ 
                            color: '#333', 
                            fontSize: '18px', 
                            lineHeight: '1.6', 
                            margin: 0 
                        }}>
                            We are a passionate team of developers, designers, and music enthusiasts dedicated to creating 
                            the ultimate platform for concert discovery and ticket management. Our mission is to connect 
                            music lovers with their favorite artists through innovative technology and seamless user experiences. 
                            Founded on the belief that live music brings people together, we're building tools that make 
                            discovering and attending concerts easier than ever before.
                        </p>
                    </div>

                    {/* Team Members Section */}
                    <MainContentHeader>Our Team</MainContentHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <div
                                key={index}
                                style={{
                                    background: '#fff',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                }}
                            >
                                {/* Team Member Image Placeholder */}
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
                                        fontSize: '12px',
                                        flexShrink: 0,
                                    }}
                                >
                                    Photo
                                </div>
                                
                                {/* Team Member Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ 
                                        margin: '0 0 8px 0', 
                                        color: '#1976d2', 
                                        fontWeight: 'bold', 
                                        fontSize: '20px' 
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#333', 
                                        fontSize: '16px', 
                                        lineHeight: '1.5' 
                                    }}>
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Team Coaches Section */}
                    <MainContentHeader>Team Coaches</MainContentHeader>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {teamMembers.slice(3, 5).map((member, index) => (
                            <div
                                key={index + 3}
                                style={{
                                    background: '#fff',
                                    padding: '24px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                }}
                            >
                                {/* Team Member Image Placeholder */}
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
                                        fontSize: '12px',
                                        flexShrink: 0,
                                    }}
                                >
                                    Photo
                                </div>
                                
                                {/* Team Member Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ 
                                        margin: '0 0 8px 0', 
                                        color: '#1976d2', 
                                        fontWeight: 'bold', 
                                        fontSize: '20px' 
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#333', 
                                        fontSize: '16px', 
                                        lineHeight: '1.5' 
                                    }}>
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
