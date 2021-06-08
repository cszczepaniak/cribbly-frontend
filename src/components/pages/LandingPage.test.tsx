import { createTestStore } from '../../testing/redux-test-utils';
import { renderAtRouteWithProviders, renderWithProviders } from '../../testing/render';
import { TournamentActions } from '../tournament/state/tournament-reducer';
import { LandingPage } from './LandingPage';
import { ModelFactory } from '../../testing/model-factory';
import { AuthActions } from '../../shared/auth/auth-reducer';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Routes } from '../../shared/routing/routes';

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

        test('given a tournament is open for registration, should render the date of it', () => {
            const store = createTestStore(
                TournamentActions.loadNextTournamentSuccess(
                    ModelFactory.createTournament({
                        date: new Date('04/14/1995').toISOString(),
                        isOpenForRegistration: true,
                    }),
                ),
            );
            const { container } = renderWithProviders(<LandingPage />, { store });

            expect(container).toHaveTextContent('Next tournament is on April 14th, 1995!');
        });

        test('given a tournament is not open for registration, should show message', () => {
            const store = createTestStore(
                TournamentActions.loadNextTournamentSuccess(
                    ModelFactory.createTournament({
                        isOpenForRegistration: false,
                    }),
                ),
            );
            const { container } = renderWithProviders(<LandingPage />, { store });

            expect(container).toHaveTextContent(
                'No tournament is scheduled. You can still register to be prepared for future tournaments!',
            );
        });

        test('given default state, should show message that tournament is not scheduled', () => {
            const store = createTestStore();
            const { container } = renderWithProviders(<LandingPage />, { store });

            expect(container).toHaveTextContent(
                'No tournament is scheduled. You can still register to be prepared for future tournaments!',
            );
        });

        test('clicking the sign in button dispatches request to sign in with google', () => {
            const store = createTestStore();
            renderWithProviders(<LandingPage />, { store });
            userEvent.click(screen.getByRole('button', { name: 'sign in' }));

            expect(store.getActions()).toContainEqual(AuthActions.signInWithGoogleRequest());
        });

        test('given a user is signed in should reedirect to home page', () => {
            const store = createTestStore(
                AuthActions.signInSuccess({
                    user: ModelFactory.createUser(),
                    player: ModelFactory.createPlayer(),
                    isReturning: false,
                }),
            );
            const { history } = renderAtRouteWithProviders(<LandingPage />, {
                store,
                routePath: '/',
                initialEntries: [Routes.landingPage],
            });
            expect(history.entries).toContainEqual(expect.objectContaining({ pathname: Routes.home }));
        });
    });
});
