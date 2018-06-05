import React from 'react';
import arrow from '../images/long-arrow-pointing-up.png'

class HourForecast extends React.Component {
    render(){
        let forecast = this.props.forecast;
        let id = this.props.id;

        if(forecast.length !== 0) {

            return(
                <div>
                    <img src={`http://openweathermap.org/img/w/${forecast[id].weather[0].icon}.png`}/>
                    <div>{Math.round(forecast[id].main.temp - 273.15)} &#8451;</div>
                    <div>
                        <span>{forecast[id].wind.speed} m/s </span>
                        <img src={arrow} style={{transform: `rotate(${forecast[id].wind.deg}deg)`}}/>
                    </div>
                    <div>{forecast[id].clouds.all} %</div>
                </div>
            )
        }else {
            return <div/>
        }

    }
}

export default HourForecast;