import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mountainRed from '../images/mountain-red.png'

const MountIconComponent = () => <img className='mount_icon' src={mountainRed}/>;

class Map extends Component {
    static defaultProps = {
        center: {lat: 50.00, lng: 19.50},
        zoom: 7
    };

    constructor(props){
        super(props);

        this.state = {
            data: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/mountains').then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                data: data
            })
            console.log(data);
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        let iconsRender = () => {
            if(this.state.data === false){
                return <p>...</p>
            } else {
                return (

                    this.state.data.map((elem) => {
                        return (
                            <MountIconComponent
                                key={elem.id}
                                lat={elem.lat}
                                lng={elem.lng}
                            />
                        )
                    })

                )
            }
        };

        return (
            <div className='container animated slideInRight'>
                <h1>Mapy</h1>
                <div className='map'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: ['AIzaSyDiPV4G6a1Nvo4VQcXBXh2-vsn_WcjE074'] }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}>

                        {iconsRender()}

                    </GoogleMapReact>
                </div>
            </div>

        );
    }
}

export default Map


