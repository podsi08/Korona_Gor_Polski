import React from 'react';
import Form from "./Form";
import TravelMap from './TravelMap';
import TravelDescription from './TravelDescription';
import Travel from './model/Travel';
import Mountain from './model/Mountain';
import {apiHostname, port} from './api-config';

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

    //funkcja pobierająca dane z local storage
    getDataFromLocalStorage = () => {
        const storageData = JSON.parse(localStorage.getItem('korona_gor'));

        if(storageData === null) {
            return []
        } else {
            return storageData
        }
    };

    //funkcja zapisująca do local storage
    saveToLocalStorage = (data) => {
        localStorage.setItem('korona_gor', JSON.stringify(data));
    };

    componentDidMount(){
        //pobieram dane z serwera
        fetch(`http://${apiHostname}:${port}/mountains`).then(response => {
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

    //funkcja usuwająca notatkę
    deleteNote = (name) => {
        //filtruję obiekty z local storage i tworzę nową tablicę bez usuniętego obiektu
        let newStorageData = this.state.travels.filter((travel) => {
            return travel.mountain !== name
        });

        //nadpisuję local storage
        this.saveToLocalStorage(newStorageData);

        //ustalam nowy stan -> po usunięciu notatki opis wycieczki zmieni się od razu na wiadomość motywacyjną i zniknie
        //ikona zdobytej góry
        this.setState({
            travels: newStorageData,
            gainedMountains: newStorageData.map(travel => travel.mountain)
        })
    };


    //funkcja edytująca notatkę
    editNote = (name, date, note) => {
        //filtruję obiekty z local storage i tworzę nową tablicę bez obiektu, który został zedytowany
        let newStorageData = this.state.travels.filter((travel) => {
            return travel.mountain !== name
        });

        let newTravel = new Travel (
            name,
            date, //zmienić edycję daty, tak żeby pojawiał się kalendarz
            note
        );

        //do niezmienionych opisów dodaję nowy, zedytowany opis
        newStorageData.push(newTravel);

        //nadpisuję local storage
        this.saveToLocalStorage(newStorageData);

        this.setState({
            travels: newStorageData
        })
    };


    //funkcja wywoływana jako callback po zatwierdzeniu formularza z poprawnymi danymi -> zmienia się state,
    //na nowo zostaną wyrenderowane opis i ikona góry, którą dodaliśmy właśnie do naszych podróży (zmieniło się gainedMountains
    //przekazywane jako props do TravelMap i travels przekazywane do TravelDescription)
    dataChanged = () => {
        let storageTravels = this.getDataFromLocalStorage();
        this.setState({
            gainedMountains: storageTravels.map(travel => travel.mountain),
            travels: storageTravels
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
                                       deleteNoteClick={this.deleteNote}
                                       editNoteClick={this.editNote}/>
                    <Form mountains={this.state.mountains}
                          travels={this.state.travels}
                          gainedMountains={this.state.gainedMountains}
                          saveToLocalStorage={this.saveToLocalStorage}
                          getDataFromLocalStorage={this.getDataFromLocalStorage}
                          onDataChanged={this.dataChanged}
                    />
                </div>

            </div>

        )
    }
}

export default YourTravels;


