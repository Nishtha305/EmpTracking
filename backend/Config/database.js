const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'Password@123',
    database: 'emp_tracking'
})
connection.connect((err) => {
    if (err) {
        console.log('Database connection failed', err);
        return;
    } else {
        console.log('Connected');
    }
})

module.exports = connection;