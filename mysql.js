const mysql = require('mysql2');


// Conectamos a la base de datos
var connection = mysql.createPool({
    host: process.env.DBHOST || "ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: process.env.DBUSER || "xewbapukon3jeiwp",
    password: process.env.DBPASSWORD || "akqart1fr4vgqdej",
    database: process.env.DBDATABASE || "t0kbp99f0gbdo2dc"
  });

module.exports = connection;