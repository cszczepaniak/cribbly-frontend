import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/routing/Routes';
import { ProvideAuth } from './hooks/useAuth';
import { ProvideTournament } from './hooks/useTournament';

function App() {
  
   return (



          <ProvideAuth>
          <ProvideTournament>
            <BrowserRouter>
              <Routes />
        </BrowserRouter>
      </ProvideTournament>
    </ProvideAuth>
  );
}

export default App;
