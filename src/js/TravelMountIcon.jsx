import React from "react";

class TravelMountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction1 === 'function' && typeof this.props.clickFunction2 === 'function'){
            this.props.clickFunction1(this.props.name);
            this.props.clickFunction2(this.props.name);
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.props.gained ? 'mount_icon_gained' : 'mount_icon_deactive'}/>
        )
    }
}

export default TravelMountIcon