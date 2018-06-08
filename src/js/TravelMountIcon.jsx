import React from "react";

class TravelMountIcon extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: 'tooltip_hidden',
            name: ''
        }
    }

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

    handleMouseOver = (e, name) => {
        this.setState({
            class: 'tooltip_visible',
            name: name
        })
    };

    handleMouseLeave = () => {
        this.setState({
            class: 'tooltip_hidden'
        })
    };

    render(){
        return(
            <React.Fragment>
                <div onClick={this.handleClick}
                     onMouseOver={e => this.handleMouseOver(e, this.props.name)}
                     onMouseLeave={this.handleMouseLeave}
                     className={this.classSelect()}/>
                <div className={this.state.class}>{this.state.name}</div>
            </React.Fragment>
        )
    }
}

export default TravelMountIcon