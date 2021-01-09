import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { ProvideAuth } from './hooks/useAuth';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
