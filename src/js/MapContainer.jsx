import React from 'react';
import Map from './Map.jsx';


class MapContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            name: 'Wybierz górę',
            range: '',
            height: '',
            description: '',
            // date: '',
            // note: '',
            data: false,
            // userData: false
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

    }

    changeDescription = (id) => {
        let clickedObject = this.state.data.filter((elem) => {
            return id === elem.id;
        });

        this.setState({
            id: clickedObject[0].id,
            name: clickedObject[0].name,
            range: clickedObject[0].range,
            height: clickedObject[0].height + 'm n.p.m.',
            description: clickedObject[0].description,
        })
    };



    render(){
        return(
            <div className='container animated slideInRight'>
                <h1>Mapy</h1>
                <div className='map_container'>
                    <Map data={this.state.data}
                        selectedMountainCallback={this.changeDescription}
                        />
                    <Description name={this.state.name}
                                 range={this.state.range}
                                 height={this.state.height}
                                 description={this.state.description}/>
                </div>
            </div>
        )
    }
}

class Description extends React.Component {

    render(){
        return(
            <div className='description'>
                <h1>{this.props.name}</h1>
                <h3>{this.props.range}</h3>
                <h3>{this.props.height}</h3>
                <span>{this.props.description}</span>
            </div>
        )
    }
}

export default MapContainer