import React from 'react';

export default class Base64Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    addImage(e) {
        //store the image
        let files = e.target.files;

        var allImages = [];
        for(var i = 0; i < files.length; ++i) {

            let image = files[i];

            let read = new FileReader();

            read.readAsDataURL(image);

            read.onload = () => {

                let imageInfo = {
                    name: image.name,
                    type: image.type,
                    base64: read.result,
                    image: image
                }

                allImages.push(imageInfo);

                if(allImages.length == files.length){
                    // Apply Callback function
                    if(this.props.multiple) this.props.onDone(allImages);
                    else this.props.onDone(allImages[0]);
                  }
            }
        }
    }

    render() {
        return (
          <input
            type="file"
            onChange={ this.addImage.bind(this) }
            multiple={ this.props.multiple } />
        );
      }
}

Base64Converter.defaultProps = {
    multiple: false,
};