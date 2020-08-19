import React from 'react';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/VideoChatRoom";
/**
 * @description main entry of my React app
 */
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/facetime" component={ChatRoom}/>
            </Switch>
        </Router>
    )
}

export default App
