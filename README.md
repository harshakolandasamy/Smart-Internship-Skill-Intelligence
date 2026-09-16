# 🚀 Smart Internship Skill Intelligence
## Full-Stack Web Application

An intelligent full-stack web application built to manage student profiles, handle multiple skills, and provide dynamic internship recommendations.

---

# 🛠️ Technology Stack

Frontend:
React.js, Vite / Modern Card-Based UI

Backend:
Python, Django, Django REST Framework (DRF)

Database:
SQLite Database

The database manages:
- Students
- Skills
- Internships

---

# 📂 Project Directory Structure

Smart-Internship-Skill-Intelligence/
│
├── backend/
│   ├── api/
│   ├── config/
│   ├── manage.py
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md

Backend:
Django REST Framework Backend

API:
Models, Serializers, Views, and URL Routing

Frontend:
React Frontend Application

Components:
Students, Skills, and Internships Dashboard

---

# ⚡ Core Features

## 1. Modern Card-Based UI

The frontend provides a clean and interactive card-based dashboard.

Students can:
- Manage student details
- Manage multiple skills
- View internship opportunities
- View matched opportunities

---

## 2. RESTful CRUD Operations

The application provides complete CRUD operations for:

Students:
- Create
- Read
- Update
- Delete

Skills:
- Create
- Read
- Update
- Delete

Internships:
- Create
- Read
- Update
- Delete

---

## 3. Dynamic Multi-Skill Recommendation Engine

API Endpoint:

/api/recommend-internships/<student_id>/

The recommendation engine:

- Automatically extracts student skills.
- Normalizes the entered skills.
- Handles comma-separated skills.
- Supports skills such as Python, React, C++, and SQL.
- Matches student capabilities with suitable internships.
- Uses database-verified internship opportunities.
- Matches opportunities from top official MNC career portals.

Example MNCs:

- Zoho
- TCS
- Google
- Microsoft
- Freshworks
- etc.

---

# 🚀 How to Run the Project Locally

The Backend and Frontend should be started in separate terminal windows.

---

## STEP 1 — Run Django Backend Server

Open a terminal.

Navigate to the backend folder:

cd backend

Activate the virtual environment.

Windows Command Prompt:

venv\Scripts\activate

Windows PowerShell:

venv\Scripts\Activate.ps1

Run the Django development server:

python manage.py runserver

Backend URL:

http://127.0.0.1:8000/

---

## STEP 2 — Run React Frontend Application

Open a new / second terminal.

Navigate to the frontend folder:

cd frontend

Install Node dependencies.

Run this command the first time only:

npm install

Start the React development server:

npm run dev

Frontend URL:

Open the local URL provided in the terminal.

Example:

http://localhost:5173/

---

# 🔌 API Endpoints Reference

## Student API

Endpoint:

/api/students/

Methods:

GET, POST, PUT, DELETE

Purpose:

Student profile management.

---

## Skill API

Endpoint:

/api/skills/

Methods:

GET, POST, PUT, DELETE

Purpose:

Student skill management.

---

## Internship API

Endpoint:

/api/internships/

Methods:

GET, POST, PUT, DELETE

Purpose:

Internship listings management.

---

## Internship Recommendation API

Endpoint:

/api/recommend-internships/<id>

Method:

GET

Purpose:

Provides tailored multi-skill internship recommendations.

---

# 🔮 Future Enhancements

## 1. Machine Learning Integration

Implement advanced NLP algorithms such as:

- TF-IDF
- Cosine Similarity

These algorithms can be used to calculate precise job description matches.

---

## 2. Automated Resume Parsing

Enable students to upload:

- PDF resumes
- Word resumes

The system can automatically extract skills and populate the student profile.

---

## 3. Advanced Authentication & Roles

Integrate JWT (JSON Web Token) based authentication.

Possible user roles:

- Students
- Recruiters
- Administrators