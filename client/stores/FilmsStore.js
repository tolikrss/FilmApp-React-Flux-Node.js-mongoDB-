import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _films = [];
let _loadingError = null;
let _isLoading = true;

function formatFilm(film) {
    return {
        id: film._id,
        title: film.title,
        releaseYear: film.releaseYear,
        format: film.format,
        stars: film.stars
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getFilms() {
        return _films;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action.type) {
        case AppConstants.LOAD_FILMS_REQUEST:
            {
                _isLoading = true;

                TasksStore.emitChange();
                break;
            }

        case AppConstants.LOAD_FILMS_SUCCESS:
            {
                _isLoading = false;
                _films = action.films.map(formatFilm);
                _loadingError = null;

                TasksStore.emitChange();
                break;
            }

        case AppConstants.LOAD_FILMS_FAIL:
            {
                _loadingError = action.error;

                TasksStore.emitChange();
                break;
            }

        default:
            {
                console.log('No such handler');
            }
    }
});

export default TasksStore;