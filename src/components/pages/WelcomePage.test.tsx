import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthActions } from '../../shared/auth/auth-reducer';
import { ModelFactory } from '../../testing/model-factory';
import { createTestStore } from '../../testing/redux-test-utils';
import { renderWithProviders } from '../../testing/render';
import { WelcomePage } from './WelcomePage';

describe('WelcomePage', () => {
    test('should show display name', () => {
        const player = ModelFactory.createPlayer();
        const store = createTestStore(AuthActions.signInSuccess({ user: null, player, isReturning: false }));

        const { container } = renderWithProviders(<WelcomePage />, { store });

        expect(container).toHaveTextContent(`Welcome, ${player.name}`);
    });

    test('should show "welcome back" if returning', () => {
        const player = ModelFactory.createPlayer();
        const store = createTestStore(AuthActions.signInSuccess({ user: null, player, isReturning: true }));

        const { container } = renderWithProviders(<WelcomePage />, { store });

        expect(container).toHaveTextContent(`Welcome back, ${player.name}`);
    });

    test('should dispatch sign out request action when clicking logout button', () => {
        const player = ModelFactory.createPlayer();
        const store = createTestStore(AuthActions.signInSuccess({ user: null, player, isReturning: true }));

        renderWithProviders(<WelcomePage />, { store });

        userEvent.click(screen.getByRole('button', { name: 'sign out' }));

        expect(store.getActions()).toContainEqual(AuthActions.signOutRequest());
    });
});
