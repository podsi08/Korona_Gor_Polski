import React from 'react';
import Map from './Map.jsx';
import Description from './Description.jsx'
import Mountain from './model/Mountain.js'

class MapContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMountain: null,
            mountains: []
        }

        this.selectMountain = this.selectMountain.bind(this);
    }

    componentDidMount(){
        fetch(this.props.mountainsDataUri).then(response => {
            return response.json()
        }).then(data => {
            this.setState({
                mountains: data.map((data) => Mountain.fromServerData(data))
            });
        })
    }

    selectMountain(id) {
        let clickedMountain = this.state.mountains.find((mountain) => {
            return id === mountain.id;
        });

        if (typeof clickedMountain !== 'undefined') {
            this.setState({
                selectedMountain: clickedMountain,
            });
        }
    }

    render(){
        return(
            <div>
                <div className='container animated slideInRight'>
                    <h1>Mapy</h1>
                    <div className='map_container'>
                        <Map
                            data={this.state.mountains}
                            selectedMountainCallback={this.selectMountain}/>
                        <Description
                            mountain={this.state.selectedMountain}
                            prompt="Wybierz górę"/>
                    </div>
                </div>
            </div>

        )
    }
}

export default MapContainer
