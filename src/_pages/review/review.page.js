import React from 'react'

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'

import PageHeader from '../../_components/pageHeader'
import InstagramGallery from '../../_components/instagramGallery/InstagramGallery'

// This can be retrieved with a GET https://www.instagram.com/web/search/topsearch/?context=blended&query=INSTAGRAM_USERNAME

// const INSTAGRAM_ID = "3468531814";
const INSTAGRAM_ID = "438757612";

const THUMBNAIL_WIDTH = 640;
const PHOTO_COUNT = 32;

class ReviewPage extends React.Component {

    render() {
        return (
            <div>
                <PageHeader
                    icon={null}
                    text='Reviews' >
                    <div>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <Button color='instagram' href='https://www.instagram.com/bcitsa/' target='_blank' size='large'>
                            <Icon name='instagram' />HomeSafe Instagram
                        </Button>
                    </div>
                </PageHeader>


                <InstagramGallery
                    userId={INSTAGRAM_ID}
                    thumbnailWidth={THUMBNAIL_WIDTH}
                    photoCount={PHOTO_COUNT}
                />

            </div>
        )
    }
}

export default ReviewPage