import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ 
        student_id: '', 
        name: '', 
        email: '', 
        department: '', 
        year: '' 
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const fetchStudents = () => {
        axios.get('http://127.0.0.1:8000/api/students/')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => { 
        fetchStudents(); 
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const dataToSend = {
            ...form,
            year: parseInt(form.year) || 1
        };

        if (editingId) {
            axios.put(`http://127.0.0.1:8000/api/students/${editingId}/`, dataToSend)
                .then(() => {
                    setForm({ student_id: '', name: '', email: '', department: '', year: '' });
                    setEditingId(null);
                    fetchStudents();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to update student.');
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/students/', dataToSend)
                .then(() => {
                    setForm({ student_id: '', name: '', email: '', department: '', year: '' });
                    fetchStudents();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to add student. Check if ID or Email already exists.');
                });
        }
    };

    const handleEdit = (student) => {
        setEditingId(student.id);
        setForm({
            student_id: student.student_id,
            name: student.name,
            email: student.email || '',
            department: student.department,
            year: student.year
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            axios.delete(`http://127.0.0.1:8000/api/students/${id}/`)
                .then(() => {
                    fetchStudents();
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to delete student.');
                });
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* இங்கே வெறும் Students Management என்று மட்டுமே இருக்கும் */}
            <h2>Students Management</h2>
            
            {error && (
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #F87171' }}>
                    {error}
                </div>
            )}

            {/* Registration / Update Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <input 
                    placeholder="Student ID" 
                    value={form.student_id} 
                    onChange={e => setForm({...form, student_id: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '150px' }} 
                />
                <input 
                    placeholder="Name" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '150px' }} 
                />
                <input 
                    type="email"
                    placeholder="Email" 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '180px' }} 
                />
                <input 
                    placeholder="Department" 
                    value={form.department} 
                    onChange={e => setForm({...form, department: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '150px' }} 
                />
                <input 
                    type="number"
                    placeholder="Year (e.g. 1, 2)" 
                    value={form.year} 
                    onChange={e => setForm({...form, year: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '130px' }} 
                />

                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button type="submit" style={{ padding: '10px 20px', background: editingId ? '#2563EB' : '#16A34A', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                        {editingId ? 'Update Student' : 'Register Student'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ student_id: '', name: '', email: '', department: '', year: '' }); }} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Cards Grid Layout */}
            <h3>Registered Students ({students.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
                {students.map((s) => (
                    <div key={s.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                                    ID: {s.student_id}
                                </span>
                                <span style={{ color: '#6b7280', fontSize: '14px' }}>Year: {s.year}</span>
                            </div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1f2937' }}>{s.name}</h4>
                            <p style={{ margin: '4px 0', color: '#4b5563', fontSize: '14px' }}><strong>Email:</strong> {s.email}</p>
                            <p style={{ margin: '4px 0 15px 0', color: '#4b5563', fontSize: '14px' }}><strong>Dept:</strong> {s.department}</p>
                        </div>

                        {/* Card-க்கு உள்ளேயே கீழ் பகுதியில் Edit மற்றும் Delete பட்டன்கள் */}
                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                            <button onClick={() => handleEdit(s)} style={{ flex: '1', padding: '6px', background: '#D97706', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(s.id)} style={{ flex: '1', padding: '6px', background: '#DC2626', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Students;