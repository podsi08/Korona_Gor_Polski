import React from 'react';

import {
    NavLink
} from 'react-router-dom';

class MenuItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: ""
        }
    }

    static defaultProps = {
        exactLink: false
    };

    animateClick = () => {
        // po kliknięciu dodajemy komponentowi klasę i zabieramy ją po upływie 100ms (bez timeoutu animacja nie wykonywała się)
        this.setState({
            class: ''
        }, ()=>{
            setTimeout(() => {
                this.setState({
                    class: 'animated swing'
                })
            }, 100)

        })
    };

    render(){
        return(
            <div onClick={this.animateClick} className={this.state.class}>

                {/*dla linku do strony głównej w props exactLink należy przekazać true*/}
                <NavLink exact={this.props.exactLink} to={this.props.path} className= "link" activeClassName="active_link">
                    <div className="sign__link--rectangle">
                        <span>{this.props.menuName}</span>
                    </div>
                    <div className="sign__link--triangle"></div>
                </NavLink>

            </div>
        )
    }
}

export default MenuItem;