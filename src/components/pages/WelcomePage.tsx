import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

export const WelcomePage = () => {
  const { user, logout } = useAuth0();

  return (
    <div>
      <div>Hello, {user.name}</div>
      <Button
        color='primary'
        variant='contained'
        onClick={() => logout({ returnTo: 'http://localhost:3000' })}
      >
        Logout
      </Button>
    </div>
  );
};
