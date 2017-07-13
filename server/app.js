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

app.get('/', function(req, res) {
    res.send("Api server works!");
});

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

    fs.readFile(`uploads/${file.originalname}`, function(err, data) {
        if (err) throw err;

        var arrayStr = data.toString().split("\n");
        var arrayObj = [];

        console.log("arrayStr.length - " + arrayStr.length);
        console.log("arrayStr[ arrayStr.length -1 ] : ");
        console.log(arrayStr[arrayStr.length - 1]);
        console.log("arrayStr[ arrayStr.length -2 ] : ");
        console.log(arrayStr[arrayStr.length - 2]);
        console.log("arrayStr: ");
        console.log(arrayStr);

        var j = 0;
        var elemArrayObj = {};
        var arrayStars = [];
        for (var i = 0; i < arrayStr.length; i++) {
            if (arrayStr[i] !== '') {
                if (j = 0) {
                    elemArrayObj.title = arrayStr[i].substring(7);
                    j++;
                    continue;
                }
                if (j = 1) {
                    elemArrayObj.releaseYear = arrayStr[i].substring(14);
                    j++;
                    continue;
                }
                if (j = 2) {
                    elemArrayObj.format = arrayStr[i].substring(8);
                    j++;
                    continue;
                }
                if (j = 3) {
                    arrayStars = arrayStr[i][3].substring(7).split(', ');
                    elemArrayObj.stars = arrayStars;
                    arrayStars = [];
                    j++;
                    continue;
                }
            } else {
                arrayObj.push(elemArrayObj);
                elemArrayObj = {};
                j = 0;
            }
        }
        // arrayStr.forEach(function(elem, i, array) {

        //     if (elem !== '') {
        //         if (j = 0) {
        //             elemArrayObj.title = elem.substring(7);
        //             j++;
        //             return;
        //         }
        //         if (j = 1) {
        //             elemArrayObj.releaseYear = elem.substring(14);
        //             j++;
        //             return;
        //         }
        //         if (j = 2) {
        //             elemArrayObj.format = elem.substring(8);
        //             j++;
        //             return;
        //         }
        //         if (j = 3) {
        //             arrayStars = elem[3].substring(7).split(', ');
        //             elemArrayObj.stars = arrayStars;
        //             arrayStars = [];
        //             j++;
        //             return;
        //         }
        //     } else {
        //         arrayObj.push(elemArrayObj);
        //         elemArrayObj = {};
        //         j = 0;
        //     }
        // });

        console.log("arrayObj: ");
        console.log(arrayObj);


        // db.uploadFilms(arrayObj).then((data) => res.send(data));
    });
});

//work's on not correct file
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

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then((data) => res.send(data));
});

app.delete('/films', (req, res) => {
    db.deleteAllFilms().then((data) => res.send(data));
});

const server = app.listen(serverPort, () => {
    console.log(`Server is run up on port ${serverPort}`);
});