import mysql, { ConnectionOptions }  from 'mysql2/promise';
require('dotenv').config() // Allows us to use .env files without running the entire application!

const connectionOptions: ConnectionOptions = {
    host: "localhost",
    user: "root",
    database: "zeno",
    password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS'],
};

export const establishConnection = async () => {
    const dbConnection = await mysql.createConnection(connectionOptions);

    return dbConnection;
}