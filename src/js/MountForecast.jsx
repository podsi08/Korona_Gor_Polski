import React from 'react';
import HourForecast from './HourForecast';

class MountForecast extends React.Component {
    render(){
        //tworzę tablicę z 20-ma komponentami HourForecast, przekazuję i jako id do props
        let hoursForecasts = [];
        for (let i = 0; i < 20; i++) {
            hoursForecasts.push(<HourForecast key={i} forecast={this.props.forecast} id={i}/>);
        }

        if (this.props.mountain !== null) {
            return(
                <div className='mount_forecast_container'>
                    <h1>{this.props.mountain.name}</h1>
                    <h4>{this.props.mountain.height} m n.p.m, {this.props.mountain.chain}</h4>
                    <div className='mount_forecast'>
                        {hoursForecasts}
                    </div>
                </div>
                )
        } else {
            return <div/>
        }
    }
}

export default MountForecast;