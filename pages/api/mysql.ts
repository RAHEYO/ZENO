//Note: run "npx ts-node pages/api/mysql.ts" to run a sql command

// Get the client
import mysql, { ConnectionOptions, FieldPacket }  from 'mysql2';
require('dotenv').config() // Allows us to use .env files without running the entire application!

type mysqlResponseType = mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket;

const connectionOptions: ConnectionOptions = {
  host: "localhost",
  user: "root",
  database: "zeno",
  password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS'],
};
const connection = mysql.createConnection(connectionOptions);


// Replace command below with your own SQL query
let query = 'SELECT * FROM messages'

connection.connect((err) => {
  if (err) throw err;

  console.log('Connected!');
  
  connection.query(
    query,
    function(err, results, fields) {
    if (err) throw err;
      console.log(results); // results contains rows returned by server
    }
    );
  

});


  
// Accessing mysql through this custom function
const BENCHMARK_KEY = "MYSQL_EXECUTION";
const exec = (query: string, callback: (err: mysql.QueryError, result: mysqlResponseType, fields: FieldPacket[]) => void) => {
  console.warn(`Query started: ${query}`); // Shows exactly what we're querying
  console.time(BENCHMARK_KEY); // Shows a benchmark of query performance

  connection.query(query, callback); // Query it!

  console.timeEnd(BENCHMARK_KEY); // End the benchmark and display performance
  console.log("SUCCEEDED"); // Log succeeded~ @_@
}

