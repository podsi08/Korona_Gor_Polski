import React from "react";

class MountIcon extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: 'tooltip_hidden',
            name: ''
        }
    }

    handleClick = () => {
        if(typeof this.props.onMountainClicked === 'function'){
            this.props.onMountainClicked(this.props.id);
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
                     className={this.props.active ? 'mount_icon_active' : 'mount_icon_inactive'}
                />
                <div className={this.state.class}>{this.state.name}</div>
            </React.Fragment>

        )
    }
}

export default MountIcon;