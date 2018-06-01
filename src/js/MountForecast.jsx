import React from 'react';

class MountForecast extends React.Component {
    render(){
        if (this.props.mountain !== null && this.props.forecast !== []) {
            return(
                <div className='mount_forecast'>
                    <h1>{this.props.mountain.name}</h1>
                    <h3>{this.props.mountain.chain}</h3>
                    <h3>{this.props.mountain.height} m n.p.m.</h3>
                    <div>
                        <h3>Prognoza pogody</h3>
                        <span>{this.props.forecast}</span>
                    </div>
                </div>
            )
        } else {
            return(
                <h2>Zaznacz którą górę chcesz zdobyć</h2>
            )
        }

    }
}

export default MountForecast;