import React from 'react';
import GoogleMapReact from 'google-map-react';
import Form from "./Form";

class YourTravels extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            storage: null,
            data: false,
            name: 'Wybierz górę',
            range: '',
            height: '',
            date: '',
            note: '',
            gainedMountains: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/mountains').then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            this.setState({
                data: data
            });
            console.log(data);
        }).catch(err => {
            console.log(err)
        });

        this.setState({
            storage: JSON.parse(localStorage.getItem('korona_gor'))
        }, () => {
            this.setState({
                gainedMountains: this.state.storage === null ? [] : this.state.storage.map(elem => elem.name)
            })
        })
    }

    changeTravelDescription = (name) => {
        let clickedObjectTravelData = this.state.storage.filter((elem) => {
            return name === elem.name;
        });

        let clickedObjectData = this.state.data.filter((elem) => {
            return name === elem.name;
        });

        let mountain = {
            name: clickedObjectData[0].name,
            range: clickedObjectData[0].range,
            height: clickedObjectData[0].height + 'm n.p.m.',
        };

        if (clickedObjectTravelData.length === 0) {
            mountain.date = "";
            mountain.note = "Góra jeszcze niezdobyta... Nie patrz już w ten monitor i zrób coś z tym!";
        } else {
            mountain.date = `Data zdobycia: ${clickedObjectTravelData[0].date}`;
            mountain.note = clickedObjectTravelData[0].note;

        }

        this.setState({
            name: mountain.name,
            range: mountain.range,
            height: mountain.height,
            date: mountain.date,
            note: mountain.note
        })
    };

    render(){
        return(
            <div className='container animated slideInRight'>
                <h1>Twoje podróże</h1>
                <div className='map_container'>

                    <TravelMap data={this.state.data}
                               gainedMountains={this.state.gainedMountains}
                         selectedMountainCallback={this.changeTravelDescription}
                    />
                    <TravelDescription name={this.state.name}
                                     range={this.state.range}
                                     height={this.state.height}
                                     date={this.state.date}
                                     note={this.state.note}/>
                    <Form/>
                </div>

            </div>

        )
    }
}

class TravelMountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction1 === 'function' && typeof this.props.clickFunction2 === 'function'){
            this.props.clickFunction1(this.props.name);
            this.props.clickFunction2(this.props.name);
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.props.gained ? 'mount_icon_gained' : 'mount_icon_deactive'}/>
        )
    }
}

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

class TravelDescription extends React.Component {
    render(){
        return(
            <div className='description'>
                <h1>{this.props.name}</h1>
                <h3>{this.props.range}</h3>
                <h3>{this.props.height}</h3>
                <h3>{this.props.date}</h3>
                <span>{this.props.note}</span>
            </div>
        )
    }
}

export default YourTravels