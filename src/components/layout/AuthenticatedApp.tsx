import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useAuth } from '../../shared/auth/auth-hooks';
import { Routes } from '../../shared/routing/routes';
import { WelcomePage } from '../pages/WelcomePage';
import { TeamContainer } from '../team/components/TeamContainer';
import { PageWrapper } from './PageWrapper';

export const AuthenticatedApp: React.FunctionComponent = () => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect to={Routes.landingPage} />;
    }
    return (
        <PageWrapper>
            <Switch>
                <Route path={Routes.team}>
                    <TeamContainer />
                </Route>
                <Route path={Routes.home}>
                    <WelcomePage />
                </Route>
            </Switch>
        </PageWrapper>
    );
};
