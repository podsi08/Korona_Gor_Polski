import React from 'react';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    render(){
        return(
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <MenuItem exactLink={true} path='/' menuName='Strona główna'/>
                            </li>
                            <li>
                                <MenuItem path='/map' menuName='Mapa'/>
                            </li>
                            <li>
                                <MenuItem path='/yourtravels' menuName='Twoje podróże'/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Menu