import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

export const WelcomePage = () => {
  const { user, signOut } = useAuth();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div>
      <div>Hello, {user.displayName}</div>
      <Button color='primary' variant='contained' onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};
