import React from 'react';
import Map from "./Map";
import Mountain from "./model/Mountain";
import {apiHostname, port} from "./api-config";
import MountForecast from "./MountForecast";
import HourForecast from "./HourForecast";

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

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${clickedMountain.latitude}&lon=${clickedMountain.longitude}&APPID=51c81a8177719cb6bf599f038121f5a3`).then(response => {
            return response.json()
        }).then(data => {
            console.log(data.list);
            this.setState({
                forecast: data.list
            })
        }).catch(err => {
            console.log(err)
        })
    };

    render(){
        return(
            <div className='container animated slideInRight'>
                <h1>Zaplanuj podróż</h1>
                <div className='map_container'>
                    <Map data={this.state.mountains}
                         selectedMountainCallback={this.selectMountain}
                         selectedMountain={this.state.selectedMountain}
                    />
                    <MountForecast mountain={this.state.selectedMountain}/>
                    <HourForecast forecast={this.state.forecast} id='0'/>
                    <HourForecast forecast={this.state.forecast} id='3'/>
                </div>
            </div>
        )
    }
}

export default PlanTravel;