import React from "react";

class MountIcon extends React.Component {
    handleClick = () => {
        if(typeof this.props.clickFunction1 === 'function' && typeof this.props.clickFunction2 === 'function'){
            this.props.clickFunction1(this.props.id);
            this.props.clickFunction2(this.props.id);
        }
    };

    render(){
        return(
            <div onClick={this.handleClick}
                 className={this.props.active ? 'mount_icon_active' : 'mount_icon_deactive'}/>
        )
    }
}

export default MountIcon;