import React from 'react';
import '../scss/main.scss';
import MenuItem from './MenuItem.jsx';

class Menu extends React.Component {
    render() {
        return(
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <MenuItem path="/" name="Strona Główna" exactLink={true}/>
                            </li>
                            <li>
                                <MenuItem path="/map" name="Mapa"/>
                            </li>
                            <li>
                                <MenuItem path='/yourtravels' name='Twoje podróże'/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Menu;
