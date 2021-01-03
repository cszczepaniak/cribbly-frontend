import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { authConfig } from './auth/config';
import { Routes } from './components/routing/Routes';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const onRedirectCallback = (appState: any) => {
  history.replace(appState?.returnTo || window.location.pathname);
};

function App() {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      audience={authConfig.audience}
      redirectUri={window.location.origin}
      scope={authConfig.scope}
      onRedirectCallback={onRedirectCallback}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
