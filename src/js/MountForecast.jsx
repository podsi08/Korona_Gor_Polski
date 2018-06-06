import React from 'react';
import HourForecast from './HourForecast';

class MountForecast extends React.Component {
    render(){
        let hoursForecasts = [];
        for (let i = 0; i < 16; i++) {
            hoursForecasts.push(<HourForecast key={i} forecast={this.props.forecast} id={i}/>);
        }

        if (this.props.mountain !== null) {
            return(
                <div className='mount_forecast'>
                    <h1>{this.props.mountain.name} {this.props.mountain.height} m n.p.m.</h1>
                    <h3>{this.props.mountain.chain}</h3>
                    <div className='hour_forecast'>
                        <h4/>
                        <h4>temperatura</h4>
                        <h4>wiatr</h4>
                        <h4>zachmurzenie</h4>
                        <h4>dzień</h4>
                        <h4>godzina</h4>
                    </div>
                    {hoursForecasts}
                </div>
                )
        } else {
            return <h2>Zaznacz którą górę chcesz zdobyć</h2>
        }
    }
}

export default MountForecast;