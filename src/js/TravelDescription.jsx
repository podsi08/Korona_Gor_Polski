import React from "react";

class TravelDescription extends React.Component {
    //jeżeli istnieje notatka o zdobyciu wybranej góry to ją wyświetl, jeżeli nie, wyświetl
    //motywującą wiadomość

    renderNote = () => {
        //jeżeli góra jest nizdobyta w propsie przekazany zostaie 'undefined'
        if (typeof this.props.travel !== 'undefined') {
            return(
                <React.Fragment>
                    <h3>Data zdobycia: {this.props.travel.date}</h3>
                    <span>{this.props.travel.note}</span>
                </React.Fragment>
            )
        } else {
            return <span>{this.props.motivationMessage}</span>
        }
    };


    render(){
        //jeżeli wybrano górę, wyświetl informacje o wycieczce lub motywującą wiadomość, jeżeli nie info o wybraniu góry
        if (this.props.mountain !== null) {
            return(
                <div className='description'>
                    <h1>{this.props.mountain.name}</h1>
                    <h3>{this.props.mountain.chain}</h3>
                    <h3>{this.props.mountain.height} m n.p.m.</h3>
                    {this.renderNote()}
                </div>
            )
        } else {
            return(
                <div className='description'>
                    <h1>{this.props.prompt}</h1>
                </div>
            )
        }


    }
}

export default TravelDescription;