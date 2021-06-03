import { ModelFactory } from '../../../testing/model-factory';
import { generateState } from '../../../testing/redux-test-utils';
import { TeamActions, teamReducer } from './team-reducer';

describe('team reducer', () => {
    test('initial state should have a null team', () => {
        const state = generateState(teamReducer);

        expect(state.team).toBeNull();
    });

    test('load team success should load the team into state', () => {
        const team = ModelFactory.createTeam();
        const state = generateState(teamReducer, TeamActions.loadTeamSuccess(team));

        expect(state.team).toEqual(team);
    });

    test('create team success should load the created team into state', () => {
        const team = ModelFactory.createTeam();
        const state = generateState(teamReducer, TeamActions.createTeamSuccess(team));

        expect(state.team).toEqual(team);
    });

    describe('search player', () => {
        test('hasSearched starts at false', () => {
            const state = generateState(teamReducer);

            expect(state.playerSearch.hasSearched).toEqual(false);
        });

        test('search player request should set loading to true', () => {
            const state = generateState(teamReducer, TeamActions.searchPlayerRequest(''));

            expect(state.playerSearch.isLoading).toEqual(true);
        });

        test('search player request should set query', () => {
            const state = generateState(teamReducer, TeamActions.searchPlayerRequest('a query'));

            expect(state.playerSearch.executedQuery).toEqual('a query');
        });

        test('search player success should load found player into state', () => {
            const player = ModelFactory.createPlayer();
            const state = generateState(teamReducer, TeamActions.searchPlayerSuccess(player));

            expect(state.playerSearch.result).toEqual(player);
        });

        test('search player success should set isLoading to false', () => {
            const state = generateState(
                teamReducer,
                TeamActions.searchPlayerRequest(''),
                TeamActions.searchPlayerSuccess(ModelFactory.createPlayer()),
            );

            expect(state.playerSearch.isLoading).toEqual(false);
        });

        test('search player success should set hasSearched to true', () => {
            const state = generateState(teamReducer, TeamActions.searchPlayerSuccess(ModelFactory.createPlayer()));

            expect(state.playerSearch.hasSearched).toEqual(true);
        });

        test('search player not found should set result to null', () => {
            const state = generateState(
                teamReducer,
                TeamActions.searchPlayerSuccess(ModelFactory.createPlayer()),
                TeamActions.searchPlayerNotFound(),
            );

            expect(state.playerSearch.result).toEqual(null);
        });

        test('search player not found should set hasSearched to true', () => {
            const state = generateState(teamReducer, TeamActions.searchPlayerNotFound());

            expect(state.playerSearch.hasSearched).toEqual(true);
        });

        test('resetting player search sets result to null', () => {
            const state = generateState(
                teamReducer,
                TeamActions.searchPlayerSuccess(ModelFactory.createPlayer()),
                TeamActions.resetPlayerSearch(),
            );

            expect(state.playerSearch.result).toEqual(null);
        });

        test('resetting player search sets hasSearched to false', () => {
            const state = generateState(
                teamReducer,
                TeamActions.searchPlayerSuccess(ModelFactory.createPlayer()),
                TeamActions.resetPlayerSearch(),
            );

            expect(state.playerSearch.hasSearched).toEqual(false);
        });
    });
});
