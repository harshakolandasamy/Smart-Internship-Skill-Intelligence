import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints Functions
export const fetchStudents = () => API.get('students/');
export const createStudent = (data) => API.post('students/', data);

export const fetchSkills = () => API.get('skills/');
export const createSkill = (data) => API.post('skills/', data);

export const fetchInternships = () => API.get('internships/');
export const createInternship = (data) => API.post('internships/', data);

export const fetchCertificates = () => API.get('certificates/');
export const createCertificate = (data) => API.post('certificates/', data);

// Corrected URL endpoint format to match Django path 'recommendations/<str:student_id>/'
export const fetchRecommendations = (studentId) => 
  API.get(`recommendations/${studentId}/`);

export default API;