import React from 'react';
import Upload from './Upload.jsx';

import FormErrors from './FormErrors.jsx';

import './FilmEditor.less';

const FilmEditor = React.createClass({
    getInitialState() {
        return {
            title: '',
            titleValid: false,
            releaseYear: '',
            releaseYearValid: false,
            format: '',
            formatValid: false,
            starsString: '',
            starsStringValid: false,
            formValid: false,
            formErrors: {
                title: {
                    title: 'Title',
                    error: ''                    
                },
                releaseYear: {
                    title: 'Release year',
                    error: ''                    
                },
                format: {
                    title: 'Format',
                    error: ''                    
                },
                starsString: {
                    title: 'Stars',
                    error: ''                    
                },
            },
            findByTitle: '',
            findByStars: ''
        };
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
        // this.setState({ findByStars: '' });
    },

    handleFindByStarsChange(event) {
        // this.setState({ findByStars: event.target.value });
        this.state.findByStars = event.target.value;
        this.handleFindByStars();
    },

    handleFindByTitle() {
        const title = this.state.findByTitle;
        this.props.onFindByTitle(title);
        // this.setState({ findByTitle: '' });
    },

    handleFindByTitleChange(event) {
        // this.setState({ findByTitle: event.target.value });
        this.state.findByTitle = event.target.value;
        this.handleFindByTitle();
    },

    // handleStarsChange(event) {
    //     this.setState({ starsString: event.target.value });
    // },

    // handleFormatChange(event) {
    //     this.setState({ format: event.target.value });
    // },

    // handleReleaseYearChange(event) {
    //     this.setState({ releaseYear: event.target.value });
    // },

    // handleTitleChange(event) {
    //     this.setState({ title: event.target.value });
    // },

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                    () => { this.validateField(name, value) });
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

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let releaseYearValid = this.state.releaseYearValid;
        let formatValid = this.state.formatValid;
        let starsStringValid = this.state.starsStringValid;


        formatValid = this.state.format.length > 0;
        fieldValidationErrors.format.error = formatValid  ? '' : ' is not selected';

        titleValid = this.state.title.length >= 1;
        fieldValidationErrors.title.error = titleValid ? '' : ' is too short';
              
        releaseYearValid = +this.state.releaseYear >= 1895; // year of release first film in world
        fieldValidationErrors.releaseYear.error = releaseYearValid ? '': ' is less than possible';
             
        
        starsStringValid = this.state.starsString.length >= 1;
        fieldValidationErrors.starsString.error = starsStringValid ? '': ' is too short';

        // switch(fieldName) {
        //     case 'title':
        //         titleValid = value.length >= 1;
        //         fieldValidationErrors.title = titleValid ? '' : ' is invalid';
        //         break;
        //     case 'releaseYear':
        //         releaseYearValid = value.length >= 4;
        //         fieldValidationErrors.releaseYear = releaseYearValid ? '': ' is too short';
        //         break;
        //     case 'format':
        //         formatValid = value.length > 0;
        //         fieldValidationErrors.format = formatValid  ? '' : ' is invalid';
        //         break;
        //     case 'starsString':
        //         starsStringValid = value.length >= 1;
        //         fieldValidationErrors.starsString = starsStringValid ? '': ' is too short';
        //         break;
        //     default:
        //         break;
        // };

        this.setState({formErrors: fieldValidationErrors,
                        titleValid: titleValid,
                        releaseYearValid: releaseYearValid,
                        formatValid: formatValid,
                        starsStringValid: starsStringValid
        }, this.validateForm);
    },

    validateForm() {
        this.setState({formValid: this.state.titleValid && this.state.releaseYearValid && this.state.formatValid && this.state.starsStringValid});
    },

    errorClass(error) {
        return(error.length === 0 ? '' : 'FilmEditor__has-error');
    },

    render() {
        return (
            <div className='FilmEditor'>
                <div className="FilmEditor__left">
                    <input 
                        type='text'
                        name='title'
                        className={`FilmEditor__title ${this.errorClass(this.state.formErrors.title.error)}`}
                        placeholder='Enter title'
                        value={this.state.title}
                        onChange={this.handleUserInput}
                    />
                    <input
                        type='number'
                        name='releaseYear'
                        className={`FilmEditor__title ${this.errorClass(this.state.formErrors.releaseYear.error)}`}
                        placeholder='Enter release year'
                        value={this.state.releaseYear}
                        onChange={this.handleUserInput}
                        min="1895"
                        max="2020"
                    />
                    <label className="FilmEditor__radio-button" style={(this.state.format === "VHS") ? {color: "#3ac569", fontWeight: "bold"} : {}}>
                        <input 
                            type="radio" 
                            value="VHS"  
                            name='format'
                            checked={this.state.format === "VHS"}
                            onChange={this.handleUserInput} 
                        />
                            VHS
                    </label>
                    <label className="FilmEditor__radio-button" style={(this.state.format === "DVD") ? {color: "#3ac569", fontWeight: "bold"} : {}}>
                        <input 
                            type="radio" 
                            value="DVD"  
                            name='format'
                            checked={this.state.format === "DVD"} 
                            onChange={this.handleUserInput} 
                        />
                            DVD
                    </label>
                    <label className="FilmEditor__radio-button" style={(this.state.format === "Blu-Ray") ? {color: "#3ac569", fontWeight: "bold"} : {}}>
                        <input 
                            type="radio" 
                            value="Blu-Ray"  
                            name='format'
                            checked={this.state.format === "Blu-Ray"} 
                            onChange={this.handleUserInput} 
                        />
                            Blu-Ray
                    </label>
                    
                    <textarea
                        placeholder='Enter stars'
                        name='starsString'
                        rows={5}
                        className={`FilmEditor__text ${this.errorClass(this.state.formErrors.starsString.error)}`}
                        value={this.state.starsString}
                        onChange={this.handleUserInput}
                    />
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <div className='FilmEditor__footer'>
                        <button
                            className='FilmEditor__button'
                            disabled={!this.state.formValid}
                            onClick={this.handleFilmAdd}
                            style={ !this.state.formValid ? {backgroundColor: "grey", cursor: "not-allowed"} : {}}
                        >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                            Add film
                        </button>
                    </div>
                </div>
                <div className="FilmEditor__right">
                    <div className="FilmEditor__find-by-title">
                        <div>
                            Find by title:
                        </div>
                        <input
                            type='text'
                            className='FilmEditor__title'
                            placeholder='Enter title'
                            value={this.state.findByTitle}
                            onChange={this.handleFindByTitleChange}
                        />
                        {/*<button
                            className='FilmEditor__button'
                            disabled={!this.state.findByTitle}
                            style={ !this.state.findByTitle ? {backgroundColor: "grey", cursor: "not-allowed"} : {}}
                            onClick={this.handleFindByTitle}
                        >
                        <i className="fa fa-search" aria-hidden="true"></i>
                            Find by title
                        </button>*/}
                    </div>
                    <br/>
                    <div className="FilmEditor__find-by-stars">
                        <div>
                            Find by star:
                        </div>
                        <input
                            type='text'
                            className='FilmEditor__title'
                            placeholder='Enter stars'
                            value={this.state.findByStars}
                            onChange={this.handleFindByStarsChange}
                        />
                        {/*<button
                            className='FilmEditor__button'
                            disabled={!this.state.findByStars}
                            onClick={this.handleFindByStars}
                            style={ !this.state.findByStars ? {backgroundColor: "grey", cursor: "not-allowed"} : {}}
                        >
                        <i className="fa fa-search" aria-hidden="true"></i>
                            Find by stars
                        </button>*/}
                    </div>
                    <div>
                        <Upload onStartUpload={this.onUploadFileDrop}></Upload>
                    </div>
                    {/*<div className="FilmEditor__additional-functions">
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
                    </div>*/}
                </div>
            </div>
        );
    }
});

export default FilmEditor;
