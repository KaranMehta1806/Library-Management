# 📚 Library Management System (MERN Stack)

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://library-management-app-karan.vercel.app/)

A complete Library Management System built with MongoDB, Express.js, React.js, and Node.js. Features role-based access control with three user types (Admin, Librarian, Student), book management with Cloudinary image uploads, issue/return tracking, and automated fine calculations.

## 🌐 Live Demo
Check out the live demo of the project:https://library-management-app-karan.vercel.app/

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

## 🚀 Tech Stack

- **Frontend**: React.js, React Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer for OTP-based password reset functionality

## 🛠️ Technology Stack

### **Frontend**
![React](https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-v6.4-CA4245?logo=reactrouter)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2-%237952B3?logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-1.3-%23631d76?logo=axios)
![Cloudinary](https://img.shields.io/badge/Cloudinary-1.32-%80B5FF?logo=cloudinary)
![React Toastify](https://img.shields.io/badge/Toastify-9.1-%23E57470?logo=react)

- **Core**: React.js (v18.2) with Functional Components & Hooks
- **Routing**: React Router v6
- **UI Framework**: React Bootstrap v5.2 + Custom CSS
- **HTTP Client**: Axios for API communication
- **Image Management**: Cloudinary React SDK
- **Notifications**: React Toastify
- **Icons**: React Icons library
- **Form Handling**: React Hook Form
- **State Management**: Context API

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-18.x-%23339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.18-%23000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-%2347A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-%23000000?logo=jsonwebtokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9-%23F7DF1E?logo=nodemailer)

- **Runtime**: Node.js v18.x
- **Framework**: Express.js v4.18
- **Database**: MongoDB Atlas (Cloud) with Mongoose ODM
- **Authentication**: JWT with Bcrypt password hashing
- **Email Service**: Nodemailer for OTP/password reset
- **File Uploads**: Multer + Cloudinary Node SDK
- **Security**: Helmet.js, CORS, Rate Limiting
- **Validation**: Express Validator

### **Development & Testing**
![Thunder Client](https://img.shields.io/badge/Thunder_Client-1.12-%237A1FA2?logo=thunderclient)
![Hopscotch](https://img.shields.io/badge/Hopscotch-Docs-%2334A853?logo=hopscotch)
![ESLint](https://img.shields.io/badge/ESLint-8.36-%234B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.0-%23F7B93E?logo=prettier)

- **API Testing**: Thunder Client (VS Code extension)
- **API Documentation**: Hopscotch
- **Code Quality**: ESLint + Prettier config
- **Version Control**: Git + GitHub
- **Package Manager**: npm v9+

### **Deployment**
![Render](https://img.shields.io/badge/Backend-Hosted_on_Render-%2300BFFF?logo=render)
![Vercel](https://img.shields.io/badge/Frontend-Hosted_on_Vercel-%23000000?logo=vercel)
![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB_Atlas-%2347A248?logo=mongodb)

- **Frontend**: Vercel (Edge Network)
- **Backend**: Render (Node.js Environment)
- **Database**: MongoDB Atlas (Cloud)
- **Media Storage**: Cloudinary CDN

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










# 🚪 Doorstep Service

Doorstep Service is a full-stack application that allows users to book services like home repairs, cleaning, and other essential services from the comfort of their homes. The platform includes an admin dashboard for managing users, service providers, and services, and allows users to book appointments, track service progress, and much more.

---

## 📜 About the Project

This project is a **MERN (MongoDB, Express.js, React, Node.js)** stack-based application. It consists of two main parts:

1. **API (Backend)**: Built using Node.js, Express.js, and MongoDB, it handles the business logic, database interactions, and authentication.
2. **Client (Frontend)**: Built using React.js, it provides a responsive and interactive user interface, with features such as booking services, user profiles, and a dashboard for service providers and admin.

---

## 🌐 Live Demo
Check out the live demo of the project:https://door-step-service-client.vercel.app/

---

## 🚀 Tech Stack

- **Frontend**: React.js, React Bootstrap, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer for OTP-based password reset functionality

---

## 🌟 Features

- **User Registration & Authentication**: Users can sign up, log in, and manage their profiles.
- **OTP Verification**: Users can reset their passwords via OTP sent to their email.
- **Service Booking**: Users can browse available services and schedule appointments.
- **Admin Dashboard**: Admins can manage users, service providers, and view booked appointments.
- **Service Provider Dashboard**: Service providers can manage their service schedules and update availability.
- **Responsive Design**: The app is fully responsive and works across various devices.

---

## 🛠️ Installation

### 1. Clone the repository

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/KaranMehta1806/DoorStepService.git
```

### 2. Install Dependencies
Navigate to the api and client directories, and install dependencies:

#### Backend (API)

##### 1. Navigate to the api directory:
```bash
cd api
```

##### 2. Install backend dependencies:
```bash
npm install
```
#### Frontend (Client)

##### 1. Navigate to the client directory:
```bash
cd client
```
##### 2. Install frontend dependencies:
```bash
npm install
```
---

### 3. Set Up Environment Variables
Create a .env file in api and add the following environment variables:

#### API (Backend) .env file
```bash
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
EMAIL_SERVICE=your_email_service
```
---

### 4. Start the Development Server
Once the dependencies are installed and the .env file is set up, you can start the development server with the following command:

#### Backend
Start the backend server by navigating to the api directory and running the following command:

```bash
nodemon app.js
```
#### Frontend
Start the frontend server by navigating to the client directory and running the following command:

```bash
npm run dev
```
---

## 📞 Contact
Feel free to connect with me through the following platforms:

[![LinkedIn](https://img.shields.io/badge/Karan_Mehta_-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mehtakaran18)
[![GitHub](https://img.shields.io/badge/Karan_Mehta_-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KaranMehta1806)
