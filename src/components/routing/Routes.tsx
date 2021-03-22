import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { TeamPage } from '../pages/TeamPage/TeamPage';
import { StandingsPage } from '../pages/StandingsPage';
import { WelcomePage } from '../pages/WelcomePage';
import { ProtectedRoute } from '../routing/ProtectedRoute';
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
            <ProtectedRoute exact path='/standings' redirectTo='/standings'>
                <StandingsPage />
            </ProtectedRoute>
        </Switch>
    );
};
