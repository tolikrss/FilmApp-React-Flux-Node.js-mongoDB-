import React from 'react';

import FilmsStore from '../stores/FilmsStore';
import FilmsActions from '../actions/FilmsActions';

import FilmEditor from './FilmEditor.jsx';
import FilmsGrid from './FilmsGrid.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: FilmsStore.isLoading(),
        films: FilmsStore.getFilms()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        FilmsActions.loadFilms();
    },

    componentDidMount() {
        FilmsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        FilmsStore.removeChangeListener(this._onChange);
    },

    handleFilmDelete(film) {
        FilmsActions.deleteFilm(film.id);
    },

    handleFilmAdd(filmData) {
        FilmsActions.createFilm(filmData);
    },

    isStrNotEmpty(str) {
        for(var i = 0; i < str.length; i++) {
            if (str[i] !== ' ') {
                return true;
            }
        };
        return false;
    },

    handleFindFilmByTitle(title) {
        this.state.findByTitle = title;
        if(this.isStrNotEmpty(title)) {
            FilmsActions.findFilmByTitle(title);
        }
    },

    handleFindFilmByStars(stars) {
        this.state.findByStars = stars;
        if(this.isStrNotEmpty(stars)) {
            FilmsActions.findFilmByStars(stars);
        }
    },

    handleUploadRequest(file) {
        FilmsActions.uploadFile(file);
    },

    handleDeleteAllFilms() {
        FilmsActions.deleteAllFilms();
    },
    
    handleRefresh() {
        FilmsActions.refreshList();
    },

    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>FilmsApp</h2>
                <FilmEditor onFilmAdd={this.handleFilmAdd} onFindByTitle={this.handleFindFilmByTitle} onFindByStars={this.handleFindFilmByStars} onUploadRequest={this.handleUploadRequest} onRefresh={this.handleRefresh} />
                <FilmsGrid findByStars={this.state.findByStars} findByTitle={this.state.findByTitle}  films={this.state.films} onFilmDelete={this.handleFilmDelete} onDeleteAllFilms={this.handleDeleteAllFilms} onRefresh={this.handleRefresh} />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
