const express = require('express');
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
    res.render('order', {
        name: 'Simon'
    });
});



app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send('<h1>404 - Page Not found</h1>')
});
app.listen(3001, function () {
    console.log('server running');
});