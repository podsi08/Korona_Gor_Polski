import React from "react";

class TravelDescription extends React.Component {
    render(){
        return(
            <div className='description'>
                <h1>{this.props.name}</h1>
                <h3>{this.props.range}</h3>
                <h3>{this.props.height}</h3>
                <h3>{this.props.date}</h3>
                <span>{this.props.note}</span>
            </div>
        )
    }
}

export default TravelDescription;