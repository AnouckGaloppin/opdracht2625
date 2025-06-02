import mysql from "mysql2/promise";

interface User {
  id?: number;
  name: string;
  email: string;
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT ?? "", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params: any[]): Promise<User[]> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as User[];
  } catch (error) {
    console.error("MySQL query error:", error);
    throw error;
  }
}
