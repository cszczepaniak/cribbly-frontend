import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const SampleAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const handlePublicAPIRequest = () => {
    axios
      .get('/sample')
      .then(res => alert(res.data))
      .catch(err => alert(err));
  };
  const handlePrivateAPIRequest = () => {
    getAccessTokenSilently({
      audience: 'https://cribbly.com/api',
    })
      .then(t => {
        axios
          .get('/sample/private', {
            headers: {
              Authorization: `Bearer ${t}`,
            },
          })
          .then(res => alert(res.data))
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  };

  if (error) {
    return <div>Oops...{error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        {isAuthenticated && user
          ? `Logged in as ${user.name}`
          : 'Not logged in.'}
      </div>
      <button disabled={isAuthenticated} onClick={loginWithRedirect}>
        Login
      </button>
      <button
        disabled={!isAuthenticated}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
      <div>
        <button onClick={handlePublicAPIRequest}>
          Access Public API Endpoint
        </button>
        <button onClick={handlePrivateAPIRequest}>
          Access Private API Endpoint
        </button>
      </div>
    </div>
  );
};
