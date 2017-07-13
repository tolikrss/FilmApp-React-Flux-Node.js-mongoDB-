import React from 'react';
import Dropzone from 'react-dropzone';

import './Upload.less';

const Upload = React.createClass({
    getInitialState() {
        return {
            files: [],
            uploadValid: false
        };
    },

    onDrop(files) {
        this.state.files = files;
        console.dir(files[0]);
        this.forceUpdate();
    },

    handleStartUpload() {
        this.props.onStartUpload(this.state.files[0]);
        this.state.files = [];
        this.state.uploadValid = false;
    },

    render() {
        return (
            <div>
                <section className="upload">
                    <div className="upload__dropzone">
                    <Dropzone style={{}} onDrop={this.onDrop}>
                        <p>Dropp some file here, or click to select file to upload.</p>
                    </Dropzone>
                    </div>
                    <div>
                        <h2 className="upload__list-header">{(!!this.state.files.length) ? "File to upload:" : "File not selected"}</h2>
                        
                        <ul className="upload__list">
                            {
                                this.state.files.map((f, i) =>
                                    <li key={i}>
                                        <p>{f.name} - {f.size} bytes</p>
                                        <p>
                                            {
                                                (f.type !== "text/plain") ? 
                                                    (
                                                        (
                                                            () => {
                                                                this.state.uploadValid = false;
                                                                return <span><i className='fa fa-exclamation-triangle' aria-hidden='true'></i> Incorrect file type, must be .txt </span>
                                                            }
                                                        )()
                                                    )
                                                    :
                                                    (
                                                        (() => {
                                                            this.state.uploadValid = true;
                                                        })()
                                                    )
                                            }
                                        </p>
                                    </li>
                                )
                                
                            }
                        </ul>
                    </div>
                </section>
                <div>
                    <button
                        className='Upload__button'
                        disabled={!this.state.uploadValid}
                        onClick={this.handleStartUpload}
                        style={ !this.state.uploadValid ? {backgroundColor: "grey", cursor: "not-allowed"} : {}}
                    >
                    <i className="fa fa-upload" aria-hidden="true"></i>
                        Upload
                    </button>
                </div>
            </div>
        );
    }
});

export default Upload;
