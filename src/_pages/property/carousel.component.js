import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react'

import * as images from '../../_constants/images'


class CarouselComponent extends React.Component {

    state = {
        modalOpen: false,
        //image array passed here are the strings stored in the database
        propertyImages: this.props.images,
        clickedImageIndex: -1
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    render() {

        let imageStyleBanner = { maxHeight: "300px", objectFit: "cover" };
        let imageArray = this.state.propertyImages;
        let items = [];
        let itemsLarge = [];
        let imageStyleLarge = { height: "100px", width: 'auto' };
        imageArray.forEach((img, key) => {
            items.push(
                <div key={key}>
                    <img src={img} style={imageStyleBanner} />
                </div>
            )
            itemsLarge.push(
                <div key={key}>
                    <img src={img} style={imageStyleLarge} />
                </div>
            )
        })

        const handelClickItem = (imageIndex) => {
            this.setState({ modalOpen: true, clickedImageIndex: imageIndex })
        }

        return (
            <div>
                <Carousel
                    showStatus={false}
                    showThumbs={false}
                    autoPlay={true}
                    onClickItem={e => handelClickItem(e)}
                >
                    {items}
                </Carousel>

                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size={'fullscreen'}
                >
                    <Modal.Header>
                        Detail Image
                    </Modal.Header>
                    <Modal.Content >
                        <Image wrapped size='huge' src={imageArray[this.state.clickedImageIndex]} />
                        {/* <Carousel
                            showStatus={true}
                            showThumbs={true}
                            autoPlay={false}
                            selectedItem={this.state.clickedImageIndex}
                            onClickItem={e => handelClickItem(e)}
                            style={{ height: '300px' }}
                        >
                            {itemsLarge}
                        </Carousel> */}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='grey' inverted onClick={_ => this.handleClose()}>
                            <Icon name='delete' /> Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default CarouselComponent;