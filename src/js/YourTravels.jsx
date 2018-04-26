import React from 'react';
import Form from "./Form";
import TravelMap from './TravelMap';
import TravelDescription from './TravelDescription';
import Travel from './model/Travel';
import Mountain from './model/Mountain';

class YourTravels extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMountain: null,
            mountains: [],
            travels: [],
            gainedMountains: []
        }
    }

    getDataFromLocalStorage = () => {
        if(JSON.parse(localStorage.getItem('korona_gor')) === null) {
            return []
        } else {
            console.log(JSON.parse(localStorage.getItem('korona_gor')))
            return JSON.parse(localStorage.getItem('korona_gor'))
        }
    };

    componentDidMount(){
        console.log('Your Travel DidMount');
        //pobieram dane z serwera
        fetch('http://localhost:3001/mountains').then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            this.setState({
                //z pobranych danych tworzę obiekty Mountain wg modelu w ./model/Mountain.js
                mountains: data.map(mountain => new Mountain(
                    mountain.id,
                    mountain.name,
                    mountain.height,
                    mountain.lng,
                    mountain.lat,
                    mountain.range,
                    mountain.description
                ))
            });
        });

        //pobieram dane z local storage
        let storageTravels = this.getDataFromLocalStorage();

        //z danych z local storage tworzę obiekty Travel wg modelu w ./model/Travel.js oraz tablicę z nazwami zdobytych gór
        this.setState({
            travels: storageTravels,
            gainedMountains: storageTravels.map(travel => travel.mountain)
        })
    }

    //funkcja wykona się po kliknięciu w ikonę na mapie, zmienia się selectedMountain przekazywane do Description
    // w props jako mountain
    selectMountain = (name) => {
        let clickedMountain = this.state.mountains.find(mount => {
            return name === mount.name;
        });

        if(typeof clickedMountain !== 'undefined'){
            this.setState({
                selectedMountain: clickedMountain
            });
        }
    };

    //funkcja zapisująca do local storage
    saveToLocalStorage = (data) => {
        localStorage.setItem('korona_gor', JSON.stringify(data));
    };

    //funkcja usuwająca notatkę
    deleteNote = (name) => {
        //filtruję obiekty z local storage i tworzę nową tablicę bez usuniętego obiektu
        let newStorageData = this.state.travels.filter((travel) => {
            return travel.mountain !== name
        });

        //nadpisuję local storage
        this.saveToLocalStorage(newStorageData);

        //ustalam nowy stan -> po usunięciu notatki opis wycieczki zmieni się od razu na wiadomość motywacyjną
        this.setState({
            travels: newStorageData
        })


    };

    render(){
        //po wybraniu góry travel zwróci obiekt opisujący wycieczkę lub gdy góra jeszcze niezdobyta 'undefined'
        let travel = this.state.selectedMountain !== null &&
                    this.state.travels.find(travel => travel.mountain === this.state.selectedMountain.name);

        return(
            <div className='container animated slideInRight'>
                <h1>Twoje podróże</h1>
                <div className='map_container'>

                    <TravelMap data={this.state.mountains}
                        selectedMountainCallback={this.selectMountain}
                        gainedMountains={this.state.gainedMountains}
                    />
                    <TravelDescription mountain={this.state.selectedMountain}
                                       travel={travel}
                                       prompt="Wybierz górę"
                                       motivationMessage="Góra jeszcze niezdobyta... Przestań patrzeć w ten monitor i zrób coś z tym"
                                       deleteNoteClick={this.deleteNote}/>
                    <Form mountains={this.state.mountains}
                          travels={this.state.travels}
                          gainedMountains={this.state.gainedMountains}
                          saveToLocalStorage={this.saveToLocalStorage}
                    />
                </div>

            </div>

        )
    }
}

export default YourTravels;


