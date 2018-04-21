import React from 'react';
import '../scss/main.scss';
import {NavLink} from 'react-router-dom';


class Menu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: ""
        }
    }

    animateClick = (event, id) => {
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
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <div onClick={(e) => this.animateClick(e, 1)} className={this.state.class} id='1'>
                                    <NavLink exact to='/' className= "link" activeClassName="active_link">
                                        <div className="sign__link--rectangle">
                                            <span>Strona Główna</span>
                                        </div>
                                        <div className="sign__link--triangle"></div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div onClick={this.animateClick} className={this.state.class} id='2'>
                                    <NavLink to='/map' className= "link" activeClassName="active_link">
                                        <div className="sign__link--rectangle">
                                            <span>Mapa</span>
                                        </div>
                                        <div className="sign__link--triangle"></div>
                                    </NavLink>
                                </div>
                            </li>
                            <li onClick={this.animateClick} className={this.state.class} id='3'>
                                <NavLink to='/yourtravels' className= "link" activeClassName="active_link">
                                    <div className="sign__link--rectangle">
                                        <span>Twoje podróże</span>
                                    </div>
                                    <div className="sign__link--triangle"></div>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Menu
