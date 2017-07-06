import React from 'react';
import Film from './Film.jsx';

import Masonry from 'react-masonry-component';

import './FilmsGrid.less';

const FilmsGrid = React.createClass({
    render() {
        const masonryOptions = {
            itemSelector: '.Film',
            columnWidth: 1400,
            gutter: 5,
            isFitWidth: true
        };

        return (
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
        );
    }
});

export default FilmsGrid;
