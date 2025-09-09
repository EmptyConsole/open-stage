import React from 'react';
export default function Footer({children}) {
    return <footer style={{
        width: '100%',
        padding: '1rem',
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        position: 'fixed',
        bottom:0,
        zIndex: 0,
        // marginBottom: '0rem'
    }}>
        © {new Date().getFullYear()} Open Stage. All rights reserved.
        {children}
    </footer>
}