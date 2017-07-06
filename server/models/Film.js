import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number },
    format: { type: String },
    stars: { type: Array }
});

const Film = mongoose.model('Film', FilmSchema);