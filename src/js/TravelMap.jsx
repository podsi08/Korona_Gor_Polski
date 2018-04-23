import React from "react";
import GoogleMapReact from 'google-map-react';
import TravelMountIcon from './TravelMountIcon';

class TravelMap extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            activeMountainId: -1

        }
    }

    static defaultProps = {
        center: {lat: 50.00, lng: 19.50},
        zoom: 7
    };

    changeActiveMountain = (id) => {
        this.setState({
            activeMountainId: id
        })
    };

    render() {
        let iconsRender = () => {
            if(this.props.data === false){
                return <p>...</p>
            } else {
                return (

                    this.props.data.map((elem) => {
                        return (<TravelMountIcon
                            key={elem.id}
                            name={elem.name}
                            lat={elem.lat}
                            lng={elem.lng}
                            clickFunction1={this.props.selectedMountainCallback}
                            clickFunction2={this.changeActiveMountain}
                            gained={this.props.gainedMountains.indexOf(elem.name) !== -1}
                        />);
                    })

                )
            }
        };

        return (
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: ['AIzaSyDiPV4G6a1Nvo4VQcXBXh2-vsn_WcjE074'] }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>

                    {iconsRender()}

                </GoogleMapReact>
            </div>
        );
    }
}

export default TravelMap