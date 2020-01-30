let express = require('express'),
    app = express(),
    port = 8081,
    pug = require("pug");

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');
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
    res.render('index');
});


app.get('/account/login', (req, res) => {
    res.render('accounts/login');
});
app.listen(port, () => {
    console.log(`Server running on port ${ port }`)
});