import React from 'react';
import Base64Converter from './base64-converter.js';

class ImageForm extends React.Component {

  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  getFiles(files){
    this.setState({ files: files })
  }

  render() {

    return (
      <div>
        <div className="text-center mt-25">
          <Base64Converter
            multiple={ true }
            onDone={ this.getFiles.bind(this) } />
        </div>

        <div className="text-center" id="imageContainer">
          { this.state.files.map((file,i) => {
            return <img key={i} src={file.base64} style={{maxWidth: 500}}/>
          }) }
          <img src="" />
        </div>

        { this.state.files.length != 0 ?
          <div>
            <h3 className="text-center mt-25">Callback Object</h3>
            <div className="pre-container">
              <pre>{ JSON.stringify(this.state.files, null, 2) }</pre>
            </div>
          </div>
        : null }

      </div>
    )

  }

}


export default ImageForm;