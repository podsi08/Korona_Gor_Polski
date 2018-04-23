import React from 'react';
import 'react-select/dist/react-select.css';
import 'animate.css';
import '../scss/main.css';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import MapContainer from "./MapContainer";
import Home from "./Home";
import Menu from "./Menu";
import YourTravels from "./YourTravels";

class App extends React.Component {
    render(){
        return(
            <HashRouter>
                <div>
                    <Menu/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/map" component={MapContainer}/>
                        <Route path="/yourtravels" component={YourTravels}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App