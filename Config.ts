import mysql, { ConnectionOptions }  from 'mysql2';
require('dotenv').config() // Allows us to use .env files without running the entire application!

const connectionOptions: ConnectionOptions = {
    host: "localhost",
    user: "root",
    database: "zeno",
    password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS'],
};

const pool = mysql.createPool(connectionOptions);

export const establishConnection = async () => {
    const dbConnection = pool.promise();

    return dbConnection;
}