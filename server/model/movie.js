var dbConfig = require("./databaseConfig");

var movieDB = {

    getActiveMovies: function(active, callback) {
        var dbConn = dbConfig.getConnection();

        dbConn.connect(function(err){

            if (err) {

                return callback(err, null);

            } else {

                var sql = "select * from movie where active = ?"

                dbConn.query(sql, [active], function(err, results){

                    dbConn.end();
                    return callback(err, results);

                })
            }
        })
        
    },

    getMoviesByNameOrID: function(search, callback) {
        var dbConn = dbConfig.getConnection();

        dbConn.connect(function(err){

            if (err) {

                return callback(err, null);

            } else {

                var name = '';
                var genreID = 0;

                if (isNaN(search)) {
                    name = `${search}%`;
                } else {
                    genreID = search;
                }

                var sql = "select * from movie where name like ? or genreID = ?"

                dbConn.query(sql, [name, genreID], function(err, results){

                    dbConn.end();
                    return callback(err, results);

                })
            }
        })
        
    },

    insertMovie: function (name, description, releaseDate, imageURL, genreID, active, callback) {

        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {

            if (err) {
                return callback(err, null);
            } else {

                var sql = 'insert into movie(name,description,releaseDate,imageURL,genreID,active) values(?,?,?,?,?,?)';

                dbConn.query(sql, [name,description,releaseDate,imageURL,genreID,active], function (err, results) {

                    dbConn.end();
                    return callback(err, results);
                });
            }                  
        });
    },

    updateMovie: function (name, description, releaseDate, imageURL, genreID, active, movieID, callback) {

        var dbConn = dbConfig.getConnection();

        dbConn.connect(function (err) {

            if (err) {
                return callback(err, null);
            } else {

                var sql = 'update movie set name=?, description=?, releaseDate=?, imageURL=?, genreID=?, active=? where movieID=?';

                dbConn.query(sql, [name,description,releaseDate,imageURL,genreID,active,movieID], function (err, results) {

                    dbConn.end();
                    return callback(err, results);
                });
            }                  
        });
    }
};

module.exports = movieDB;