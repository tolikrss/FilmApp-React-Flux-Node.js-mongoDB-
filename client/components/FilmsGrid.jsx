import React from 'react';
import Film from './Film.jsx';

import './FilmsGrid.less';

const FilmsGrid = React.createClass({

    getInitialState() {
        return {
            sort : 'title'
        };
    },

    handleRefresh() {
        this.props.onRefresh();
    },

    handleDeleteAllFilms() {
        this.props.onDeleteAllFilms();
    },

    handleSort(event) {
        this.state.sort = event.target.value;
        console.log('this.state.sort  = ' + this.state.sort);
        this.forceUpdate();
    },
    
    render() {
        var filmsList = this.props.films;
        if (this.state.sort === 'title') {
            filmsList.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {return 1;}
                if (a.title.toLowerCase() < b.title.toLowerCase()) {return -1;}
                return 0;
            });
        } else {
            filmsList.sort(function (a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {return 1;}
                if (a.title.toLowerCase() > b.title.toLowerCase()) {return -1;}
                return 0;
            });
        };

        if (filmsList.length === 0) {
            return <h1>Not films to display</h1>
        }

        return (
            <div>
                <div>
                    <span>Sort By: </span>
                    <label className="FilmEditor__radio-button" style={(this.state.sort === "title") ? {color: "#3ac569", fontWeight: "bold"} : {}}>
                        <input 
                            type="radio" 
                            value="title"  
                            name='sorting'
                            checked={this.state.sort === "title"}
                            onChange={this.handleSort} 
                            style = {{display: "none"}}
                        />
                            Title <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                    </label>
                    <label className="FilmEditor__radio-button" style={(this.state.sort === "titleDesc") ? {color: "#3ac569", fontWeight: "bold"} : {}}>
                        <input 
                            type="radio" 
                            value="titleDesc"  
                            name='sorting'
                            checked={this.state.sort === "titleDesc"} 
                            onChange={this.handleSort} 
                            style = {{display: "none"}}
                        />
                            Title <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                    </label>
                </div>
            <div className="FilmEditor__additional-functions">
                        <button
                            className='FilmEditor__clear-database__button'
                            onClick={this.handleDeleteAllFilms}
                        >
                        <i className="fa fa-window-close" aria-hidden="true"></i>
                            Delete all films
                        </button>
                        <button
                            className='FilmEditor__refresh-list__button'
                            onClick={this.handleRefresh}
                        >
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                            Refresh list (show all)
                        </button>
                    </div>
            <div
                className='FilmsGrid'
            >
                {
                    filmsList.map(film =>
                        <Film
                            key={film.id}
                            title={film.title}
                            releaseYear={film.releaseYear}
                            format={film.format}
                            stars={film.stars}
                            onDelete={this.props.onFilmDelete.bind(null, film)}
                        >
                        </Film>
                    )
                }
            </div>
            </div>
        );
    }
});

export default FilmsGrid;
