# 📚 Library Management System (MERN Stack)

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://library-management-app-karan.vercel.app/)

A complete Library Management System built with MongoDB, Express.js, React.js, and Node.js. Features role-based access control with three user types (Admin, Librarian, Student), book management with Cloudinary image uploads, issue/return tracking, and automated fine calculations.

## ✨ Live Demo

Access the deployed application: [Live Demo](https://library-management-app-karan.vercel.app/)

**Test Credentials:**
- Admin: admin@example.com / admin123
- Librarian: librarian@example.com / lib123
- Student: student@example.com / student123

## ✨ Key Features

### 👨‍🎓 Student Features
- ✅ User registration & login with JWT authentication
- 🔍 Browse and search available books with images
- 📥 Request book issuance
- 📤 Submit return requests
- ⏳ View due dates and pending fines
- 📊 Personal dashboard with borrowing history

### 📚 Librarian Features
- ✔️ Approve/reject book issue requests
- ✔️ Manage return requests
- ➕ Add/Edit/Remove books with image uploads (Cloudinary)
- 👀 View all issued books
- 📈 Generate circulation reports

### 👨‍💼 Admin Features
- 👥 Manage all user accounts
- 🛡️ Assign librarian privileges
- 📊 System analytics dashboard
- 📜 Activity logs monitoring

🚀 Tech Stack
Frontend: React.js, React Bootstrap, Material-UI
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Email Service: Nodemailer for OTP-based password reset functionality

## 🛠️ Technology Stack

**Frontend**
- React.js (Functional Components + Hooks)
- React Router v6
- Bootstrap 5 (Responsive Design)
- React-Bootstrap components
- Axios for API calls
- Cloudinary for image uploads
- React Icons
- React Toastify for notifications

**Backend**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt.js for password hashing
- Cloudinary SDK for image storage
- Multer for file handling
- Nodemailer for email notifications
- CORS for cross-origin requests

**Testing & Development**
- Thunder Client (VS Code extension) for API testing
- Hopscotch for API documentation
- Git for version control

## 🚀 Deployment

**Backend** deployed on [Render](https://render.com):
- Environment: Node.js
- Runtime: Node 18+
- Health Check Path: `/api/v1/health`
- Live URL: `https://your-backend-api.onrender.com`

**Frontend** deployed on [Vercel](https://vercel.com):
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build`
- Live URL: `https://your-vercel-app-url.vercel.app`

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- Cloudinary account
- npm or yarn

