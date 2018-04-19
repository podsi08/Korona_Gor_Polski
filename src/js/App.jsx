import React from 'react';
import 'animate.css';
import '../scss/main.css';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom';


import MapContainer from "./MapContainer";
import LogSection from "./LogSection";
import Home from "./Home";
import Menu from "./Menu";

class App extends React.Component {
    render(){
        return(
            <HashRouter>
                <div>
                    <Menu/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/map" component={MapContainer}/>
                        <Route path="/log" component={LogSection}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App