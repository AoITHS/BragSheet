let express = require('express');
let app = express();
let port = 8081;
let bodyparser = require('body-parser');
let db = require('./configuration/db');
let session = require("express-session");
let passport = require('./configuration/passport');

db.connect(function(err){
    if(err) {
        console.error("Error connecting to " + err.stack);
        return;
    }
    console.log("MySQL Connection ID " + db.threadId );
});

const unsafeRegex = /['"\\]/g;

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({secret: "Yeeerrrr"}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine', 'pug');

app.use((req, res, next) => {
    let d = new Date();
    let hours = d.getHours();
    let tod = (hours < 12) ? 'AM' : 'PM';
    let time = ('00' + (d.getMonth() + 1)).substr(-2) + '/' + ('00' + d.getDate()).substr(-2) + '/' + d.getFullYear() + ' ' + (hours - 12) + ':' + ('00' + d.getMinutes()).substr(-2) + tod;
    console.log('Request received at port 8081 ' + time);
    next();
});

app.get('/', (req, res) => {
    if(req.session.passport) console.log(req.session.passport.user);

    res.render('index', {loggedin: (req.session.passport !== undefined)});
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) console.log(err);
        res.redirect('/');
    });
});

app.get('/account/login', (req, res) => {
    res.render("accounts/login");
});

app.post('/account/login-ap', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

app.get('/account/register', (req, res) => {
    res.render("accounts/register");
});

app.post('/account/register-ap', (req, res) => {    
    console.log(req.body);

    let email = req.body.email.replace(unsafeRegex, x => '\\' + x);
    let pass = req.body.pass.replace(unsafeRegex, x => '\\' + x);
    let first = req.body.first.replace(unsafeRegex, x => '\\' + x);
    let last = req.body.last.replace(unsafeRegex, x => '\\' + x);
    let osis = req.body.osis.replace(unsafeRegex, x => '\\' + x);
    let grade = req.body.grade.replace(unsafeRegex, x => '\\' + x);
    let school = req.body.school.replace(unsafeRegex, x => '\\' + x);


    let statement = `
        INSERT INTO Accounts (email, password, role)
        VALUES ('${email}','${pass}','1');
        INSERT INTO Students (first_name, last_name, school, osis, grade, account)
        VALUES ('${first}','${last}','${school}','${osis}','${grade}', (SELECT id FROM Accounts WHERE email='${email}'));
    `;

    db.query(statement, (err, result) => {
        if(err) console.log(err);
        console.log('Changes were made to the database');
        console.log(result);
    });

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});