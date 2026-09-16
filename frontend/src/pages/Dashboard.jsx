import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ students: 0, skills: 0, internships: 0 });

    useEffect(() => {
        Promise.all([
            axios.get('http://127.0.0.1:8000/api/students/'),
            axios.get('http://127.0.0.1:8000/api/skills/'),
            axios.get('http://127.0.0.1:8000/api/internships/')
        ])
        .then(([s, sk, i]) => {
            setStats({ students: s.data.length, skills: sk.data.length, internships: i.data.length });
        }).catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: '30px', background: '#F8FAFC', minHeight: '90vh', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '22px', color: '#1E293B', marginBottom: '20px', fontWeight: 'bold' }}>Dashboard Overview</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', flex: 1, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 8px 0' }}>Total Students</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>{stats.students}</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', flex: 1, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 8px 0' }}>Total Skills</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>{stats.skills}</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', flex: 1, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 8px 0' }}>Total Internships</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>{stats.internships}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;