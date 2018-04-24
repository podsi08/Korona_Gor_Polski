import React from "react";
import GoogleMapReact from 'google-map-react';
import TravelMountIcon from './TravelMountIcon';

class TravelMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMountainName: ''
        };
    }

    static defaultProps = {
        mapConfig: {
            center: {lat: 50.00, lng: 19.50},
            zoom: 7
        }
    };

    renderIcons = () => {
        return this.props.data.map((mountain) =>
            <TravelMountIcon
                key={mountain.id}
                name={mountain.name}
                lat={mountain.latitude}
                lng={mountain.longitude}
                active={this.state.activeMountainName === mountain.name}
                gained={this.props.gainedMountains.indexOf(mountain.name) !== -1}
                onMountainClicked={this.handleMountainClick}
            />)
    };

    handleMountainClick = (name) => {
        this.setState({
            activeMountainName: name
        });
        if (typeof this.props.selectedMountainCallback === 'function') {
            this.props.selectedMountainCallback(name);
        }
    };

    render() {
        return (
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: ['AIzaSyDiPV4G6a1Nvo4VQcXBXh2-vsn_WcjE074'] }}
                    defaultCenter={this.props.mapConfig.center}
                    defaultZoom={this.props.mapConfig.zoom}>

                    {this.renderIcons()}

                </GoogleMapReact>
            </div>
        );
    }
}

export default TravelMap