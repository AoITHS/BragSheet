let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let bcrypt = require('bcryptjs')
let db = require('./configuration/db');

db.connect(function(err){
    if(err) {
        console.error("Error connecting to " + err.stack);
        return;
    }
    console.log("MySQL Connection ID " + db.threadId );
});

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'pass'
    },
    (email, pass, done) => {
        db.query(`SELECT email, password, verified FROM Accounts WHERE email='${email}';`, (err, result) => {
            if(err) {
                console.log(err);
                return done(null, false, {message: err});
            }

            if(result.length === 0) return done(null, false, {message: 'Incorrect email'});
            
            let user = result[0];

            let passwordValid = bcrypt.compareSync(pass, user.password);

            if(!passwordValid) return done(null, false, {message: 'Inccorect password'});

            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;