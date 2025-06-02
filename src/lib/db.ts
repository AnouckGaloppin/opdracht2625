// import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";

interface User {
  id?: number;
  name: string;
  email: string;
}

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function query(
  operation: "find" | "insert",
  params: any
): Promise<User[] | void> {
  try {
    await client.connect();
    const db = client.db("opdracht2625");
    const collection = db.collection<User>("users");

    if (operation === "find") {
      const users = await collection.find(params).toArray();
      return users;
    } else if (operation === "insert") {
      await collection.insertOne(params);
    }
  } catch (error) {
    console.error("MongoDB query error:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: parseInt(process.env.MYSQL_PORT ?? "", 10),
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export async function query(sql: string, params: any[]): Promise<User[]> {
//   try {
//     const [results] = await pool.execute(sql, params);
//     return results as User[];
//   } catch (error) {
//     console.error("MySQL query error:", error);
//     throw error;
//   }
// }
