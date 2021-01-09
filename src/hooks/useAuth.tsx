import { useState, useEffect, useContext, createContext } from 'react';
import firebaseConfig from '../secrets/firebaseConfig.json';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

interface Auth {
  isSignedIn: boolean;
  loading: boolean;
  user?: firebase.User;
  signInWithGoogle: () => Promise<firebase.User | null>;
  signOut: () => Promise<void>;
}

const initialAuth: Auth = {
  isSignedIn: false,
  loading: true,
  signInWithGoogle: async () => {
    console.error('Did you forget to wrap your app in an auth provider?');
    return null;
  },
  signOut: async () => {
    console.error('Did you forget to wrap your app in an auth provider?');
  },
};

const authContext = createContext<Auth>(initialAuth);

export function ProvideAuth({ children }: { children: any }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

// Gets the auth token if a user is signed in. Otherwise returns the empty string.
export const useAuthToken = () => {
  const [token, setToken] = useState('');
  const { isSignedIn, user } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      const fetchAndSetToken = async () => {
        setToken(await user.getIdToken());
      };
      fetchAndSetToken();
    } else {
      setToken('');
    }
  }, [isSignedIn, user]);

  return token;
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    setUser(res.user);
    setLoading(false);
    setIsSignedIn(true);
    return res.user;
  };

  const signOut = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setUser(null);
    setLoading(false);
    setIsSignedIn(false);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    isSignedIn,
    loading,
    user,
    signInWithGoogle,
    signOut,
  };
}
