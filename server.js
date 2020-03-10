let express = require('express');
let app = express();
let port = 8081;
let bodyparser = require('body-parser');
let db = require('./configuration/db');
let session = require('express-session');
let passport = require('./passport');
let bcrypt = require('bcryptjs');
let transport = require('./configuration/transporter');
let url = require('url');
const unsafeRegex = /['"\\]/g;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json())
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

app.post('/account/login-ap', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/account/login'}));

app.get('/account/register', (req, res) => {
    res.render("accounts/register");
});

app.get('/account/verification', (req, res) => {
    res.render("accounts/verification");
});

app.get('/account/verify', (req, res) => {
    let q = url.parse(req.url, true).query;

    if(!q.email || !q.code) {
        res.redirect('/account/login');
        return;
    }

    let email = q.email.replace(unsafeRegex, x => '\\' + x);;
    let code = q.code.replace(unsafeRegex, x => '\\' + x);;

    let statement = `
        UPDATE Accounts
        SET verified='1'
        WHERE EXISTS (SELECT email FROM VerifyCodes WHERE email='${email}' AND code='${code}');
    `;

    db.query(statement, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }

        console.log('Changes have been made to the database.');
        console.log(result);
    });
    
    res.redirect('/account/login');
});

app.get('/form', (req, res) => {
    res.render("form");
});

app.post('/account/register-ap', (req, res) => {    
    let email = req.body.email.replace(unsafeRegex, x => '\\' + x);
    let first = req.body.first.replace(unsafeRegex, x => '\\' + x);
    let last = req.body.last.replace(unsafeRegex, x => '\\' + x);
    let osis = req.body.osis.replace(unsafeRegex, x => '\\' + x);
    let grade = req.body.grade.replace(unsafeRegex, x => '\\' + x);
    let school = req.body.school.replace(unsafeRegex, x => '\\' + x);
    let pass = req.body.pass;

    let statement1 = `SELECT id FROM Accounts WHERE email='${email}';`

    db.query(statement1, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }

        if(result.length > 0) res.send(JSON.stringify({error: 'Email already exists'}));
        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    let code = "";

                    for(let i = 0; i < 4; i++) {
                        code += Math.round(Math.random() * 10);
                    }

                    let statement2 = `
                        INSERT INTO Accounts (email, password, role)
                        VALUES ('${email}','${hash}','1');
                        INSERT INTO Students (first_name, last_name, school, osis, grade, account)
                        VALUES ('${first}','${last}','${school}','${osis}','${grade}', (SELECT id FROM Accounts WHERE email='${email}'));
                        INSERT INTO VerifyCodes (account, code)
                        VALUES ((SELECT id FROM Accounts WHERE email='${email}'), '${code}');
                    `;

                    db.query(statement2, (err, result) => {
                        if(err) {
                            console.log(err);
                            return;
                        }

                        let mailOptions = {
                            from: 'borderhopperbigchungus@gmail.com',
                            to: req.body.email,
                            subject: 'Verify Your Bragsheet Account',
                            html: `Click the link below to verify your acount:<br />
                                   http://localhost:8081/account/verify?email=${email}&code=${code}`
                        }
                        
                        transport.sendMail(mailOptions, (err, info) => {
                            if(err) console.log(err);
                            else console.log('Email Sent: ' + info.response);
                        });

                        console.log('Changes have been made to the database.');
                        console.log(result);
                        res.send(JSON.stringify({error: ''}));
                    });
                });
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});