import mysql, { ConnectionOptions }  from 'mysql2';
require('dotenv').config() // Allows us to use .env files without running the entire application!

const connectionOptions: ConnectionOptions = {
    // host: process.env['NEXT_PUBLIC_SERVER_HOST'],
    // user: process.env['NEXT_PUBLIC_SERVER_USER'],
    // database: process.env['NEXT_PUBLIC_SERVER_DATABASE'],
    // password: process.env['NEXT_PUBLIC_SERVER_PASS'],
    // port: 3306
    host: process.env['NEXT_PUBLIC_LOCAL_HOST'],
    user: process.env['NEXT_PUBLIC_LOCAL_USER'],
    database: process.env['NEXT_PUBLIC_LOCAL_DATABASE'],
    password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS']
};

const pool = mysql.createPool(connectionOptions);

export const establishConnection = async () => {
    const dbConnection = pool.promise();

    return dbConnection;
}