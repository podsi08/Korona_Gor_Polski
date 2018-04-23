import React from "react";

class MountDescription extends React.Component {
    render(){
        if(this.props.mountain !== null) {
            return(
                <div className='description'>
                    <h1>{this.props.mountain.name}</h1>
                    <h3>{this.props.mountain.chain}</h3>
                    <h3>{this.props.mountain.height} m n.p.m.</h3>
                    <span>{this.props.mountain.description}</span>
                </div>
            )
        } else {
            //wykona się jeżeli nie wybrano góry
            return(
                <div className='description'>
                    <h1>{this.props.prompt}</h1>
                </div>
            )
        }

    }
}

export default MountDescription