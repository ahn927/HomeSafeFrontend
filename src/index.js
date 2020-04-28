import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";

class App extends React.Component {
    state = {
        lat: null,
        long: null,
        errorMessage: null
    };

    
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude });
                this.setState({ long: position.coords.longitude });
            }
        )
    }

    render() {
        return (
            <div>
                <Map/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));