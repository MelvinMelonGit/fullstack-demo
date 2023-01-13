var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "capstone"
        });     
        return conn;
    }
};
module.exports = dbconnect;
