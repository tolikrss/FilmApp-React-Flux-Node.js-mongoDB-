import React from 'react';
import Dropzone from 'react-dropzone';

import './Upload.less';

const Upload = React.createClass({
    getInitialState() {
        return {
            files: [],
            uploadValid: false,
            uploadElementsLengthTrue: false
        };
    },

    filesValid() {
        let files = this.state.files;

        if(files.length === 1) {
            this.state.uploadElementsLengthTrue = true;
            for (var i = 0; i < files.length; i++) {
                if(files[i].type !== "text/plain") {
                    return this.setState({uploadValid: false});
                } else {
                   this.setState({uploadValid: true});
                }
            };
        } else {
            this.setState({uploadValid: false, uploadElementsLengthTrue: false});
        }        
    },

    onDrop(files) {
        this.state.files = files;
        console.dir(files[0]);
        this.filesValid();
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
                        <h2 className="upload__list-header">{(!!this.state.files.length) ? (
                            (() => {
                                if (!this.state.uploadElementsLengthTrue) {
                                    return <div><p><i className='fa fa-exclamation-triangle' aria-hidden='true'></i> You may select only one file </p></div>
                                } else {
                                    return <p>File to upload:</p>
                                }
                                
                            })()
                            
                        ) : "File not selected"}</h2>
                        
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
                                                    ("")
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
