# 🚗 Vehicle Rental System

**Live Demo:** https://vehicle-rental-system-backend-three.vercel.app (#)

A backend API for managing vehicles, customers, and bookings with secure **role-based access** (Admin & Customer).

---

## 🎯 Features

- **Vehicles:** Add, update, delete, and track availability
- **Customers:** Register, view, and manage profiles
- **Bookings:** Create, cancel, return bookings with automatic price calculation
- **Authentication:** JWT-based role access control
- **Admin vs Customer:** Admin manages all; customers manage their own bookings

---

## 🛠️ Technology Stack

- **Node.js + TypeScript**
- **Express.js** – Web framework
- **PostgreSQL (Neon DB)** – Hosted database
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Authentication

---

## ⚙️ Setup & Usage

### 1. Prerequisites

- Install **Node.js** ([nodejs.org](https://nodejs.org))
- Install **Postman** for testing APIs ([postman.com](https://www.postman.com/downloads/))

### 2. Environment Variables

Create a `.env` file in the project root:

```env
NODE_DB_STRING=postgresql://neondb_owner:password@host/neondb?sslmode=require
NODE_PORT=4000
JWT_SECRET=your_secret
3. Install Dependencies
bash
Copy code
npm install
4. Run the Server
bash
Copy code
npm run dev
Server runs at: http://localhost:4000

5. Test API
Use Postman to access endpoints like /api/v1/auth/signup, /api/v1/vehicles, /api/v1/bookings, etc.

Include JWT token in Authorization header for protected routes:

makefile
Copy code
Authorization: Bearer <token>
📁 Project Structure
bash
Copy code
src/
├─ controllers/  # Request handlers
├─ routes/       # API endpoints
├─ services/     # Business logic
├─ models/       # DB models
├─ middlewares/  # Auth & validation
├─ utils/        # Helper functions
└─ app.ts        # Express server setup
📌 Submission
GitHub Repo: Your GitHub Repo Link

Live Deployment: Your Live Deployment Link

Notes:

Admin accounts manage vehicles & users.

Customer accounts manage only their own bookings.

Keep .env values unchanged for proper DB connection.
```
