// Get the client
import mysql, { ConnectionOptions, FieldPacket } from 'mysql2';

type mysqlResponseType = mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket;

const connectionOptions: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  database: 'zeno',
};
const connection = mysql.createConnection(connectionOptions);

// Sample query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
  );
  
// Accessing mysql through this custom function
const BENCHMARK_KEY = "MYSQL_EXECUTION";
const exec = (query: string, callback: (err: mysql.QueryError, result: mysqlResponseType, fields: FieldPacket[]) => void) => {
  console.warn(`Query started: ${query}`); // Shows exactly what we're querying
  console.time(BENCHMARK_KEY); // Shows a benchmark of query performance

  connection.query(query, callback); // Query it!

  console.timeEnd(BENCHMARK_KEY); // End the benchmark and display performance
  console.log("SUCCEEDED"); // Log succeeded~ @_@
}

