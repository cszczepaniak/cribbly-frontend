import { Button } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

export const WelcomePage = () => {
  const { user, signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut();
  };
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div>
      <div>Hello, {user.displayName}</div>
      <Button color='primary' variant='contained' onClick={handleSignOut}>
        Logout
      </Button>
    </div>
  );
};
