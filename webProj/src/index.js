const express = require('express');
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment-timezone')
const mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webproj'
});
db.connect();


const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
    res.render('home');
});

app.get('/menu', function (req, res) {
    res.render('menu');
});
app.post('/menu', function (req, res) {
    //console.log(req.body.name+' '+!!req.body.pepp);
    const data = {};
    data.id = Math.round(Math.random() * 1010111);
    data.name = req.body.name;
    data.cellNumber = req.body.cellNumber;
    data.email = req.body.email;
    data.ham = !!req.body.ham;
    data.pepp = !!req.body.pepp;
    data.onion = !!req.body.onion;
    data.greenP = !!req.body.greenP;
    data.redP = !!req.body.redP;
    data.pin = !!req.body.pin;
    res.render('success', data);
});
app.get('/lookup', function (req, res) {
    res.render('lookup');
});
app.post('/lookup', function (req, res) {
    const sql = "SELECT * FROM `order` WHERE oid = "+ parseInt(req.body.oid);
    var data={};
    db.query(sql, (error, results) => {
        if (error) {
            throw error;
        } else {
            data.success = true;
            results[0].odate = moment(results[0].odate).format('YYYY-MM-DD hh:mm');
            res.render('lookup', {
                order: results
            });
        }

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