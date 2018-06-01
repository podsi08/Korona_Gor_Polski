import React from 'react';

class HourForecast extends React.Component {
    render(){
        if(this.props.forecast.length !== 0) {
            console.log(this.props.forecast[0]);
            return(
                <div>
                    <img src={`http://openweathermap.org/img/w/${this.props.forecast[0].weather[0].icon}.png`}/>
                </div>
            )
        }else {
            return <div/>
        }

    }
}

export default HourForecast;