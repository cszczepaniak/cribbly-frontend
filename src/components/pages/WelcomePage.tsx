import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

export const WelcomePage = () => {
  const { user, signOut } = useAuth();
  return (
    <div>
      <div>Hello, {user?.displayName}</div>
      <Button color='primary' variant='contained' onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};
