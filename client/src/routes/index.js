import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                {/* Add more routes as needed */}
            </Switch>
        </Router>
    );
};

export default Routes;
