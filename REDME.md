# 🚗 Vehicle Rental System

## 🎯 Project Overview

A backend API for a vehicle rental management system that handles:

- **Vehicles** – Manage vehicle inventory with availability tracking
- **Customers** – Manage customer accounts and profiles
- **Bookings** – Handle vehicle rentals, returns, and cost calculation
- **Authentication** – Secure role-based access control (Admin and Customer roles)

---

## 🛠️ Technology Stack

- **Node.js + TypeScript**
- **Express.js** – Web framework
- **PostgreSQL** – Database (Neon DB hosted)
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Authentication & authorization

---

## 📁 Code Structure

The project follows a **modular pattern** with clear separation of concerns:

src/
├─ controllers/ # Handles HTTP requests
├─ routes/ # API endpoints
├─ services/ # Business logic & DB interactions
├─ models/ # Database models
├─ middlewares/ # Auth & validation middleware
├─ utils/ # Helper functions
└─ app.ts # Express app setup

sql
Copy code

Each feature (auth, users, vehicles, bookings) has its **own module** with proper layering (routes → controllers → services → models).

---

## 📊 Database Tables

### Users

| Field    | Notes                       |
| -------- | --------------------------- |
| id       | Auto-generated              |
| name     | Required                    |
| email    | Required, unique, lowercase |
| password | Required, min 6 characters  |
| phone    | Required                    |
| role     | 'admin' or 'customer'       |

### Vehicles

| Field               | Notes                          |
| ------------------- | ------------------------------ |
| id                  | Auto-generated                 |
| vehicle_name        | Required                       |
| type                | 'car', 'bike', 'van', or 'SUV' |
| registration_number | Required, unique               |
| daily_rent_price    | Required, positive             |
| availability_status | 'available' or 'booked'        |

### Bookings

| Field           | Notes                                |
| --------------- | ------------------------------------ |
| id              | Auto-generated                       |
| customer_id     | Links to Users table                 |
| vehicle_id      | Links to Vehicles table              |
| rent_start_date | Required                             |
| rent_end_date   | Required, must be after start date   |
| total_price     | Required, positive                   |
| status          | 'active', 'cancelled', or 'returned' |

---

## 🔐 Authentication & Authorization

### User Roles

- **Admin** – Full system access to manage vehicles, users, and all bookings
- **Customer** – Can register, view vehicles, create/manage own bookings

### Authentication Flow

1. Passwords are hashed using **bcrypt** before storing in the database
2. User login via `/api/v1/auth/signin` returns a **JWT token**
3. Protected endpoints require token in header:  
   Authorization: Bearer <token>

sql
Copy code 4. JWT is validated and permissions checked  
5. Access granted if authorized; otherwise returns **401 (Unauthorized)** or **403 (Forbidden)**

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint            | Access | Description               |
| ------ | ------------------- | ------ | ------------------------- |
| POST   | /api/v1/auth/signup | Public | Register new user account |
| POST   | /api/v1/auth/signin | Public | Login and receive JWT     |

### Vehicles

| Method | Endpoint                    | Access     | Description                                       |
| ------ | --------------------------- | ---------- | ------------------------------------------------- |
| POST   | /api/v1/vehicles            | Admin only | Add new vehicle with details                      |
| GET    | /api/v1/vehicles            | Public     | View all vehicles                                 |
| GET    | /api/v1/vehicles/:vehicleId | Public     | View specific vehicle details                     |
| PUT    | /api/v1/vehicles/:vehicleId | Admin only | Update vehicle details or availability            |
| DELETE | /api/v1/vehicles/:vehicleId | Admin only | Delete vehicle (only if no active bookings exist) |

### Users

| Method | Endpoint              | Access       | Description                                          |
| ------ | --------------------- | ------------ | ---------------------------------------------------- |
| GET    | /api/v1/users         | Admin only   | View all users                                       |
| PUT    | /api/v1/users/:userId | Admin or Own | Admin: Update any user; Customer: Update own profile |
| DELETE | /api/v1/users/:userId | Admin only   | Delete user (only if no active bookings exist)       |

### Bookings

| Method | Endpoint                    | Access         | Description                                                                                 |
| ------ | --------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| POST   | /api/v1/bookings            | Customer/Admin | Create booking (validates availability, calculates total price, marks vehicle booked)       |
| GET    | /api/v1/bookings            | Role-based     | Admin: view all bookings; Customer: view own bookings                                       |
| PUT    | /api/v1/bookings/:bookingId | Role-based     | Customer: cancel booking (before start date only); Admin: mark returned (vehicle available) |

---

## 📚 Additional Resources

- **API Reference** – Detailed request/response documentation
- **Submission Guide** – Assignment requirements and deadlines

---

## ⚙️ Environment Variables

You **must** set these to run the project:

```env
NODE_DB_STRING=postgresql://neondb_owner:npg_wmAzuJPatL69@ep-crimson-dust-a8oel3v7-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_PORT=4000
JWT_SECRET=0af8b8ad48fdb674a645d378521cd780
```
