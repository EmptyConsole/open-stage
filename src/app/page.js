"use client";
import styles from "./page.module.css";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import Footer from "./components/footer";
import SidebarArtistSquare from "./components/SidebarArtistSquare";
export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar>
          <div>
            <h2 style={{ color: '#1976d2', fontWeight: "bold", fontSize: "25px", margin: "-30px 0 16px 8px", textAlign: "left" }}>
              Followed Artists
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
              {[
                { name: "Luna Moon", description: "Indie rock band known for dreamy melodies and atmospheric soundscapes" },
                { name: "Echo Valley", description: "Alternative rock group with haunting vocals and experimental instrumentation" },
                { name: "Midnight Sun", description: "Electronic music producer creating ambient and downtempo tracks" },
                { name: "River Stone", description: "Folk singer-songwriter with acoustic guitar and heartfelt storytelling" },
                { name: "Urban Beat", description: "Hip hop artist blending street poetry with modern production" },
                { name: "Crystal Clear", description: "Pop sensation with catchy hooks and vibrant energy" },
                { name: "Deep Forest", description: "Ambient music creator specializing in nature-inspired soundscapes" },
                { name: "City Lights", description: "Jazz ensemble bringing smooth melodies and improvisational flair" },
              ].map((artist, index) => (
                <SidebarArtistSquare
                  key={index}
                  artistName={artist.name}
                  description={artist.description}
                  onClick={() => console.log(`Clicked on ${artist.name}`)}
                />
              ))}
            </div>
          </div>
        </Sidebar>
        <Footer>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#ccc' }}>
              Built with Next.js and React. 
            </div>
          </Footer>
        <main
          style={{
            flex: 1,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}>
            <h1>hi</h1>
          <div className="main-content">Main content goes here</div>
          
        </main>
        
      </div>
      
    </div>
    
  );
}
