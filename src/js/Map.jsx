import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class MountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction1 === 'function' && typeof this.props.clickFunction2 === 'function'){
            this.props.clickFunction1(this.props.id);
            this.props.clickFunction2(this.props.id);
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.props.active ? 'mount_icon_active' : 'mount_icon_deactive'}/>
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
                        return (<MountIcon
                            key={elem.id}
                            id={elem.id}
                            lat={elem.lat}
                            lng={elem.lng}
                            clickFunction1={this.props.selectedMountainCallback}
                            clickFunction2={this.changeActiveMountain}
                            active={this.state.activeMountainId === elem.id}
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



