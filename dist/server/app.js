'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _config = require('../etc/config.json');

var _DataBaseUtils = require('./utils/DataBaseUtils.js');

var db = _interopRequireWildcard(_DataBaseUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

db.setUpConnection();

var app = (0, _express2.default)();

var storage = _multer2.default.diskStorage({
    destination: './uploads',
    filename: function filename(req, file, cb) {
        cb(null, '' + file.originalname);
    }
});

var upload = (0, _multer2.default)({ storage: storage });

app.use(_bodyParser2.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', _express2.default.static(_path2.default.join(__dirname, '../../public'))); // отдача статистических файлов из /public

app.get('/films', function (req, res) {
    db.listFilms().then(function (data) {
        return res.send(data);
    });
});

app.get('/films/title/:id', function (req, res) {
    //поиск фильма по заголовку
    db.listFilmsFindTitle(req.params.id).then(function (data) {
        return res.send(data);
    });
});

app.get('/films/stars/:id', function (req, res) {
    //поиск фильма по актеру
    db.listFilmsFindStars(req.params.id).then(function (data) {
        return res.send(data);
    });
});

app.post('/films', function (req, res) {
    db.createFilm(req.body).then(function (data) {
        return res.send(data);
    });
});

app.post('/upload', upload.single('file'), function (req, res) {
    var file = req.file; // file passed from client
    var meta = req.body; // all other values passed from the client, like name, etc..

    try {
        _fs2.default.readFile('uploads/' + file.originalname, function (err, data) {
            if (err) throw err;

            var arrayStr = data.toString().split("\n\n");
            var arrayObj = [];

            for (var i = 0; i < arrayStr.length; i++) {
                arrayStr[i] = arrayStr[i].split("\n");
            }
            var i = 0;
            while (i < arrayStr.length) {
                while (arrayStr[i].indexOf("") !== -1) {
                    arrayStr[i].splice(arrayStr[i].indexOf(""), 1);
                }
                if (arrayStr[i].length === 0) {
                    arrayStr.splice(i, 1);
                } else {
                    i++;
                }
            }
            arrayStr.forEach(function (elem, i, array) {
                var elemArrayObj = {};
                var arrayStars = [];
                elemArrayObj.title = elem[0].substring(7);
                elemArrayObj.releaseYear = elem[1].substring(14);
                elemArrayObj.format = elem[2].substring(8);
                arrayStars = elem[3].substring(7).split(', ');
                elemArrayObj.stars = arrayStars;
                arrayObj.push(elemArrayObj);
            });

            db.uploadFilms(arrayObj).then(function (data) {
                return res.send(data);
            });
        });
    } catch (err) {
        res.send(err);
    }
});

// //===========================================================
// // work's on file with not correct structure
// //=============================================================
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file; // file passed from client
//     const meta = req.body; // all other values passed from the client, like name, etc..

//     fs.readFile(`uploads/${file.originalname}`, function(err, data) {
//         if (err) throw err;

//         var arrayStr = data.toString().split("\r\n\r\n");
//         var arrayObj = [];

//         for (var i = 0; i < arrayStr.length; i++) {
//             arrayStr[i] = arrayStr[i].split("\r\n");
//         }
//         var i = 0;
//         while (i < arrayStr.length) {
//             while (arrayStr[i].indexOf("") !== -1) {
//                 arrayStr[i].splice(arrayStr[i].indexOf(""), 1);
//             }
//             if (arrayStr[i].length === 0) {
//                 arrayStr.splice(i, 1);
//             } else {
//                 i++;
//             }
//         }
//         arrayStr.forEach(function(elem, i, array) {
//             let elemArrayObj = {};
//             let arrayStars = [];
//             elemArrayObj.title = elem[0].substring(7);
//             elemArrayObj.releaseYear = elem[1].substring(14);
//             elemArrayObj.format = elem[2].substring(8);
//             arrayStars = elem[3].substring(7).split(', ');
//             elemArrayObj.stars = arrayStars;
//             arrayObj.push(elemArrayObj);
//         });
//         db.uploadFilms(arrayObj).then((data) => res.send(data));
//     });
// });
// //==========================================================

app.delete('/films/:id', function (req, res) {
    db.deleteFilm(req.params.id).then(function (data) {
        return res.send(data);
    });
});

app.delete('/films', function (req, res) {
    db.deleteAllFilms().then(function (data) {
        return res.send(data);
    });
});

var port = process.env.PORT || _config.serverPort; // for Heroku

var server = app.listen(port, function () {
    console.log('Server is run up on port ' + port);
});