import React from 'react';
export default function Footer({children}) {
    return <footer style={{
        width: '100%',
        padding: '1rem 0',
        background: '#222',
        color: '#fff',
        textAlign: 'center',
        minHeight: '60px'
    }}>
        © {new Date().getFullYear()} Open Stage. All rights reserved.
        {children}
    </footer>
}