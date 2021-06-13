import { waitFor } from '@testing-library/react';
import { FakeServer } from '../../../testing/fake-server';
import { ModelFactory } from '../../../testing/model-factory';
import { createSagaTestStore } from '../../../testing/redux-test-utils';
import { TournamentActions } from './tournament-reducer';
import { tournamentSaga } from './tournament-saga';

describe('tournament saga', () => {
    test('should dispatch the success action when a request successfully happens', async () => {
        const store = createSagaTestStore(tournamentSaga);
        const tournament = ModelFactory.createTournament();
        FakeServer.setupGetRequest('/api/tournament/next', 200, tournament);

        store.dispatch(TournamentActions.loadNextTournamentRequest());

        await waitFor(() =>
            expect(store.getActions()).toContainEqual(
                TournamentActions.loadNextTournamentSuccess({ ...tournament, date: tournament.date }),
            ),
        );
    });

    test('should set the error on a failed api call', async () => {
        const store = createSagaTestStore(tournamentSaga);
        FakeServer.setupGetRequest('/api/tournament/next', 400, 'here is an error');

        store.dispatch(TournamentActions.loadNextTournamentRequest());

        await waitFor(() =>
            expect(store.getActions()).toContainEqual(TournamentActions.loadNextTournamentFailure('here is an error')),
        );
    });
});
