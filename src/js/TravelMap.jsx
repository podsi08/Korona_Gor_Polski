import React from 'react';
import GoogleMapReact from 'google-map-react';
import TravelMountIcon from './TravelMountIcon.jsx';

class TravelMap extends React.Component {
    static defaultProps = {
        mapConfig: {
            center: {lat: 50.00, lng: 19.50},
            zoom: 7
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            activeMountainId: -1
        }

        this.changeActiveMountain = this.changeActiveMountain.bind(this);
        this.renderIcons = this.renderIcons.bind(this);
    }

    changeActiveMountain(id) {
        this.setState({
            activeMountainId: id
        });
        if (typeof this.props.selectedMountainCallback === 'function') {
            this.props.selectedMountainCallback(id);
        }
    }

    renderIcons() {
        return this.props.mountains.map(mountain =>
            <TravelMountIcon
                key={mountain.id}
                id={mountain.id}
                name={mountain.name}
                lat={mountain.latitude}
                lng={mountain.longitude}
                onMountainClicked={this.changeActiveMountain}
                gained={this.props.gainedMountains.indexOf(mountain.id) !== -1}/>
        );
    }

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

export default TravelMap;
