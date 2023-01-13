var dbConfig = require("./databaseConfig");
var config = require("../config/config");
var jwt = require('jsonwebtoken');

var userDB = {

    loginUser: function (email,password, callback) {
        
        var dbConn = dbConfig.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
        
                var sql = 'select * from user where email=? and password=?';
        
                dbConn.query(sql, [email,password], function (err, result) {
                    dbConn.end();
                            
                    if (err) {
                        console.log(err);
                        return callback(err,null);
                        
                                
                    } else {
        
                        var msg="{\"result\":\""+result.length+"\"}";               
                        

                        var token="";
                        console.log(result.length);

                        if(result.length==1) {
                            token=jwt.sign({"userid":result[0].userID,"role":result[0].role}, config.secretKey, {expiresIn:43200});
                            console.log("logged in");
                        }

                        msg={"Login": "Success"};

                        return callback(null, token);
                        
        
                    }
                });
        
            }
        
        });
    }
}

module.exports = userDB;