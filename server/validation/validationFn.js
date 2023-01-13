var validator = require('validator');

var validationFn = {

    validateUser: function(req,res,next) {

        var email = req.body.email;
        var password = req.body.password;

        //var reUser = new RegExp(`^[a-zA-Z0-9]$`);
        //var reUser = /^[a-zA-Z0-9]+$/
        //var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        //var rePassword = /^[a-zA-Z0-9]{8,}$/

       /* if (reUser.test(username) && reEmail.test(email) && (role =='admin' || role == 'member') && rePassword.test(password)) {

            next();

        } else {
            res.status(500);
            res.send(`{"Message" : "Failed data valdiation!}`)
        } */

        if (validator.isEmail(email) && validator.isAlphanumeric(password) && password.length > 7) {

            next();

        } else {
            res.status(500);
            res.send(`{"Message" : "User does not exist, validation failed"}`);
        }
    }
}

module.exports = validationFn;