import React from 'react';

class TravelDescription extends React.Component {
    render() {
        const mountain = this.props.mountain;
        const travel = this.props.travel;

        if (mountain === null) {
            return(
                <div className='description'>
                    <h1>{this.props.prompt}</h1>
                </div>
            );
        } else {
            if (travel !== null) {
                return(
                    <div className='description'>
                        <h1>{mountain.name}</h1>
                        <h3>{mountain.chain}</h3>
                        <h3>{mountain.height}m n.p.m</h3>
                        <h3>Data zdobycia: {travel.date}</h3>
                        <span>{travel.note}</span>
                    </div>
                );
            } else {
                return(
                    <div className='description'>
                        <h1>{mountain.name}</h1>
                        <h3>{mountain.chain}</h3>
                        <h3>{mountain.height}m n.p.m</h3>
                        <span>{this.props.motivationMessage}</span>
                    </div>
                );
            }
        }
    }
}

export default TravelDescription;
