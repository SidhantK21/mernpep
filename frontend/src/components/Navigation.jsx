import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/create" style={linkStyle}>Create Hospital</Link>
        </nav>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    padding: '8px 15px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0'
};

export default Navigation;