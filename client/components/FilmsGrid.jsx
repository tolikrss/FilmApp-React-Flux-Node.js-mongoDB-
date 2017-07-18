import React from 'react';
import Film from './Film.jsx';

import Masonry from 'react-masonry-component';

import './FilmsGrid.less';

const FilmsGrid = React.createClass({

    handleRefresh() {
        this.props.onRefresh();
    },

    handleDeleteAllFilms() {
        this.props.onDeleteAllFilms();
    },
    
    render() {
        const masonryOptions = {
            itemSelector: '.Film',
            columnWidth: 1400,
            gutter: 5,
            isFitWidth: true
        };

        return (
            <div>
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
            <Masonry
                className='FilmsGrid'
                options={masonryOptions}
            >
                {
                    this.props.films.map(film =>
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
            </Masonry>
            </div>
        );
    }
});

export default FilmsGrid;
