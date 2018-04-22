import React from 'react';
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

const mountainsDataUri = 'http://localhost:3001/mountains'

class App extends React.Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <Menu/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/map" render={() =>
                            <MapContainer mountainsDataUri={mountainsDataUri}/>
                        }/>
                        <Route path="/yourtravels" render={() =>
                            <YourTravels mountainsDataUri={mountainsDataUri}/>
                        }/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
