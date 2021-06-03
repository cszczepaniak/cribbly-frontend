import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthenticatedApp } from '../layout/AuthenticatedApp';
import { LandingPage } from '../pages/LandingPage';
export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <LandingPage />
            </Route>
            <Route exact path='/app'>
                <AuthenticatedApp />
            </Route>
        </Switch>
    );
};
