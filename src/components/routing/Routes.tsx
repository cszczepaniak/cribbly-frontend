import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { WelcomePage } from '../pages/WelcomePage';
import { ProtectedRoute } from '../routing/ProtectedRoute';
import { TeamPage } from '../team/TeamPage';
export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <LandingPage />
            </Route>
            <ProtectedRoute exact path='/home' redirectTo='/'>
                <WelcomePage />
            </ProtectedRoute>
            <ProtectedRoute exact path='/team' redirectTo='/'>
                <TeamPage />
            </ProtectedRoute>
        </Switch>
    );
};
