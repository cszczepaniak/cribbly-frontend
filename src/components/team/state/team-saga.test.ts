import { waitFor } from '@testing-library/react';
import { FakeServer } from '../../../testing/fake-server';
import { ModelFactory } from '../../../testing/model-factory';
import { createSagaTestStore } from '../../../testing/redux-test-utils';
import { TeamActions } from './team-reducer';
import { teamSaga } from './team-saga';

describe('team saga', () => {
    describe('search player', () => {
        test('search request should send a request to the backend with the Email header set', async () => {
            const player = ModelFactory.createPlayer();
            const store = createSagaTestStore(teamSaga);
            FakeServer.setupGetRequest('/api/player', 200, player);

            store.dispatch(TeamActions.searchPlayerRequest(player.email));

            await waitFor(() => expect(FakeServer.executedRequests.length).toEqual(1));
            const req = FakeServer.executedRequests[0];
            expect(req.headers.get('Email')).toEqual(player.email);
        });

        test('search request should dispatch a search success action when successful', async () => {
            const player = ModelFactory.createPlayer();
            const store = createSagaTestStore(teamSaga);
            FakeServer.setupGetRequest('/api/player', 200, player);

            store.dispatch(TeamActions.searchPlayerRequest(player.email));

            await waitFor(() => expect(store.getActions()).toContainEqual(TeamActions.searchPlayerSuccess(player)));
        });

        test('search request should dispatch success action with null player when player not found', async () => {
            const store = createSagaTestStore(teamSaga);
            FakeServer.setupGetRequest('/api/player', 404);

            store.dispatch(TeamActions.searchPlayerRequest('this player is not here'));

            await waitFor(() => expect(store.getActions()).toContainEqual(TeamActions.searchPlayerNotFound()));
        });
    });

    describe('create team', () => {
        test('create team request should post to the backend with the team details', async () => {
            const team = ModelFactory.createTeam();
            const store = createSagaTestStore(teamSaga);
            FakeServer.setupPostRequest('/api/team', 200, team.id);

            store.dispatch(TeamActions.createTeamRequest(team));

            await waitFor(() => expect(FakeServer.executedRequests.length).toEqual(1));
            const req = FakeServer.executedRequests[0];
            expect(req.body).toEqual(team);
        });

        test('successful team creation should dispatch success action', async () => {
            const team = ModelFactory.createTeam({ id: 123 });
            const store = createSagaTestStore(teamSaga);
            FakeServer.setupPostRequest('/api/team', 200, 456);

            store.dispatch(TeamActions.createTeamRequest(team));

            await waitFor(() =>
                expect(store.getActions()).toContainEqual(TeamActions.createTeamSuccess({ ...team, id: 456 })),
            );
        });
    });
});
