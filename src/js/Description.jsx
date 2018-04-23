import React from "react";

class Description extends React.Component {

    render(){
        return(
            <div className='description'>
                <h1>{this.props.name}</h1>
                <h3>{this.props.range}</h3>
                <h3>{this.props.height}</h3>
                <span>{this.props.description}</span>
            </div>
        )
    }
}

export default Description