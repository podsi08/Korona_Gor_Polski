import React from 'react';
import '../scss/main.scss';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom';


class Menu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: ""
        }
    }

    animateClick = (event) => {
        this.setState({
            class: ''
        }, ()=>{
            setTimeout(() => {
                this.setState({
                    class: 'animated swing'
                })
            }, 100)

        })
    }

    render(){
        return(
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li onClick={this.animateClick} className={this.state.class} id='1'>
                                <NavLink exact to='/' className= "link" activeClassName="active_link">
                                    <div className="sign__link--rectangle">
                                        <span>Strona Główna</span>
                                    </div>
                                    <div className="sign__link--triangle"></div>
                                </NavLink>

                            </li>
                            <li onClick={this.animateClick} className={this.state.class} id='2'>
                                <NavLink to='/map' className= "link" activeClassName="active_link">
                                    <div className="sign__link--rectangle">
                                        <span>Mapa</span>
                                    </div>
                                    <div className="sign__link--triangle"></div>
                                </NavLink>
                            </li>
                            <li onClick={this.animateClick} className={this.state.class} id='3'>
                                <NavLink to='/log' className= "link" activeClassName="active_link">
                                    <div className="sign__link--rectangle">
                                        <span>Logowanie</span>
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