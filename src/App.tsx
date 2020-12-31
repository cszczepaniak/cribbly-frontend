import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './auth/config';
import { SampleAuth } from './components/SampleAuth/SampleAuth';
import { SampleMaterial } from './components/SampleMaterial';

function App() {
  return (
    <div className="main-container">
      <Auth0Provider
        domain={authConfig.domain}
        clientId={authConfig.clientId}
        audience={authConfig.audience}
        redirectUri={window.location.origin}
        scope={authConfig.scope}>
        <SampleAuth />
      </Auth0Provider>
      <SampleMaterial/>
    </div>


  );
}

export default App;
