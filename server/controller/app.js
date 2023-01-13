var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var movieDB = require('../model/movie');
var genreDB = require('../model/genre')
var userDB = require('../model/user');
var validationFn = require('../validation/validationFn');
var verificationLib = require('../auth/verifyToken');

var app = express();
app.options('*', cors()); // include before other routes
app.use(cors());//you can place this after app.options(…); enable cors for all origins

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data


//Assignment 1

//POST /user/login
app.post('/user/login', validationFn.validateUser, function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    userDB.loginUser(email,password, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Login failed, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"JWT":"${results}"}`);
        }

    });

});

//POST /movie
//web api is admin access only
app.post('/movie', verificationLib.verifyToken, verificationLib.verifyAdmin, function (req, res) {

    //retrieve the body params containing movie details
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var imageURL = req.body.imageURL;
    var genreID = req.body.genreID;
    var active = req.body.active;

    movieDB.insertMovie(name, description, releaseDate, imageURL, genreID, active, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to add movie, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"Message":"${results.affectedRows} row(s) inserted"}`);
        }

    });

});

//POST /genre
//web api is admin access only
app.post('/genre', verificationLib.verifyToken, verificationLib.verifyAdmin, function (req, res) {

    //retrieve the body params containing genre details
    var name = req.body.name;
    var description = req.body.description;

    genreDB.insertGenre(name, description, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to add genre, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"Message":"${results.affectedRows} row(s) inserted"}`);
        }

    });

});

//GET /movies/active/:active
app.get('/movies/active/:active', function (req, res) {

   var active = req.params.active;

   movieDB.getActiveMovies(active, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to retrieve movies, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(results);
        }

    });

});

//test capstone feature
//GET /movies
app.get('/movies', function (req, res) {

   movieDB.getAllMoviesCapstone(function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to retrieve movies, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(results);
        }

    });

});

//GET /movies/search/:search
app.get('/movies/search/:search', function (req, res) {

   var search = req.params.search;

   movieDB.getMoviesByNameOrID(search, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to retrieve movies, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(results);
        }

    });

});

//GET /genres
app.get('/genres', function (req, res) {

   genreDB.getAllGenres(function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to retrieve genres, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(results);
        }

    });

});

//test capstone feature
app.put('/movie/:movieID', function (req, res) {

    var movieID = req.params.movieID;
    //retrieve the body params containing movie details
    var movietitle = req.body.movietitle;
    var moviedesc = req.body.moviedesc;
    var movieimage = req.body.movieimage;
    var genreID = req.body.genreID;

    movieDB.updateMovieCapstone(movietitle, moviedesc, movieimage, genreID,movieID, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to add movie, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"Message":"${results.affectedRows} row(s) updated"}`);
        }

    });

});

//Assignment 2

//PUT /movie/:movieID
//web api is admin access only
app.put('/movie/:movieID', verificationLib.verifyToken, verificationLib.verifyAdmin, function (req, res) {

    var movieID = req.params.movieID;
    //retrieve the body params containing movie details
    var name = req.body.name;
    var description = req.body.description;
    var releaseDate = req.body.releaseDate;
    var imageURL = req.body.imageURL;
    var genreID = req.body.genreID;
    var active = req.body.active;

    movieDB.updateMovie(name, description, releaseDate, imageURL, genreID, active, movieID, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to add movie, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"Message":"${results.affectedRows} row(s) updated"}`);
        }

    });

});

//DELETE /genre/:genreID
//web api is admin access only
app.delete('/genre/:genreID', verificationLib.verifyToken, verificationLib.verifyAdmin, function (req, res) {

    var genreID = req.params.genreID;

    genreDB.deleteGenre(genreID, function (err, results) {

        if (err) {
            console.log(err);
            res.status(500);
            res.type('json');
            res.send(`{"Message": "Failed to delete genre, please try again."}`);
        } else {
            res.status(200);
            res.type('json');
            res.send(`{"Message":"${results.affectedRows} row(s) deleted"}`);
        }

    });

});

module.exports = app;