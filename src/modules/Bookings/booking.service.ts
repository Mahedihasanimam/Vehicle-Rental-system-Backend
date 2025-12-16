import { pool } from "../../database/db";
import { vehicleService } from "../Vehicles/vehicles.service";

const createbookingINDB = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  console.log(customer_id, vehicle_id, rent_start_date, rent_end_date);

  const vehicle = await vehicleService.getsingleVehicles({
    vehicleId: vehicle_id as string,
  });

  const { daily_rent_price } = vehicle;

  const rentDays =
    (new Date(rent_end_date as string).getTime() -
      new Date(rent_start_date as string).getTime()) /
    (1000 * 3600 * 24);
  if (rentDays <= 0) throw new Error("Invalid rent period");
  const total_price = Number(daily_rent_price) * rentDays;
  const status = "active";

  const result = await pool.query(
    `INSERT INTO Bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  result.rows[0].vehicle = {
    vehicle_name: vehicle.vehicle_name,
    daily_rent_price: vehicle.daily_rent_price,
  };

  return result.rows[0];
};

const getallBookings = async () => {
  const result = await pool.query(`
    SELECT 
      b.*,
      json_build_object(
        'name', u.name,
        'email', u.email
      ) AS customer,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
      ) AS vehicle
    FROM Bookings b
    JOIN Users u ON b.customer_id = u.id
    JOIN Vehicles v ON b.vehicle_id = v.id
    ORDER BY b.id
  `);

  return result.rows;
};

const getSingleBooking = async ({ bookingId }: { bookingId: string }) => {
  const result = await pool.query(`SELECT * FROM Bookings WHERE id=$1`, [
    bookingId,
  ]);

  return result.rows[0];
};

const updatebookingByid = async (bookingId: string, status: string) => {
  const singlebooking = await getSingleBooking({ bookingId });
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
    singlebooking;

  const vehicle = await vehicleService.getsingleVehicles({
    vehicleId: vehicle_id as string,
  });

  const result = await pool.query(
    `UPDATE Bookings SET customer_id=$1, vehicle_id=$2, rent_start_date=$3,
    rent_end_date=$4, status=$5 WHERE id=$6 RETURNING * `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, status, bookingId]
  );

  result.rows[0].status = status;
  return result.rows[0];
};

export const bookingService = {
  createbookingINDB,
  updatebookingByid,
  getallBookings,
};
