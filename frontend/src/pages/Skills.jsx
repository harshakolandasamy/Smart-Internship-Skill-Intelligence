import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ 
        student: '', 
        skill_name: '', 
        skill_level: 'Beginner' 
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const fetchSkills = () => {
        axios.get('http://127.0.0.1:8000/api/skills/')
            .then(res => setSkills(res.data))
            .catch(err => console.error(err));
    };

    const fetchStudents = () => {
        axios.get('http://127.0.0.1:8000/api/students/')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => { 
        fetchSkills(); 
        fetchStudents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!form.student || !form.skill_name) {
            setError('Please select a student and enter a skill name.');
            return;
        }

        if (editingId) {
            axios.put(`http://127.0.0.1:8000/api/skills/${editingId}/`, form)
                .then(() => {
                    setForm({ student: '', skill_name: '', skill_level: 'Beginner' });
                    setEditingId(null);
                    fetchSkills();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to update skill.');
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/skills/', form)
                .then(() => {
                    setForm({ student: '', skill_name: '', skill_level: 'Beginner' });
                    fetchSkills();
                })
                .catch(err => {
                    console.error(err.response?.data);
                    setError('Failed to add skill.');
                });
        }
    };

    const handleEdit = (sk) => {
        setEditingId(sk.id);
        setForm({
            student: sk.student,
            skill_name: sk.skill_name,
            skill_level: sk.skill_level
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            axios.delete(`http://127.0.0.1:8000/api/skills/${id}/`)
                .then(() => fetchSkills())
                .catch(err => {
                    console.error(err);
                    setError('Failed to delete skill.');
                });
        }
    };

    const getStudentName = (studentId) => {
        const student = students.find(s => s.id === studentId);
        return student ? `${student.name} (ID: ${student.student_id})` : `ID: ${studentId}`;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Student Skills Management</h2>
            <p style={{ color: '#6b7280' }}>Map technical proficiencies and core skills to registered students.</p>

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
                    placeholder="Skill Name (e.g. Python)" 
                    value={form.skill_name} 
                    onChange={e => setForm({...form, skill_name: e.target.value})} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '180px' }} 
                />

                <select 
                    value={form.skill_level} 
                    onChange={e => setForm({...form, skill_level: e.target.value})} 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button type="submit" style={{ padding: '10px 20px', background: editingId ? '#2563EB' : '#16A34A', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
                        {editingId ? 'Update Skill' : 'Add Skill'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ student: '', skill_name: '', skill_level: 'Beginner' }); }} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h3>Recorded Skills ({skills.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
                {skills.map((sk) => (
                    <div key={sk.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                                    Level: {sk.skill_level}
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1f2937' }}>{sk.skill_name}</h4>
                            <p style={{ margin: '4px 0 15px 0', color: '#4b5563', fontSize: '14px' }}><strong>Student:</strong> {getStudentName(sk.student)}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                            <button onClick={() => handleEdit(sk)} style={{ flex: '1', padding: '6px', background: '#D97706', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(sk.id)} style={{ flex: '1', padding: '6px', background: '#DC2626', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;