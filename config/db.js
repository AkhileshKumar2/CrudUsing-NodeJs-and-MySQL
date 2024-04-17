const mysql = require("mysql2/promise");
const mySqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Aksk@2798",
    database: "students_db"
});

module.exports = mySqlPool;