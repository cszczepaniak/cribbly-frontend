import React from 'react';
import { TeamContainer } from './TeamContainer';
import { renderWithProviders } from '../../../testing/render';
import { createTestStore } from '../../../testing/redux-test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { TeamActions } from '../state/team-reducer';
import { ModelFactory } from '../../../testing/model-factory';
import { AuthActions } from '../../../shared/auth/auth-reducer';

describe('TeamPage', () => {
    describe('player search', () => {
        test('typing into the search bar displays typed value', () => {
            const store = createTestStore();
            renderWithProviders(<TeamContainer />, { store });

            userEvent.type(screen.getByRole('textbox', { name: 'search' }), 'search query');

            expect(screen.getByRole('textbox', { name: 'search' })).toHaveDisplayValue('search query');
        });

        test('clicking search button dispatches search request', () => {
            const store = createTestStore();
            renderWithProviders(<TeamContainer />, { store });

            userEvent.type(screen.getByRole('textbox', { name: 'search' }), 'search query');
            userEvent.click(screen.getByRole('button', { name: 'search' }));

            expect(store.getActions()).toContainEqual(TeamActions.searchPlayerRequest('search query'));
        });

        test('a successful search shows the found player', () => {
            const player = ModelFactory.createPlayer();
            const store = createTestStore(TeamActions.searchPlayerSuccess(player));
            const { container } = renderWithProviders(<TeamContainer />, { store });

            expect(container).toHaveTextContent(player.name);
            expect(container).toHaveTextContent(player.id.toString());
        });

        test('a search that turns up no results displays appropriate message with search query', () => {
            const store = createTestStore(
                TeamActions.searchPlayerRequest('search query'),
                TeamActions.searchPlayerNotFound(),
            );
            const { container } = renderWithProviders(<TeamContainer />, { store });

            expect(container).toHaveTextContent('Player not found with email "search query"');
        });

        test('a search that turns up no results displays search query even when input changes again', () => {
            const store = createTestStore(
                TeamActions.searchPlayerRequest('search query'),
                TeamActions.searchPlayerNotFound(),
            );
            const { container } = renderWithProviders(<TeamContainer />, { store });

            userEvent.type(screen.getByRole('textbox', { name: 'search' }), 'this is a different query');

            expect(container).toHaveTextContent('Player not found with email "search query"');
        });
    });

    describe('create team', () => {
        test('clicking create team should dispatch create request', () => {
            const me = ModelFactory.createPlayer();
            const other = ModelFactory.createPlayer();
            const team = ModelFactory.createTeam({ players: [me, other] });
            const { id: _, ...request } = team;

            const store = createTestStore(
                AuthActions.signInSuccess({ user: null, player: me, isReturning: false }),
                TeamActions.searchPlayerSuccess(other),
            );

            renderWithProviders(<TeamContainer />, { store });

            userEvent.type(screen.getByRole('textbox', { name: 'team name' }), team.name);
            userEvent.click(screen.getByRole('button', { name: 'create team' }));

            expect(store.getActions()).toContainEqual(TeamActions.createTeamRequest(request));
        });

        test('clicking cancel should dispatch reset search request', () => {
            const me = ModelFactory.createPlayer();
            const other = ModelFactory.createPlayer();

            const store = createTestStore(
                AuthActions.signInSuccess({ user: null, player: me, isReturning: false }),
                TeamActions.searchPlayerSuccess(other),
            );

            renderWithProviders(<TeamContainer />, { store });

            userEvent.click(screen.getByRole('button', { name: 'cancel' }));

            expect(store.getActions()).toContainEqual(TeamActions.resetPlayerSearch());
        });
    });

    describe('when on a team', () => {
        test('should show team name', () => {
            const me = ModelFactory.createPlayer();
            const other = ModelFactory.createPlayer();
            const team = ModelFactory.createTeam({ players: [me, other] });

            const store = createTestStore(
                AuthActions.signInSuccess({ user: null, player: me, isReturning: false }),
                TeamActions.loadTeamSuccess(team),
            );

            const { container } = renderWithProviders(<TeamContainer />, { store });

            expect(container).toHaveTextContent(team.name);
        });

        test('should show other player names', () => {
            const me = ModelFactory.createPlayer();
            const other = ModelFactory.createPlayer();
            const team = ModelFactory.createTeam({ players: [me, other] });

            const store = createTestStore(
                AuthActions.signInSuccess({ user: null, player: me, isReturning: false }),
                TeamActions.loadTeamSuccess(team),
            );

            const { container } = renderWithProviders(<TeamContainer />, { store });

            expect(container).not.toHaveTextContent(me.name);
            expect(container).toHaveTextContent(other.name);
        });
    });
});
