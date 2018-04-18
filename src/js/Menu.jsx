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
    render(){
        return(
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <div className="sign__link--rectangle">
                                    <NavLink to='/' className= "link" activeClassName="active_link">Strona Główna</NavLink>
                                </div>
                                <div className="sign__link--triangle"></div>
                            </li>
                            <li>
                                <div className="sign__link--rectangle">
                                    <NavLink to='/map' className= "link" activeClassName="active_link">Mapa</NavLink>
                                </div>
                                <div className="sign__link--triangle"></div>
                            </li>
                            <li>
                                <div className="sign__link--rectangle">
                                    <NavLink to='/log' className= "link" activeClassName="active_link">Logowanie</NavLink>
                                </div>
                                <div className="sign__link--triangle"></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Menu