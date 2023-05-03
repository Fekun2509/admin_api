// get the client
import mysql from 'mysql2/promise';

// create the connection to database
const connection = mysql.createPool({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12614411',
  password: '4IumjlRUEF',
  database: 'sql12614411'

  // host: 'localhost',
  // user: 'root',
  // database:'nodejsbasic'
});

export default connection;