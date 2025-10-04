import { colors } from '../styles/colors';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ children }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="desktop-only sidebar"
        style={{
          width: "330px",
          height: "100vh",
          backgroundColor: "var(--sidebar-background)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div style={{ padding: "65px 16px" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              textJustify: "center",
              color: colors.black,
            }}
          >
            {children}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <aside className="mobile-only sidebar">
        <div className="sidebar-content">
          <Link 
            href="/dashboard" 
            className={`mobile-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </Link>
          
          <Link 
            href="/viewtickets" 
            className={`mobile-nav-item ${isActive('/viewtickets') ? 'active' : ''}`}
          >
            <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm1 0v8h10V4H3zm2 1h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/>
            </svg>
            Tickets
          </Link>
          
          <Link 
            href="/localconcertmap" 
            className={`mobile-nav-item ${isActive('/localconcertmap') ? 'active' : ''}`}
          >
            <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Map
          </Link>
          
          <Link 
            href="/artistsprofiles" 
            className={`mobile-nav-item ${isActive('/artistsprofiles') ? 'active' : ''}`}
          >
            <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Artists
          </Link>
          
          <Link 
            href="/aboutus" 
            className={`mobile-nav-item ${isActive('/aboutus') ? 'active' : ''}`}
          >
            <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            About
          </Link>
        </div>
      </aside>
    </>
  );
}
