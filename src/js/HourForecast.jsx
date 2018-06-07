import React from 'react';
import arrow from '../images/long-arrow-pointing-up.png';
import cloud from '../images/cloud.png';

class HourForecast extends React.Component {
    // funkcja zwracająca dzień tygodnia, w odpowiedzi api dostaję sekundy a nie milisekundy dlatego mnożę przez 1000
    getDay = (date) => {
        let day = new Date(parseInt(date) * 1000).getDay();

        switch (day) {
            case 0:
                return 'nd';
            case 1:
                return 'pon';
            case 2:
                return 'wt';
            case 3:
                return 'śr';
            case 4:
                return 'czw';
            case 5:
                return 'pt';
            case 6:
                return 'sob';
        }
    };



    render(){
        let forecast = this.props.forecast;
        let id = this.props.id;

        let rainVolume;

        if(forecast.length !== 0) {
            //sprawdzam czy w odpowiedzi orzymuję dane o deszczu i jeżeli tak to czy nie są pustym obiektem
            let rainDataIndex = Object.keys(forecast[id]).indexOf('rain');

            if (rainDataIndex !== -1 && Object.keys(forecast[id].rain).indexOf('3h') !== -1) {
               rainVolume = Object.values(forecast[id].rain)[0];
            } else {
                rainVolume = 0;
            }


            return(
                <div className='hour_forecast'>
                    {/*ikona*/}
                    <img src={`http://openweathermap.org/img/w/${forecast[id].weather[0].icon}.png`}/>

                    {/*temperatura*/}
                    <div>{Math.round(forecast[id].main.temp - 273.15)} &#8451;</div>

                    {/*wiatr*/}
                    <div>
                        <span>{forecast[id].wind.speed} m/s </span>
                        {/*strzałka oznaczająca kierunek wiatru będzie obrócona o wartość deg otrzymaną w odpowiedzi api dla wiatru*/}
                        <img src={arrow} style={{transform: `rotate(${forecast[id].wind.deg}deg)`}}/>
                    </div>

                    {/*zachmurzenie*/}
                    <div>
                        <span>{forecast[id].clouds.all} % </span>
                        <img src={cloud} style={{position: 'relative', top: '5px'}}/>
                    </div>

                    {/*deszcz*/}
                    <div>
                        <span>{rainVolume} mm</span>
                    </div>

                    {/*dzień tygodnia*/}
                    <div>{this.getDay(forecast[id].dt)}</div>

                    {/*godzina*/}
                    <div>{new Date(parseInt(forecast[id].dt) * 1000).getHours()}:00</div>
                </div>
            )
        }else {
            return <div/>
        }

    }
}

export default HourForecast;