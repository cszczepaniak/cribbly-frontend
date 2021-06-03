import { Player } from '../../../shared/auth/auth-models';

export interface Team {
    id: number;
    name: string;
    players: Player[];
}

export type TeamCreateRequest = Omit<Team, 'id'>;

export interface PlayerSearch {
    isLoading: boolean;
    hasSearched: boolean;
    executedQuery: string;
    result: Player | null;
}
