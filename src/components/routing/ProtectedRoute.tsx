import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  redirectTo: string;
  path: string;
  exact: boolean;
}

export const ProtectedRoute: React.FunctionComponent<Props> = ({
  redirectTo,
  ...rest
}) => {
  const { isSignedIn, loading } = useAuth();
  if (isSignedIn && !loading) {
    return <Route {...rest} />;
  }
  return <Redirect to={redirectTo} />;
};
