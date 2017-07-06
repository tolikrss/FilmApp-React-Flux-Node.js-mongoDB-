import mongoose from 'mongoose';

import '../models/Film';

import config from '../../etc/config.json';

const Film = mongoose.model('Film');

export function setUpConnection() { 
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listFilms() { 
    return Film.find().sort({ title: 1 }); 
} 

export function listFilmsFindTitle(param) { 
    return Film.find({ title: { $regex: param } }).sort({ title: 1 }); 
} 

export function listFilmsFindStars(param) {
    return Film.find({ stars: { $regex: param } }).sort({ title: 1 });
} 

export function createFilm(data) { 
    const film = new Film({
        title: data.title,
        releaseYear: data.releaseYear,
        format: data.format,
        stars: data.stars
    });

    return film.save(); 
}

export function uploadFilms(films) { 

    for (var i = 0; i < films.length - 1; i++) {
        const film = new Film({
            title: films[i].title,
            releaseYear: films[i].releaseYear,
            format: films[i].format,
            stars: films[i].stars
        });
        film.save();
    };

    const film = new Film({
        title: films[films.length - 1].title,
        releaseYear: films[films.length - 1].releaseYear,
        format: films[films.length - 1].format,
        stars: films[films.length - 1].stars
    });

    return film.save(); 
}

export function deleteFilm(id) { 
    return Film.findById(id).remove();
}

export function deleteAllFilms() { 
    return Film.remove({});
}

//если нет созданой базы, то при запросе она создастся