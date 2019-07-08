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
    const data = {
        success: false,
        info: '',
    };
    data.id = Math.round(Math.random() * 101111);
    data.name = req.body.name;
    data.cellphone = req.body.cellphone;
    data.email = req.body.email;
    data.ham = !!req.body.ham;
    data.pepp = !!req.body.pepp;
    data.onion = !!req.body.onion;
    data.greenP = !!req.body.greenP;
    data.redP = !!req.body.redP;
    data.pin = !!req.body.pin;
    data.mush = !!req.body.mush;


    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const meat = (data.ham? 'h':'')+(data.pepp? 'p':'');
    const veggie = (data.onion? 'o':'')+(data.greenP? 'g':'')+(data.redP? 'r':'')+(data.pin? 'p':'')+(data.mush? 'm':'');
    const sql = 'INSERT INTO `order` VALUES(?,?,?,?,?,?,?)';
    db.query(sql,
        [data.id, data.name,data.email, data.cellphone, dateTime, meat, veggie],
        (error, results)=>{
            if(error){
                data.info = '新增資料失敗';
                res.render('home');

            }else{
                if (results.affectedRows === 1) {
                    data.info = '新增資料成功';
                    data.success = true;
                    res.render('success', data);
                }

            }
        });
});
app.get('/lookup', function (req, res) {
    res.render('lookup');
});
app.post('/lookup', function (req, res) {
    console.log(req.body);
    const sql = "SELECT * FROM `order` WHERE ?? = ? ;";
    var data = {
        success: false,
        info: '',
        body: '',
    };
    db.query(sql, [ req.body.method, req.body.oid],
        (error, results) => {
            if (error) {
                data.success = false;
                info: 'Error';
            } else {
                // console.log(results);
                // Object.keys(results).forEach(function(key) {
                //     var row = results[key];
                //     console.log((JSON.parse(JSON.stringify(row))));
                // });
                if (results.length > 0) {
                    results[0].odate = moment(results[0].odate).format('YYYY-MM-DD hh:mm');
                    data.success = true;
                    data.body = results[0];
                    info: 'Success';
                }
                else{
                    info:'Fail';
                    data.success = false;
                }

            }
            res.json(data);
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