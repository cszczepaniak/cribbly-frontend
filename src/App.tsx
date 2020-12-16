import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './auth/config';
import { SampleAuth } from './components/SampleAuth/SampleAuth';

function App() {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      audience={authConfig.audience}
      redirectUri={window.location.origin}
      scope={authConfig.scope}
    >
      <SampleAuth />
    </Auth0Provider>
  );
}

export default App;
