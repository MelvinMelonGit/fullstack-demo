var dbConfig = require("./databaseConfig");

var genreDB = {

    getAllGenres: function(callback) {
        var dbConn = dbConfig.getConnection();

        dbConn.connect(function(err){

            if (err) {

                return callback(err, null);

            } else {

                var sql = "select * from genre"

                dbConn.query(sql, [], function(err, results){

                    dbConn.end();
                    return callback(err, results);

                })
            }
        })
        
    },

    insertGenre: function (name, description, callback) {

        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {

            if (err) {
                return callback(err, null);
            } else {

                var sql = 'insert into genre(name,description) values(?,?)';

                dbConn.query(sql, [name,description], function (err, results) {

                    dbConn.end();
                    return callback(err, results);
                });
            }                  
        });
    },

    deleteGenre: function (genreID, callback) {

        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {

            if (err) {
                return callback(err, null);
            } else {

                var sql = 'delete from genre where genreID=?';

                dbConn.query(sql, [genreID], function (err, results) {

                    dbConn.end();
                    return callback(err, results);
                });
            }


        });
    }
};

module.exports = genreDB;