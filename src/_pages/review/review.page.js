import React from 'react'

import InstagramGallery from '../../_components/instagramGallery/InstagramGallery'

const INSTAGRAM_ID = "3468531814";
const THUMBNAIL_WIDTH = 640;
const PHOTO_COUNT = 30;

class ReviewPage extends React.Component {

    render() {
        return (
            <div>
                Review Page
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