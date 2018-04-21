import React from 'react';
import {NavLink} from 'react-router-dom';

class MenuItem extends React.Component {
    static defaultProps = {
        animationDelay: 100,
        exactLink: false
    };

    constructor(props) {
        super(props);

        this.state = {
            class: ''
        };

        this.animateClick = this.animateClick.bind(this);
    }

    animateClick() {
        this.setState({
            class: ''
        }, () =>{
            setTimeout(() => {
                this.setState({
                    class: 'animated swing'
                })
            }, this.props.animationDelay);
        });
    };

    render() {
        return (
            <div onClick={this.animateClick} className={this.state.class}>
                <NavLink exact={this.props.exactLink} to={this.props.path} className= "link" activeClassName="active_link">
                    <div className="sign__link--rectangle">
                        <span>{this.props.name}</span>
                    </div>
                    <div className="sign__link--triangle"></div>
                </NavLink>
            </div>
        );
    }
}

export default MenuItem;
