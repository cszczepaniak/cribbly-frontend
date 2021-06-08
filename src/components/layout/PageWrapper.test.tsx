import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes } from '../../shared/routing/routes';
import { createTestStore } from '../../testing/redux-test-utils';
import { renderAtRouteWithProviders } from '../../testing/render';
import { PageWrapper } from './PageWrapper';

describe('PageWrapper', () => {
    test('clicking home link directs to home', () => {
        const { history } = renderAtRouteWithProviders(<PageWrapper />, {
            store: createTestStore(),
            routePath: '/app/team',
            initialEntries: [Routes.team],
        });
        userEvent.click(screen.getByRole('button', { name: 'home' }));
        expect(history.entries).toContainEqual(expect.objectContaining({ pathname: Routes.home }));
    });

    test('clicking team link directs to team', () => {
        const { history } = renderAtRouteWithProviders(<PageWrapper />, {
            store: createTestStore(),
            routePath: '/app/home',
            initialEntries: [Routes.home],
        });
        userEvent.click(screen.getByRole('button', { name: 'team' }));
        expect(history.entries).toContainEqual(expect.objectContaining({ pathname: Routes.team }));
    });
});
