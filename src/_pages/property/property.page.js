import React from 'react'

import CarouselComponent from './carousel.component'

class PropertyPage extends React.Component {

    // state = {
    //     propertyId: null
    // }

    // componentDidMount() {
    //     let { id } = useParams();
    //     this.setState({ propertyId: id });
    // }

    render() {
        return (
            <div>
                <CarouselComponent />
                <h1>individual list, {this.props.match.params.id}</h1>
            </div>

        )
    }
}

export default PropertyPage;