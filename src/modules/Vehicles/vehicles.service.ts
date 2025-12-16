import { pool } from "../../database/db";

const createvehicleINDB = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO Vehicles(vehicle_name,type,registration_number,
      daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getAllVehicls = async () => {
  const result = await pool.query(`SELECT * FROM Vehicles`);

  return result.rows;
};
const getsingleVehicles = async ({ vehicleId }: { vehicleId: string }) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  return result.rows[0];
};

export const vehicleService = {
  createvehicleINDB,
  getAllVehicls,
  getsingleVehicles,
};
