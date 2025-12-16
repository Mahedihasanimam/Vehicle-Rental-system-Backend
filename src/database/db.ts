import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.NODE_DB_STRING,
});

export const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE CHECK (email = LOWER(email)),
    password VARCHAR(250) NOT NULL CHECK(LENGTH(password)>=6),
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK(role IN ('admin','customer'))
    ) `);

  await pool.query(`CREATE TABLE IF NOT EXISTS Vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(250) NOT NULL,
        type VARCHAR(200) NOT NULL CHECK(type IN ('car','bike','van','SUV')),
        registration_number VARCHAR(200) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK(daily_rent_price > 0),
        availability_status VARCHAR(20) NOT NULL CHECK(availability_status IN ('available','booked'))
        )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
       customer_id INT REFERENCES Users(id),
       vehicle_id INT REFERENCES Vehicles(id),
       rent_start_date DATE NOT NULL,
       rent_end_date DATE NOT NULL CHECK(rent_end_date > rent_start_date),
       total_price NUMERIC(10,2) NOT NULL CHECK(total_price>0),
       status VARCHAR(20)  CHECK(status IN('active','cancelled','returned'))
        )`);

  console.log("DATABASE CONNECTED");
};
