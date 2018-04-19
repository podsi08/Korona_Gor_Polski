import React from 'react';

class MountIcon extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (typeof this.props.onMountainClicked === 'function') {
            this.props.onMountainClicked(this.props.id);
        }
    }

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.props.active ? 'mount_icon_active' : 'mount_icon_deactive'}/>
        )
    }
}

export default MountIcon;
