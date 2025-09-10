<!-- Project README for SwasthyaSetu -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:22c55e,100:0ea5e9&height=200&section=header&text=SwasthyaSetu&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=40" />
</p>

<p align="center">
  <b>💊 SwasthyaSetu — Doctor Appointment Booking Platform</b>
</p>

---

## 🔗 Live Demo
👉 [Visit SwasthyaSetu](https://your-live-link.com)  

---

## ✨ Overview
**SwasthyaSetu** is a **full-stack doctor appointment booking system** that simplifies healthcare accessibility.  
It provides a **secure, scalable, and user-friendly** platform where:  
- Patients can book appointments online  
- Doctors can manage their schedules in real-time  
- Admins can oversee the entire system with role-based access  

Built with **React + Tailwind (Frontend)** and **Express + Node.js (Backend)**, powered by **MongoDB Atlas**, and secured with **JWT authentication**.  

---

## 🚀 Features

- 🏥 **Role-Based Access** — Patients, Doctors, and Admins each have dedicated dashboards  
- 📅 **Appointment Booking** — Patients can book, reschedule, or cancel appointments  
- 👨‍⚕️ **Doctor & Admin Portals** — Manage schedules, availability, and patient lists  
- 💳 **Online Payments** — Integrated with Razorpay for secure transactions  
- 🔐 **Authentication** — Secure login & signup with JWT  
- ⚡ **RESTful APIs** — Clean separation of backend, frontend, and admin services  
- 📈 **Scalable Architecture** — Optimized database & modular design  

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas (Mongoose ODM)  
- **Auth**: JWT (JSON Web Tokens)  
- **Payments**: Razorpay Integration  
- **Deployment**: Render / Vercel / Netlify  

<div align="center">
  <img src="https://skillicons.dev/icons?i=react,tailwind,nodejs,express,mongodb,git,github&theme=dark" />
</div>

---

## ⚡ Getting Started

### Prerequisites
- Node.js & npm  
- MongoDB Atlas account  
- Razorpay account (for payments)  

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/SwasthyaSetu.git
cd SwasthyaSetu

# Install dependencies for frontend, backend, and admin
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install

# Create .env files in respective folders:
# For backend:
# MONGO_URL=...
# JWT_SECRET=...
# RAZORPAY_KEY=...
# RAZORPAY_SECRET=...

# Run backend
npm start

# Run frontend & admin in separate terminals
npm run dev
