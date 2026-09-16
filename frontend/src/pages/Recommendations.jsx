import React, { useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
    const [studentId, setStudentId] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRecommendations = async (e) => {
        e.preventDefault();
        if (!studentId.trim()) {
            setError('Please enter a valid Student ID.');
            return;
        }

        setLoading(true);
        setError('');
        setStudentData(null);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recommendations/${studentId}/`);
            setStudentData(response.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No student records found for this ID.');
            } else {
                setError('Unable to connect to the backend server. Please verify if Django is running.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#F8FAFC',
            padding: '40px 24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            color: '#334155'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                
                {/* Clean Professional Header */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '32px',
                    marginBottom: '24px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
                }}>
                    <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
                        <h1 style={{ color: '#0F172A', fontSize: '26px', fontWeight: '600', margin: '0 0 8px 0' }}>
                            AI Internship Intelligence Dashboard
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '15px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
                            Enter your Student ID to fetch verified and tailored internship opportunities matched with your core skills.
                        </p>

                        {/* Search Input Form */}
                        <form onSubmit={fetchRecommendations} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="Enter Student ID (e.g., 1)"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                style={{
                                    padding: '10px 16px',
                                    width: '280px',
                                    fontSize: '14px',
                                    borderRadius: '6px',
                                    border: '1px solid #CBD5E1',
                                    outline: 'none',
                                    backgroundColor: '#FFFFFF'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#FFFFFF',
                                    backgroundColor: loading ? '#94A3B8' : '#2563EB',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#991B1B',
                        borderRadius: '6px',
                        fontSize: '14px',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Results Section */}
                {studentData && (
                    <div>
                        {/* Candidate Summary Box */}
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Candidate Details
                                    </span>
                                    <h2 style={{ margin: '4px 0 8px 0', fontSize: '20px', color: '#0F172A', fontWeight: '600' }}>
                                        {studentData.student_name} <span style={{ color: '#64748B', fontWeight: '400', fontSize: '15px' }}>(ID: {studentData.student_id})</span>
                                    </h2>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>
                                        Department: <strong>{studentData.department}</strong> &bull; Year: <strong>{studentData.year}</strong>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '22px', fontWeight: '600', color: '#2563EB' }}>{studentData.recommendations.length}</div>
                                    <div style={{ fontSize: '12px', color: '#64748B' }}>Total Opportunities</div>
                                </div>
                            </div>

                            {/* Registered Skills */}
                            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Skills:</span>
                                {studentData.student_skills.map((skill, index) => (
                                    <span key={index} style={{
                                        backgroundColor: '#F1F5F9',
                                        color: '#334155',
                                        padding: '3px 10px',
                                        borderRadius: '4px',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        border: '1px solid #E2E8F0'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Section Subtitle */}
                        <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '600', margin: 0 }}>
                                Recommended Openings ({studentData.recommendations.length})
                            </h3>
                        </div>

                        {/* Clean Cards Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '16px'
                        }}>
                            {studentData.recommendations.map((rec, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '10px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.01)',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#94A3B8'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                                >
                                    <div>
                                        {/* Top Meta info */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: '500', color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                                                {rec.match_score}
                                            </span>
                                            <span style={{ fontSize: '12px', color: '#64748B' }}>
                                                {rec.duration}
                                            </span>
                                        </div>

                                        {/* Role title */}
                                        <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#0F172A', fontWeight: '600', lineHeight: '1.4' }}>
                                            {rec.role}
                                        </h4>

                                        {/* Company name */}
                                        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#2563EB' }}>
                                            {rec.company_name}
                                        </p>

                                        {/* Location */}
                                        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B' }}>
                                            📍 {rec.location}
                                        </p>

                                        {/* Match skill chip */}
                                        <div style={{ fontSize: '12px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                                            <span>Matched: </span>
                                            {rec.matched_skills && rec.matched_skills.map((sk, i) => (
                                                <strong key={i} style={{ color: '#0F172A', marginLeft: '4px' }}>{sk}</strong>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Apply Button */}
                                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                                        <a 
                                            href={rec.apply_url || "https://www.linkedin.com/jobs/"} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'block',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                                width: '100%',
                                                padding: '8px 0',
                                                backgroundColor: '#0F172A',
                                                color: '#FFFFFF',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                boxSizing: 'border-box'
                                            }}
                                        >
                                            Apply Now &rarr;
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;