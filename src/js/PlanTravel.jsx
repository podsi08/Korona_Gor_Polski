import React from 'react';
import Map from "./Map";
import Mountain from "./model/Mountain";
import {apiHostname, port} from "./api-config";
import MountForecast from "./MountForecast";
import SearchMount from "./SearchMount";

class PlanTravel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMountain: null,
            mountains: [],
            forecast: []
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

    //funkcja pobierająca dane o prognozie dla wybranej góry
    getForecast = (mount) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${mount.latitude}&lon=${mount.longitude}&APPID=51c81a8177719cb6bf599f038121f5a3`).then(response => {
            return response.json()
        }).then(data => {
            //aktualizuję state, który jest przekazywany do props MountForecast a potem HourForecast
            this.setState({
                forecast: data.list
            })
        }).catch(err => {
            console.log(err)
        })
    };

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

        //pobieram dane o prognozie pogody dla klikniętej góry
        this.getForecast(clickedMountain);
    };

    newSearching = (mount) => {
        if (typeof mount !== 'undefined') {
            let searchedMountain = this.state.mountains.find(mountain => {
                return mount === mountain.name
            });
            this.setState({
                selectedMountain: searchedMountain
            });
            //pobieram dane o prognozie dla wyszukanej góry
            this.getForecast(searchedMountain);
        }
    };

    render(){
        return(
            <div className='container animated slideInRight'>
                <h1>Zaplanuj podróż</h1>
                <SearchMount mountains={this.state.mountains} newSearching={this.newSearching}/>
                <div className='map_container'>
                    <Map data={this.state.mountains}
                         selectedMountainCallback={this.selectMountain}
                         selectedMountain={this.state.selectedMountain}
                    />
                    <div className='info'>
                        <h1>Wybierz górę</h1>
                        <p>Wybierz którą górę chcesz zdobyć i sprawdź na jaką pogodę musisz się przygotować</p>
                        <br/>
                        <p>A już wkrótce oprócz prognozy pogody możliwe będzie wybranie trasy ;)</p>
                    </div>
                    <MountForecast mountain={this.state.selectedMountain} forecast={this.state.forecast}/>
                </div>
            </div>
        )
    }
}

export default PlanTravel;