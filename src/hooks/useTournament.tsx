import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface Tournament {
  date: Date;
  error: string;
  id: number;
  isActive: boolean;
  isLoading: boolean;
  isOpenForRegistration: boolean;
}

const initialTournament: Tournament = {
  date: new Date(2020, 1, 1),
  error: '',
  id: 0,
  isActive: false,
  isLoading: true,
  isOpenForRegistration: false,
};

const tournamentContext = createContext<Tournament>(initialTournament);

export function ProvideTournament({ children }: { children: any }) {
  const tournament = useProvideTournament();
  return (
    <tournamentContext.Provider value={tournament}>
      {children}
    </tournamentContext.Provider>
  );
}

export const useTournament = () => {
  return useContext(tournamentContext);
};

function useProvideTournament() {
  const [tournament, setTournament] = useState<Tournament>(initialTournament);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNextTournament = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('/api/tournament/next');
        setTournament(res.data);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchNextTournament();
  }, []);
  if (!tournament) {
    return initialTournament;
  }

  return {
    ...tournament,
    date: new Date(tournament.date),
    error,
    isLoading,
  };
}
