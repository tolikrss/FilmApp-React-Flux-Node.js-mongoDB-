import React from 'react';
import Upload from './Upload.jsx';

import './FilmEditor.less';

const FilmEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            releaseYear: '',
            format: '',
            starsString: '',
            findByTitle: '',
            findByStars: ''
        };
    },

    handleRefresh() {
        this.props.onRefresh();
    },

    handleDeleteAllFilms() {
        this.props.onDeleteAllFilms();
    },

    handleFileUpload(e) {
        const file = e.target.files[0];
        this.props.onUploadRequest(file);
    },
    onUploadFileDrop(file) {
        this.props.onUploadRequest(file);
    },

    handleFindByStars() {
        const stars = this.state.findByStars;
        this.props.onFindByStars(stars);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
    },

    handleFindByStarsChange(event) {
        this.setState({ findByStars: event.target.value });
    },

    handleFindByTitle() {
        const title = this.state.findByTitle;
        this.props.onFindByTitle(title);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
    },

    handleFindByTitleChange(event) {
        this.setState({ findByTitle: event.target.value });
    },

    handleStarsChange(event) {
        this.setState({ starsString: event.target.value });
    },

    handleFormatChange(event) {
        this.setState({ format: event.target.value });
    },

    handleReleaseYearChange(event) {
        this.setState({ releaseYear: event.target.value });
    },

    handleTitleChange(event) {
        if (event.target.value.length > 0) {
           event.target.style.borderColor = "red"; // do something
        }
        console.dir(event.target.style.borderColor);
        this.setState({ title: event.target.value });
    },

    handleFilmAdd() {
        const newFilm = {
            title: this.state.title,
            releaseYear: this.state.releaseYear,
            format: this.state.format,
            stars: this.state.starsString.split(',')
        };
        this.props.onFilmAdd(newFilm);
        this.setState({ title: '', releaseYear: '', format: '', starsString: '', findByTitle: '', findByStars: '' });
    },

    render() {
        return (
            <div className='FilmEditor'>
                <div className="FilmEditor__left">
                    <input
                        type='text'
                        className='FilmEditor__title'
                        placeholder='Enter title'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <input
                        type='number'
                        className='FilmEditor__title'
                        placeholder='Enter release year'
                        value={this.state.releaseYear}
                        onChange={this.handleReleaseYearChange}
                        min="1895"
                        max="2020"
                    />
                    <label className="FilmEditor__radio-button">
                        <input 
                            type="radio" 
                            value="VHS"  
                            checked={this.state.format === "VHS"} 
                            onChange={this.handleFormatChange} 
                        />
                            VHS
                    </label>
                    <label className="FilmEditor__radio-button">
                        <input 
                            type="radio" 
                            value="DVD"  
                            checked={this.state.format === "DVD"} 
                            onChange={this.handleFormatChange} 
                        />
                            DVD
                    </label>
                    <label className="FilmEditor__radio-button">
                        <input 
                            type="radio" 
                            value="Blu-Ray"  
                            checked={this.state.format === "Blu-Ray"} 
                            onChange={this.handleFormatChange} 
                        />
                            Blu-Ray
                    </label>
                    
                    <textarea
                        placeholder='Enter stars'
                        rows={5}
                        className='FilmEditor__text'
                        value={this.state.starsString}
                        onChange={this.handleStarsChange}
                    />

                    <div className='FilmEditor__footer'>
                        <button
                            className='FilmEditor__button'
                            disabled={!this.state.title}
                            onClick={this.handleFilmAdd}
                        >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                            Add film
                        </button>
                    </div>
                </div>
                <div className="FilmEditor__right">
                    <div className="FilmEditor__find-by-title">
                        <input
                            type='text'
                            className='FilmEditor__title'
                            placeholder='Enter title'
                            value={this.state.findByTitle}
                            onChange={this.handleFindByTitleChange}
                        />
                        <button
                            className='FilmEditor__button'
                            disabled={!this.state.findByTitle}
                            onClick={this.handleFindByTitle}
                        >
                        <i className="fa fa-search" aria-hidden="true"></i>
                            Find by title
                        </button>
                    </div>
                    <br/>
                    <div className="FilmEditor__find-by-stars">
                        <input
                            type='text'
                            className='FilmEditor__title'
                            placeholder='Enter stars'
                            value={this.state.findByStars}
                            onChange={this.handleFindByStarsChange}
                        />
                        <button
                            className='FilmEditor__button'
                            disabled={!this.state.findByStars}
                            onClick={this.handleFindByStars}
                        >
                        <i className="fa fa-search" aria-hidden="true"></i>
                            Find by stars
                        </button>
                    </div>
                    <div>
                        {/*<label className="FilmEditor__file-label">
                            <input  className="FilmEditor__inputfile" type="file" onChange={this.handleFileUpload} />    
                            <i className="fa fa-upload" aria-hidden="true"></i>
                                Choose a file to upload
                        </label>*/}
                        <Upload onStartUpload={this.onUploadFileDrop}></Upload>
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
                </div>
            </div>
        );
    }
});

export default FilmEditor;
