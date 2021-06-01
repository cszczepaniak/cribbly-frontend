import { ModelFactory } from '../../../testing/model-factory';
import { generateState } from '../../../testing/redux-test-utils';
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
        const state = generateState(
            tournamentReducer,
            TournamentActions.loadNextTournamentSuccess(ModelFactory.createTournament()),
        );

        expect(state.isLoading).toEqual(false);
    });

    test('successfully loading a tournament sets the tournament', () => {
        const tournament = ModelFactory.createTournament();
        const state = generateState(tournamentReducer, TournamentActions.loadNextTournamentSuccess(tournament));

        expect(state.tournament).toEqual(tournament);
    });

    test('failing to load a tournament sets the error', () => {
        const state = generateState(tournamentReducer, TournamentActions.loadNextTournamentFailure('an error'));

        expect(state.error).toEqual('an error');
    });

    test('failing to load a tournament sets loading to false', () => {
        const state = generateState(
            tournamentReducer,
            TournamentActions.loadNextTournamentRequest(),
            TournamentActions.loadNextTournamentFailure('an error'),
        );

        expect(state.isLoading).toEqual(false);
    });
});
