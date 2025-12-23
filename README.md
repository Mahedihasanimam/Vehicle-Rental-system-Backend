# 🚗 Vehicle Rental System

A backend API for managing vehicles, customers, and bookings with **role-based authentication**.

---

## 🎯 Overview

- **Vehicles** – Add, update, track availability
- **Customers** – Register and manage profiles
- **Bookings** – Create, cancel, return bookings with total cost calculation
- **Authentication** – Admin and Customer roles with JWT-based access

---

## 🛠️ Technology

- **Node.js + TypeScript**
- **Express.js**
- **PostgreSQL (Neon DB)**
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Authentication

---

## 📁 Structure

src/
├─ controllers/ # Request handlers
├─ routes/ # API endpoints
├─ services/ # Business logic
├─ models/ # DB models
├─ middlewares/ # Auth & validation
├─ utils/ # Helpers
└─ app.ts # Server setup

yaml
Copy code

---

## 🔐 Roles & Auth

- **Admin** – Full access (vehicles, users, bookings)
- **Customer** – Manage own bookings
- Passwords hashed with bcrypt
- JWT token required for protected routes

---

## 🌐 API Endpoints

| Feature  | Endpoint                   | Access       |
| -------- | -------------------------- | ------------ |
| Auth     | /api/v1/auth/signup/signin | Public       |
| Vehicles | /api/v1/vehicles/:id       | Admin/Public |
| Users    | /api/v1/users/:id          | Admin/Own    |
| Bookings | /api/v1/bookings/:id       | Role-based   |

---

## ⚙️ Setup (Non-Tech Friendly)

1. Install **Node.js** ([nodejs.org](https://nodejs.org))
2. Download project and open folder
3. Create `.env` file:

```env
NODE_DB_STRING=postgresql://neondb_owner:password@host/neondb?sslmode=require
NODE_PORT=4000
JWT_SECRET=your_secret
Install dependencies:

bash
Copy code
npm install
Start server:

bash
Copy code
npm run dev
Test APIs using Postman (login, add vehicles, create bookings)

Server runs at: http://localhost:4000

✅ Notes
Admin manages vehicles & users

Customers manage own bookings

Keep .env values unchanged for Neon DB connection
```
