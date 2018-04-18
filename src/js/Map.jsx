import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mountainRed from '../images/mountain-red.png';
import mountainGreen from '../images/mountain-green.png';


class MountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction === 'function'){
            this.props.clickFunction(this.props.id)
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className='mount_icon'

                />
        )
    }
}

class Map extends Component {
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

    render() {
        let iconsRender = () => {
            if(this.props.data === false){
                return <p>...</p>
            } else {
                return (

                    this.props.data.map((elem) => {
                        return (<MountIcon
                            key={elem.id}
                            id={elem.id}
                            lat={elem.lat}
                            lng={elem.lng}
                            clickFunction={this.props.selectedMountainCallback}
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

export default Map



