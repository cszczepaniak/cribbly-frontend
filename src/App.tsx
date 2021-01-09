import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { FirebaseSample } from './components/FirebaseSample';
import { ProvideAuth } from './hooks/useAuth';

function App() {
  return (
    <ProvideAuth>
      <FirebaseSample />
      {/* <BrowserRouter>
        <Routes />
      </BrowserRouter> */}
    </ProvideAuth>
  );
}

export default App;
