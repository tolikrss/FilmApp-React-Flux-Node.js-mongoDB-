import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const FilmActions = {

    deleteAllFilms() {
        api.clearDB()
            .then(() => 
                this.loadFilms()
            )
            .catch((err) =>
                console.error(err)
            );
    },

    uploadFile(file) {
        api.uploadFile(file) 
            .then(() => 
                this.loadFilms()
            )
            .catch((err) =>
                console.error(err)
            );
    },

    loadFilms() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_FILMS_REQUEST
        });

        api.listFilms()
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    createFilm(film) {
        api.createFilm(film)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    },

    findFilmByTitle(title) {
        api.listFindByTitleFilms(title)
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    findFilmByStars(stars) {
        api.listFindByStarsFilms(stars)
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    deleteFilm(filmId) {
        api.deleteFilm(filmId)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    },

    refreshList() {
        this.loadFilms()
    }
};

export default FilmActions;