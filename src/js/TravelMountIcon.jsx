import React from "react";

class TravelMountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.onMountainClicked === 'function'){
            this.props.onMountainClicked(this.props.name);
        }
    };

    classSelect = () => {
        if (this.props.gained && this.props.active) {
            return 'mount_icon_gained_active'
        } else if (this.props.gained) {
            return 'mount_icon_gained'
        } else if (this.props.active) {
            return 'mount_icon_active'
        } else {
            return 'mount_icon_inactive'
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.classSelect()}/>
        )
    }
}

export default TravelMountIcon