import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '15px 30px', backgroundColor: '#1e293b', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Smart Internship & Skill Intelligence</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
        <Link to="/students" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Students</Link>
        <Link to="/skills" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Skills</Link>
        <Link to="/internships" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Internships</Link>
        <Link to="/recommendations" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Recommendations</Link>
      </div>
    </nav>
  );
};

export default Navbar;