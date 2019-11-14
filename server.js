let express = require('express');

let app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use((req, res, next) => {
    let d = new Date();
    let hours = d.getHours();
    let tod = (hours < 12) ? 'AM' : 'PM';
    let time = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + (hours - 12) + ':' + d.getMinutes() + tod;
    console.log('Request received at port 8081 ' + time);
    next();
});

app.get('/', (req, res) => {
    res.render('footer');
});

app.listen(8081, () => {console.log('Server running on port 8081')});