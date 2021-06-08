import { Routes } from '../../shared/routing/routes';
import { createTestStore } from '../../testing/redux-test-utils';
import { renderAtRouteWithProviders } from '../../testing/render';
import { AuthenticatedApp } from './AuthenticatedApp';

describe('AuthenticatedApp', () => {
    test('should redirect to landing page if not logged in', () => {
        const store = createTestStore();
        const { history } = renderAtRouteWithProviders(<AuthenticatedApp />, {
            store,
            routePath: '/app/home',
            initialEntries: [Routes.home],
        });

        expect(history.entries).toHaveLength(1);
        expect(history.entries).toContainEqual(expect.objectContaining({ pathname: Routes.landingPage }));
    });
});
