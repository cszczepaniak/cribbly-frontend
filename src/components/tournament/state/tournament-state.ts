import { initialTournament, Tournament } from './tournament-model';

export interface TournamentState {
    tournament: Tournament;
    isLoading: boolean;
    error: string;
}

export const initialTournamentState: TournamentState = {
    tournament: initialTournament,
    isLoading: false,
    error: '',
};
