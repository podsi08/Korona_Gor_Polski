import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MountIcon from './MountIcon'

class Map extends Component {
    static defaultProps = {
        center: {lat: 50.00, lng: 19.50},
        zoom: 7
    };

    constructor(props) {
        super(props);

        this.state = {
            activeMountainId: -1
        }

        this.handleMountainClick = this.handleMountainClick.bind(this);
        this.renderIcons = this.renderIcons.bind(this);
    }

    handleMountainClick(id) {
        this.setState({
            activeMountainId: id
        });
        this.props.selectedMountainCallback(id);
    }

    renderIcons() {
        if (this.props.data) {
            return this.props.data.map((mountain) => {
                return (<MountIcon
                    key={mountain.id}
                    id={mountain.id}
                    lat={mountain.lat}
                    lng={mountain.lng}
                    onMountainClicked={this.handleMountainClick}/>);
            });
        }
    }

    render() {
        return (
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: ['AIzaSyDiPV4G6a1Nvo4VQcXBXh2-vsn_WcjE074'] }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>

                    {this.renderIcons()}

                </GoogleMapReact>
            </div>
        );
    }
}

export default Map