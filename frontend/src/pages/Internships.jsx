import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ 
        student: '', 
        company_name: '', 
        role: '', 
        duration: '', 
        status: 'Applied', 
        start_date: '' 
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const fetchInternships = () => {
        axios.get('http://127.0.0.1:8000/api/internships/')
            .then(res => setInternships(res.data))
            .catch(err => console.error(err));
    };

    const fetchStudents = () => {
        axios.get('http://127.0.0.1:8000/api/students/')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => { 
        fetchInternships(); 
        fetchStudents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (editingId) {
            axios.put(`http://127.0.0.1:8000/api/internships/${editingId}/`, form)
                .then(() => {
                    setForm({ student: '', company_name: '', role: '', duration: '', status: 'Applied', start_date: '' });
                    setEditingId(null);
                    fetchInternships();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to update internship.');
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/internships/', form)
                .then(() => {
                    setForm({ student: '', company_name: '', role: '', duration: '', status: 'Applied', start_date: '' });
                    fetchInternships();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to record internship.');
                });
        }
    };

    const handleEdit = (i) => {
        setEditingId(i.id);
        setForm({
            student: i.student,
            company_name: i.company_name,
            role: i.role,
            duration: i.duration,
            status: i.status,
            start_date: i.start_date
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this internship record?')) {
            axios.delete(`http://127.0.0.1:8000/api/internships/${id}/`)
                .then(() => fetchInternships())
                .catch(err => {
                    console.error(err);
                    setError('Failed to delete internship.');
                });
        }
    };

    const getStudentName = (studentId) => {
        const student = students.find(s => s.id === studentId);
        return student ? `${student.name} (ID: ${student.student_id})` : `ID: ${studentId}`;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Internship Tracker</h2>
            <p style={{ color: '#6b7280' }}>Monitor applied or ongoing internship records for students.</p>

            {error && (
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #F87171' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <select 
                    value={form.student} 
                    onChange={e => setForm({...form, student: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '200px' }}
                >
                    <option value="">Select Student</option>
                    {students.map((s, idx) => (
                        <option key={idx} value={s.id}>
                            {s.name} (ID: {s.student_id})
                        </option>
                    ))}
                </select>

                <input 
                    placeholder="Role / Title (e.g. Developer)" 
                    value={form.role} 
                    onChange={e => setForm({...form, role: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '180px' }} 
                />

                <input 
                    placeholder="Company Name" 
                    value={form.company_name} 
                    onChange={e => setForm({...form, company_name: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '180px' }} 
                />

                <input 
                    placeholder="Duration (e.g. 3 Months)" 
                    value={form.duration} 
                    onChange={e => setForm({...form, duration: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '150px' }} 
                />

                <input 
                    type="date" 
                    value={form.start_date} 
                    onChange={e => setForm({...form, start_date: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }} 
                />

                <select 
                    value={form.status} 
                    onChange={e => setForm({...form, status: e.target.value})} 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '130px' }}
                >
                    <option value="Applied">Applied</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                </select>

                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button type="submit" style={{ padding: '10px 20px', background: editingId ? '#2563EB' : '#16A34A', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                        {editingId ? 'Update Record' : 'Save Internship Record'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ student: '', company_name: '', role: '', duration: '', status: 'Applied', start_date: '' }); }} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h3>Internship Records ({internships.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
                {internships.map((i) => (
                    <div key={i.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                                    {i.status}
                                </span>
                                <span style={{ color: '#6b7280', fontSize: '13px' }}>{i.start_date}</span>
                            </div>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#1f2937' }}>{i.role}</h4>
                            <p style={{ margin: '0 0 8px 0', color: '#0284c7', fontWeight: 'bold', fontSize: '15px' }}>{i.company_name}</p>
                            <p style={{ margin: '4px 0', color: '#4b5563', fontSize: '14px' }}><strong>Duration:</strong> {i.duration}</p>
                            <p style={{ margin: '4px 0 15px 0', color: '#4b5563', fontSize: '14px' }}><strong>Student:</strong> {getStudentName(i.student)}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                            <button onClick={() => handleEdit(i)} style={{ flex: '1', padding: '6px', background: '#D97706', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(i.id)} style={{ flex: '1', padding: '6px', background: '#DC2626', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Internships;