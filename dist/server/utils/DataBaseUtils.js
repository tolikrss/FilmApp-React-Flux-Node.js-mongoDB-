'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUpConnection = setUpConnection;
exports.listFilms = listFilms;
exports.listFilmsFindTitle = listFilmsFindTitle;
exports.listFilmsFindStars = listFilmsFindStars;
exports.createFilm = createFilm;
exports.uploadFilms = uploadFilms;
exports.deleteFilm = deleteFilm;
exports.deleteAllFilms = deleteAllFilms;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/Film');

var _config = require('../../etc/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Film = _mongoose2.default.model('Film');

function setUpConnection() {
    _mongoose2.default.connect('mongodb://' + _config2.default.db.dbuser + ':' + _config2.default.db.dbpassword + '@ds111103.mlab.com:11103/filmsapp');
    // mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`); //for local DB
}

function listFilms() {
    return Film.find().sort({ title: 1 });
}

function listFilmsFindTitle(param) {
    var paramArr = param.split('');
    var paramStr = '';

    while (paramArr[paramArr.length - 1] === ' ') {
        paramArr.splice(paramArr.length - 1, 1);
    }
    while (paramArr[0] === ' ') {
        paramArr.splice(0, 1);
    }
    paramStr = paramArr.join('');

    return Film.find({
        title: { $regex: new RegExp(paramStr.toLowerCase(), "i") }
    }).sort({ title: 1 });
}

function listFilmsFindStars(param) {
    var paramArr = param.split('');
    var paramStr = '';

    while (paramArr[paramArr.length - 1] === ' ') {
        paramArr.splice(paramArr.length - 1, 1);
    }
    while (paramArr[0] === ' ') {
        paramArr.splice(0, 1);
    }
    paramStr = paramArr.join('');

    return Film.find({
        stars: { $regex: new RegExp(paramStr.toLowerCase(), "i") }
    }).sort({ title: 1 });
}

function createFilm(data) {
    var film = new Film({
        title: data.title,
        releaseYear: data.releaseYear,
        format: data.format,
        stars: data.stars
    });

    return film.save();
}

function uploadFilms(films) {

    for (var i = 0; i < films.length - 1; i++) {
        var _film = new Film({
            title: films[i].title,
            releaseYear: films[i].releaseYear,
            format: films[i].format,
            stars: films[i].stars
        });
        _film.save();
    };

    var film = new Film({
        title: films[films.length - 1].title,
        releaseYear: films[films.length - 1].releaseYear,
        format: films[films.length - 1].format,
        stars: films[films.length - 1].stars
    });

    return film.save();
}

function deleteFilm(id) {
    return Film.findById(id).remove();
}

function deleteAllFilms() {
    return Film.remove({});
}

//если нет созданой базы, то при запросе она создастся