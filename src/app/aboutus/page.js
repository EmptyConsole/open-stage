"use client";
import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import DynamicHeader from "../components/DynamicHeader";
import MainContentHeader from "../components/MainContentHeader";

export default function AboutUs() {
    const [isMobile, setIsMobile] = useState(false);

    // Handle window resize and mobile detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const teamMembers = [
        {
            name: "Everett Yeh",
            description: "Everett began coding in 6th grade and made so much progress within his first year. The progress from then on was exponential. He also learned how to produce music in 7th grade and has become adept at it as well. Due to his love of games and music, he incorporated coding and game design into many of his school assignments. Eventually, meeting Empty Console. He began working on projects with the group, coding, making art, and creating expressive soundtracks to share with the world."
        },
        {
            name: "Hanson Fang",
            description: "Hanson, also known as HF_ang, began coding as soon as he saw his sister doing it. From then on, he began overachieving in any coding assignment, taking extracurriculars, and participating in short game jams to hone his skills. Over time, he met the other members of Empty Console and co-founded the group. Through many late-night calls with Shaayer, game development videos, and projects, Hanson became the main coder in Empty Console."
        },
        {
            name: "Shaayer Alam",
            description: "Shaayer, also known as Shyguy, fell in love with video games at a young age and soon, also started making his own. While honing his programming skills, Shaayer also learned more about robotics, AI, team management, and the business side of the products he created. In 7th grade, he started working with Hanson and Everett to co-found Empty Console. As Empty Console got better, Shaayer’s role got more distinct, now leading in decisions on the business side while coding only certain parts of the products. When not meeting with users or coding late into the night, Shaayer can be found sailing, playing tennis or golf, or playing keyboard in a school rock band."
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f5f5', overflow: 'auto', paddingTop: isMobile ? '60px' : '72px'}}>
            <DynamicHeader />
            <div style={{ display: 'flex', flex: 1 }}>
                <main className="main-content-background" style={{ 
                    flex: 1, 
                    padding: isMobile ? '16px' : '32px', 
                    display: 'flex', 
                    flexDirection: 'column' 
                }}>
                    {/* Main Title Section */}
                    <MainContentHeader>About Us</MainContentHeader>
                    <div
                        style={{
                            background: '#fff',
                            padding: isMobile ? '20px' : '32px',
                            borderRadius: isMobile ? '12px' : '8px',
                            marginBottom: isMobile ? '24px' : '32px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h1 style={{ 
                            color: '#1976d2', 
                            fontSize: isMobile ? '28px' : '36px', 
                            fontWeight: 'bold', 
                            margin: '0 0 16px 0' 
                        }}>
                            Empty Console
                        </h1>
                        <p style={{ 
                            color: '#333', 
                            fontSize: isMobile ? '16px' : '18px', 
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px', marginBottom: isMobile ? '24px' : '32px' }}>
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <div
                                key={index}
                                style={{
                                    background: '#fff',
                                    padding: isMobile ? '16px' : '24px',
                                    borderRadius: isMobile ? '12px' : '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobile ? '16px' : '20px',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            >
                                {/* Team Member Image Placeholder */}
                                <div
                                    style={{
                                        width: isMobile ? '80px' : '100px',
                                        height: isMobile ? '80px' : '100px',
                                        background: '#f8f8f8',
                                        borderRadius: isMobile ? '12px' : '8px',
                                        border: '2px dashed #ccc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999',
                                        fontSize: isMobile ? '10px' : '12px',
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
                                        fontSize: isMobile ? '18px' : '20px' 
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#333', 
                                        fontSize: isMobile ? '14px' : '16px', 
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px' }}>
                        {teamMembers.slice(3, 5).map((member, index) => (
                            <div
                                key={index + 3}
                                style={{
                                    background: '#fff',
                                    padding: isMobile ? '16px' : '24px',
                                    borderRadius: isMobile ? '12px' : '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobile ? '16px' : '20px',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            >
                                {/* Team Member Image Placeholder */}
                                <div
                                    style={{
                                        width: isMobile ? '80px' : '100px',
                                        height: isMobile ? '80px' : '100px',
                                        background: '#f8f8f8',
                                        borderRadius: isMobile ? '12px' : '8px',
                                        border: '2px dashed #ccc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999',
                                        fontSize: isMobile ? '10px' : '12px',
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
                                        fontSize: isMobile ? '18px' : '20px' 
                                    }}>
                                        {member.name}
                                    </h3>
                                    <p style={{ 
                                        margin: 0, 
                                        color: '#333', 
                                        fontSize: isMobile ? '14px' : '16px', 
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
