import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import multer from 'multer';

import { serverPort, apiPrefix } from '../etc/config.json'

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

const storage = multer.diskStorage({
    destination: './uploads',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/', express.static(path.join(__dirname, '../public'))); // отдача статистических файлов из /public, для heroku необходимо заменить ../public -> ../../public

app.get('/films', (req, res) => {
    db.listFilms().then((data) => res.send(data));
});

app.get('/films/title/:id', (req, res) => { //поиск фильма по заголовку
    db.listFilmsFindTitle(req.params.id).then((data) => res.send(data));
});

app.get('/films/stars/:id', (req, res) => { //поиск фильма по актеру
    db.listFilmsFindStars(req.params.id).then((data) => res.send(data));
});

app.post('/films', (req, res) => {
    db.createFilm(req.body).then((data) => res.send(data));
});

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..

    try {
        fs.readFile(`uploads/${file.originalname}`, function(err, data) {
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
            arrayStr.forEach(function(elem, i, array) {
                let elemArrayObj = {};
                let arrayStars = [];
                elemArrayObj.title = elem[0].substring(7);
                elemArrayObj.releaseYear = elem[1].substring(14);
                elemArrayObj.format = elem[2].substring(8);
                arrayStars = elem[3].substring(7).split(', ');
                elemArrayObj.stars = arrayStars;
                arrayObj.push(elemArrayObj);
            });

            db.uploadFilms(arrayObj).then((data) => res.send(data));
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

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then((data) => res.send(data));
});

app.delete('/films', (req, res) => {
    db.deleteAllFilms().then((data) => res.send(data));
});

var port = process.env.PORT || serverPort; // for Heroku

const server = app.listen(port, () => {
    console.log(`Server is run up on port ${port}`);
});