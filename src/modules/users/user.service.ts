import { pool } from "../../database/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM Users`);

  return result.rows;
};

const updateuserById = async (
  userId: string,
  payload: Record<string, unknown>
) => {
  const { id, name, email, phone, role } = payload;

  console.log(id, name, email, phone, role);
  const result = await pool.query(
    `UPDATE Users SET name=$1, email=$2,
    phone=$3,
    role=$4 WHERE id=$5 RETURNING * `,
    [name, email, phone, role, userId]
  );

  delete result.rows[0].password;

  return result.rows[0];
};

const deleteusersByID = async ({ userId }: { userId: string }) => {
  const result = await pool.query(`DELETE FROM Users WHERE id=$1`, [userId]);

  return result.rows[0];
};

export const userService = {
  getAllUsers,
  updateuserById,
  deleteusersByID,
};
