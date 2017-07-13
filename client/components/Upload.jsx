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
        console.dir(this.state.files);
        this.props.onFileDrop(this.state.files[0]);
    },

    render() {
        return (
        <section className="upload">
            <div className="upload__dropzone">
            <Dropzone style={{}} onDrop={this.onDrop}>
                <p>Dropp some file here, or click to select file to upload.</p>
            </Dropzone>
            </div>
            <aside>
                <h2 className="upload__list-header">{(!!this.state.files.length) ? "File to upload:" : ""}</h2>
                <ul className="upload__list">
                {
                    this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                }
                </ul>
            </aside>
        </section>
        );
    }
});

export default Upload;
