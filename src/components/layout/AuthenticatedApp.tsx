import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useAuth } from '../../shared/auth/auth-hooks';
import { TeamContainer } from '../team/components/TeamContainer';
import { PageWrapper } from './PageWrapper';

export const AuthenticatedApp: React.FunctionComponent = () => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect to='/' />;
    }
    return (
        <PageWrapper>
            <Switch>
                <Route path='/team' exact>
                    <TeamContainer />
                </Route>
            </Switch>
        </PageWrapper>
    );
};
