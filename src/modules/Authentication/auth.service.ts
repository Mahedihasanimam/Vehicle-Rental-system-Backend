import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt from "jsonwebtoken";
const RegisterDB = async (paylod: Record<string, unknown>) => {
  const { name, email, password, phone, role } = paylod;
  const hashedpassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO Users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashedpassword, phone, role]
  );

  delete result.rows[0].password;

  return result.rows[0];
};

const getuserFromDB = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  const result = await pool.query(`SELECT * FROM Users WHERE email=$1`, [
    email,
  ]);

  const matchedpassword = await bcrypt.compare(
    password as string,
    result.rows[0].password
  );

  if (!result.rows[0]) {
    throw new Error("user not found");
  }

  if (!matchedpassword) {
    throw new Error("Invalid creadentials");
  }

  const jwtpayload = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    role: result.rows[0].role,
  };

  const token = jwt.sign(jwtpayload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  result.rows[0].token = token;

  delete result.rows[0].password;
  return result.rows[0];
};

export const authService = {
  RegisterDB,
  getuserFromDB,
};
