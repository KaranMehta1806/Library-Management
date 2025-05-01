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
- Postman (alternative)
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

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
Backend Setup

bash
cd backend
npm install
Create .env file:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your@email.com
SMTP_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:3000
Frontend Setup

bash
cd ../frontend
npm install
Create .env file:

env
REACT_APP_API_URL=https://your-backend-api.onrender.com/api/v1
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
Run the Application

Start backend:

bash
cd ../backend
npm start
Start frontend:

bash
cd ../frontend
npm start
API Documentation
API endpoints tested with Thunder Client and documented with Hopscotch:

View API Docs

Key Endpoints:

POST /api/v1/auth/register - User registration

POST /api/v1/auth/login - User login

GET /api/v1/books - Get all books

POST /api/v1/books - Add new book (with image upload)

POST /api/v1/transactions/issue - Issue book request

📷 Screenshots
Login Page	User Dashboard
Login	Dashboard
Book Management (with Cloudinary)	Admin Panel
Books	Admin
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Karan Mehta

GitHub: @KaranMehta1806

Portfolio: yourportfolio.com

Email: your.email@example.com