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

    handleFindFilmByTitle(title) {
        FilmsActions.findFilmByTitle(title);
    },

    handleFindFilmByStars(stars) {
        FilmsActions.findFilmByStars(stars);
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

    test() {
        console.dir(FilmEditor)
    },

    render() {
        return (
            <div className='App'>
            <button onClick={this.test}>Test</button>
                <h2 className='App__header'>FilmsApp</h2>
                <FilmEditor onFilmAdd={this.handleFilmAdd} onFindByTitle={this.handleFindFilmByTitle} onFindByStars={this.handleFindFilmByStars} onUploadRequest={this.handleUploadRequest} onRefresh={this.handleRefresh} />
                <FilmsGrid films={this.state.films} onFilmDelete={this.handleFilmDelete} onDeleteAllFilms={this.handleDeleteAllFilms} onRefresh={this.handleRefresh} />
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
