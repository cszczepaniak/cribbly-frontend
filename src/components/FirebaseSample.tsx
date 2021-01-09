import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth, useAuthToken } from '../hooks/useAuth';

export const FirebaseSample = () => {
  const { isSignedIn, signInWithGoogle, signOut, user } = useAuth();

  const tok = useAuthToken();

  return (
    <div>
      <Button onClick={signInWithGoogle} variant='contained'>
        Sign In with Google
      </Button>
      {isSignedIn && 'signed in!'}
      {isSignedIn && `Welcome, ${user?.displayName}!`}
      {isSignedIn && (
        <Button onClick={() => console.log(tok)} variant='contained'>
          Log Token
        </Button>
      )}
      {isSignedIn && (
        <Button onClick={signOut} variant='contained'>
          Sign out
        </Button>
      )}
    </div>
  );
};
