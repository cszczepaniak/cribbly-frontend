import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../shared/auth/auth-hooks';

interface Props {
    redirectTo: string;
    path: string;
    exact: boolean;
}

export const ProtectedRoute: React.FunctionComponent<Props> = ({ redirectTo, ...rest }) => {
    const { isSignedIn, isLoading } = useAuth();
    if (isSignedIn && !isLoading) {
        return <Route {...rest} />;
    }
    return <Redirect to={redirectTo} />;
};
