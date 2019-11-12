let express = require('express');

let app = express();

app.use((req, res, next) => {
    let d = new Date();
    let hours = d.getHours();
    let tod = (hours < 12) ? 'AM' : 'PM';
    let time = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + (hours - 12) + ':' + d.getMinutes() + tod;
    console.log('Request received at port 8081 ' + time);
    next();
});

app.get('/', (req, res) => {
    res.send('Hey there');
});

app.listen(8081, () => {console.log('Server running on port 8081')});