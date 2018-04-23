import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MountIcon from './MountIcon';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMountainId: -1
        };
    }

    static defaultProps = {
        mapConfig: {
            center: {lat: 50.00, lng: 19.50},
            zoom: 7
        }
    };

    //po kliknięciu w ikonę zmienia się id aktywnej góry porównywane w props MountIcon active
    handleMountainClick = (id) => {
        this.setState({
            activeMountainId: id
        });
        if (typeof this.props.selectedMountainCallback === 'function') {
            this.props.selectedMountainCallback(id);
        }
    };

    iconsRender = () => {
        return this.props.data.map((mountain) =>
            <MountIcon
            key={mountain.id}
            id={mountain.id}
            lat={mountain.latitude}
            lng={mountain.longitude}
            active={this.state.activeMountainId === mountain.id}
            onMountainClicked={this.handleMountainClick}/>)
    };

    render() {
        return (
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: ['AIzaSyDiPV4G6a1Nvo4VQcXBXh2-vsn_WcjE074'] }}
                    defaultCenter={this.props.mapConfig.center}
                    defaultZoom={this.props.mapConfig.zoom}>

                    {this.iconsRender()}

                </GoogleMapReact>
            </div>
        );
    }
}

export default Map



