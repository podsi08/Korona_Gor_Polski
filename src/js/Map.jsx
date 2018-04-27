import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MountIcon from './MountIcon';

class Map extends Component {
    static defaultProps = {
        mapConfig: {
            center: {lat: 50.00, lng: 19.50},
            zoom: 7
        }
    };

    //po kliknięciu w ikonę zmienia się id aktywnej góry porównywane w props MountIcon active
    handleMountainClick = (id) => {
        if (typeof this.props.selectedMountainCallback === 'function') {
            this.props.selectedMountainCallback(id);
        }
    };

    renderIcons = () => {
        return this.props.data.map((mountain) =>
            <MountIcon
            key={mountain.id}
            id={mountain.id}
            name={mountain.name}
            lat={mountain.latitude}
            lng={mountain.longitude}
            active={this.props.selectedMountain !== null && this.props.selectedMountain.id === mountain.id}
            onMountainClicked={this.handleMountainClick}/>)
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

export default Map



