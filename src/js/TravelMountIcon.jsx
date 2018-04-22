import React from 'react';

class TravelMountIcon extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if(typeof this.props.onMountainClicked === 'function') {
            this.props.onMountainClicked(this.props.id);
        }
    }

    render() {
        return(
            <div onClick={this.handleClick}
                 className={this.props.gained ? 'mount_icon_gained' : 'mount_icon_deactive'}/>
        )
    }
}

export default TravelMountIcon;
