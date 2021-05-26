import { createTestStore } from '../../testing/redux-test-utils';
import { renderWithProviders } from '../../testing/render';
import { TournamentActions } from '../tournament/state/tournament-reducer';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
    describe('tournament info', () => {
        test('should dispatch a request to load a tournament right away', () => {
            const store = createTestStore();
            renderWithProviders(<LandingPage />, { store });

            expect(store.getActions()).toContainEqual(TournamentActions.loadNextTournamentRequest());
        });

        test('given a tournament is loading, should show loading text', () => {
            const store = createTestStore(TournamentActions.loadNextTournamentRequest());
            const { container } = renderWithProviders(<LandingPage />, { store });

            expect(container).toHaveTextContent('Loading tournament details...');
        });
    });
});
