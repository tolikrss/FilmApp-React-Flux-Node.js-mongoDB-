import React from 'react';
import Dropzone from 'react-dropzone';

import './Upload.less';

const Upload = React.createClass({
    getInitialState() {
        return {
            files: []
        };
    },

    onDrop(files) {
        console.log('onDrop() worked');
        this.state.files = files;
        console.log('Upload.state.files:');
        console.dir(this.state.files);
    },

    handleStartUpload() {
        console.log('handleStartUpload() worked');
        this.props.onFileDrop(this.state.files[0]);
        this.state.files = [];
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
                        <h2 className="upload__list-header">List:</h2>
                        {/*<h2 className="upload__list-header">{(!!this.state.files.length) ? "File to upload:" : ""}</h2>*/}
                        <ul className="upload__list">
                        {/*{
                            this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                        }*/}
                        {
                            this.state.files.forEach(function(element) {
                                return element.name
                            })
                        }
                        </ul>
                    </div>
                </section>
                <div>
                    <button
                        className='Upload__button'
                        disabled={!this.state.files.length}
                        onClick={this.handleStartUpload}
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
