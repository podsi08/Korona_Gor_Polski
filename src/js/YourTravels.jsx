import React from 'react';
import Form from "./Form";
import TravelDescription from './TravelDescription.jsx';
import TravelMap from './TravelMap.jsx';
import Mountain from './model/Mountain.js';

class YourTravels extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMountain: null,
            travels: [],
            mountains: [],
            gainedMountains: []
        }

        this.changeTravelDescription = this.changeTravelDescription.bind(this);
    }

    componentDidMount() {
        fetch(this.props.mountainsDataUri).then(response => {
            return response.json()
        }).then(data => {
            const mountains = data.map(mountainData => Mountain.fromServerData(mountainData));
            const travels = JSON.parse(localStorage.getItem(this.props.localStorageKey)) || [];
            this.setState({
                mountains: mountains,
                travels: travels,
                gainedMountains: mountains.filter(mountain => travels.map(travel => travel.name).indexOf(mountain.name) !== -1).map(mountain => mountain.id)
            });
        });

    }

    changeTravelDescription(id) {
        const clickedObjectData = this.state.mountains.find(mountain => {
            return id === mountain.id;
        });

        if (typeof clickedObjectData !== 'undefined') {
            this.setState({
                selectedMountain: clickedObjectData
            });
        }
    }

    render() {
        const travel = this.state.selectedMountain != null ?
            this.state.travels.find(travel => travel.name === this.state.selectedMountain.name) || null :
            null;

        return(
            <div className='container animated slideInRight'>
                <h1>Twoje podróże</h1>
                <div className='map_container'>
                    <TravelMap
                        mountains={this.state.mountains}
                        gainedMountains={this.state.gainedMountains}
                        selectedMountainCallback={this.changeTravelDescription}/>
                    <TravelDescription
                        mountain={this.state.selectedMountain}
                        travel={travel}
                        prompt='Wybierz górę'
                        motivationMessage='Góra jeszcze niezdobyta... Nie patrz już w ten monitor i zrób coś z tym!'/>
                    <Form/>
                </div>
            </div>
        );
    }
}

export default YourTravels
