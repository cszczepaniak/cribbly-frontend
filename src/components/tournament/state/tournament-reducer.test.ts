import { generateState } from '../../../test/state/redux-test-utils';
import { initialTournament, Tournament } from './tournament-model';
import { TournamentActions, tournamentReducer } from './tournament-reducer';

describe('tournament reducer', () => {
    test('by default, loading should be false and error should be empty', () => {
        const state = generateState(tournamentReducer);

        expect(state.isLoading).toEqual(false);
        expect(state.error).toEqual('');
    });

    test('requesting to load a tournament sets loading to true', () => {
        const state = generateState(tournamentReducer, TournamentActions.loadNextTournamentRequest());

        expect(state.isLoading).toEqual(true);
    });

    test('successfully loading a tournament sets loading to false', () => {
        const state = generateState(tournamentReducer, TournamentActions.loadNextTournamentSuccess(initialTournament));

        expect(state.isLoading).toEqual(false);
    });

    test('successfully loading a tournament sets the tournament', () => {
        const tournament: Tournament = {
            id: 123,
            date: new Date('1/1/1999'),
            isActive: true,
            isOpenForRegistration: true,
        };
        const state = generateState(tournamentReducer, TournamentActions.loadNextTournamentSuccess(tournament));

        expect(state.tournament).toEqual(tournament);
    });
});
