import React from 'react';
import Map from './Map.jsx';
import MountDescription from './MountDescription';
import Mountain from './model/Mountain.js';
import SearchMount from './SearchMount';
import {apiHostname, port} from './api-config';

class MapContainer extends React.Component {
    constructor(props){
        super(props);

        //na początku nie ma danych z serwera - mountains: [], nie jest też wybrana żadna góra
        this.state = {
            selectedMountain: null,
            mountains: []
        }
    }

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
    }

    //funkcja wykona się po kliknięciu w ikonę na mapie, zmienia się selectedMountain przekazywane w props
    // do Description i Map
    selectMountain = (id) => {
        let clickedMountain = this.state.mountains.find(mount => {
            return id === mount.id;
        });

        if(typeof clickedMountain !== 'undefined'){
            this.setState({
                selectedMountain: clickedMountain
            });
        }
    };

    //funkcja wykona się po wyszukaniu nowej góry przez komponent SearchMount, zmienia się selectedMountain przekazywane
    //w props do Description i Map
    newSearching = (mount) => {
        if (typeof mount !== 'undefined') {
            let searchedMountain = this.state.mountains.find(mountain => {
                return mount === mountain.name
            });
            this.setState({
                selectedMountain: searchedMountain
            });
        }
    };

    render(){
        return(
            <div>
                <div className='container animated slideInRight'>
                    <h1>Mapy</h1>
                    <SearchMount mountains={this.state.mountains} newSearching={this.newSearching}/>
                    <div className='map_container'>
                        <Map data={this.state.mountains}
                             selectedMountainCallback={this.selectMountain}
                             selectedMountain={this.state.selectedMountain}
                        />
                        <MountDescription mountain={this.state.selectedMountain}
                                          prompt="Wybierz górę"
                                          info="Wybierz ikonę na mapie lub wyszukaj górę"/>
                    </div>
                </div>
            </div>

        )
    }
}



export default MapContainer