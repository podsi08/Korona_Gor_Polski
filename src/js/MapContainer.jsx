import React from 'react';
import Map from './Map.jsx';
import MountDescription from './MountDescription';
import Mountain from './model/Mountain.js';

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
    }

    //funkcja wykona się po kliknięciu w ikonę na mapie, zmienia się selectedMountain przekazywane do Description
    // w props jako mountain
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

    render(){
        return(
            <div>
                <div className='container animated slideInRight'>
                    <h1>Mapy</h1>
                    <div className='map_container'>
                        <Map data={this.state.mountains}
                             selectedMountainCallback={this.selectMountain}
                        />
                        <MountDescription mountain={this.state.selectedMountain} prompt="Wybierz górę"/>
                    </div>
                </div>
            </div>

        )
    }
}



export default MapContainer