import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connectinstr: process.env.NODE_DB_STRING,
  port: process.env.NODE_PORT,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
