//Note: run "npx ts-node pages/api/mysql.ts" to run a sql command

// Get the client
import mysql, { ConnectionOptions, FieldPacket }  from 'mysql2/promise';
require('dotenv').config() // Allows us to use .env files without running the entire application!

export type mysqlResponseType = mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.ProcedureCallPacket;

const connectionOptions: ConnectionOptions = {
  host: "localhost",
  user: "root",
  database: "zeno",
  password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS'],
};

export const myQuery = async (query='SELECT * FROM users') => {
  const connection = await mysql.createConnection(connectionOptions);
  const res = await connection.query(query);
  await connection.end(); // End the connection to the database
  
  return res;
}

// myQuery(`SELECT id, space_id, name, category+0 FROM channels WHERE space_id = 3;`);