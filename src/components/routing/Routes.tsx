import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
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
    </Switch>
  );
};
