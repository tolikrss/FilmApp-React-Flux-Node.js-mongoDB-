import React from 'react';

import './Film.less';

const Film = React.createClass({
    render() {
        const style = { backgroundColor: "#fff" };

        return (
            <div className='Film' style={style}>
                <span className='Film__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.title
                    ?
                        <div className='Film__title'><span className='title'>Title:</span> <span className='content'>{this.props.title}</span></div>
                    :
                        null
                }
                {
                    this.props.releaseYear
                    ?
                        <div className='Film__releaseYear'><span className='title'>Release Year:</span> <span className='content'>{this.props.releaseYear}</span></div>
                    :
                        null
                }
                {
                    this.props.format
                    ?
                        <div className='Film__format'><span className='title'>Format:</span> <span className='content'>{this.props.format}</span></div>
                    :
                        null
                }
                {
                    this.props.format
                    ?
                        <div className='Film__stars'><span className='title'>Stars:</span> <span className='content'>{this.props.stars.join(', ')}</span></div>
                    :
                        null
                }
                <div className='Film__text'>{this.props.children}</div>
            </div>
        );
    }
});

export default Film;
