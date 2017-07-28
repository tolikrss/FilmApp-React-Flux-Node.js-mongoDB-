'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FilmSchema = new Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number },
    format: { type: String },
    stars: { type: Array }
});

var Film = _mongoose2.default.model('Film', FilmSchema);