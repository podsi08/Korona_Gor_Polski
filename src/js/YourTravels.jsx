import React from 'react';
import Form from "./Form";
import TravelMap from './TravelMap';
import TravelDescription from './TravelDescription';

class YourTravels extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            storage: null,
            data: [],
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
                    <Form data={this.state.data} gainedMountains={this.state.gainedMountains}/>
                </div>

            </div>

        )
    }
}

export default YourTravels;


