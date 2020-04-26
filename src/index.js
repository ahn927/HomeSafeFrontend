import React from "react";
import ReactDOM from "react-dom";

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
                <h1>your location is :</h1>
                <h3>lat: {this.state.lat} <br /> long:{this.state.long}</h3>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));