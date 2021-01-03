import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route } from 'react-router-dom';

interface PropShape {
  component: any;
  [x: string]: any;
}

export const ProtectedRoute: React.FunctionComponent<PropShape> = ({
  component,
  ...args
}) => <Route component={withAuthenticationRequired(component)} {...args} />;
