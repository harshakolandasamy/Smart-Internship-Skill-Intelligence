import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Skills from './pages/Skills';
import Internships from './pages/Internships';
import Recommendations from './pages/Recommendations';

const App = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif' }}>
            
            {/* Navigation Bar without Blue Highlight */}
            <nav style={{ 
                background: '#FFFFFF', 
                padding: '16px 40px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid #E2E8F0',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                {/* Brand Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🎯</span>
                    <span style={{ color: '#0F172A', fontSize: '20px', fontWeight: '800' }}>
                        CareerHub
                    </span>
                </div>
                
                {/* Simple Navigation Links without Active Blue Background */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'students', label: 'Students' },
                        { id: 'skills', label: 'Skills' },
                        { id: 'internships', label: 'Internships' },
                        { id: 'recommendations', label: 'Recommendations' }
                    ].map(tab => {
                        const isActive = currentTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: isActive ? '#0F172A' : '#64748B',
                                    fontWeight: isActive ? '700' : '500',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    borderBottom: isActive ? '2px solid #0F172A' : '2px solid transparent'
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content Area */}
            <main>
                {currentTab === 'dashboard' && <Dashboard />}
                {currentTab === 'students' && <Students />}
                {currentTab === 'skills' && <Skills />}
                {currentTab === 'internships' && <Internships />}
                {currentTab === 'recommendations' && <Recommendations />}
            </main>

        </div>
    );
};

export default App;