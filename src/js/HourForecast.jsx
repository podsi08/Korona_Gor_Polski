import React from 'react';
import arrow from '../images/long-arrow-pointing-up.png'

class HourForecast extends React.Component {
    //funkcja zwracająca dzień tygodnia
    // getDay = (date) => {
    //     let day = date.getDay();
    //
    //     switch (day) {
    //         case 0:
    //             return 'nd';
    //         case 1:
    //             return 'pon';
    //         case 2:
    //             return 'wt';
    //         case 3:
    //             return 'śr';
    //         case 4:
    //             return 'czw';
    //         case 5:
    //             return 'pt';
    //         case 6:
    //             return 'sob';
    //     }
    // };

    render(){
        let forecast = this.props.forecast;
        let id = this.props.id;

        if(forecast.length !== 0) {

            return(
                <div className='hour_forecast'>
                    {/*ikona*/}
                    <img src={`http://openweathermap.org/img/w/${forecast[id].weather[0].icon}.png`}/>
                    {/*temperatura*/}
                    <div>{Math.round(forecast[id].main.temp - 273.15)} &#8451;</div>
                    {/*wiatr*/}
                    <div>
                        <span>{forecast[id].wind.speed} m/s </span>
                        <img src={arrow} style={{transform: `rotate(${forecast[id].wind.deg}deg)`}}/>
                    </div>
                    {/*zachmurzenie*/}
                    <div>{forecast[id].clouds.all} %</div>
                    {/*dzień tygodnia*/}
                    {/*<div>{this.getDay(forecast[id].dt)}</div>*/}
                    {/*godzina*/}
                    {/*<div>{forecast[id].dt.getHours()}</div>*/}
                </div>
            )
        }else {
            return <div/>
        }

    }
}

export default HourForecast;