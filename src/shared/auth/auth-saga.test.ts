import { createFakeAuth } from '../../testing/fake-auth';
import { createSagaTestStore } from '../../testing/redux-test-utils';
import { AuthActions } from './auth-reducer';
import { createAuthSaga } from './auth-saga';
import firebase from 'firebase/app';
import { waitFor } from '@testing-library/react';
import { FakeServer } from '../../testing/fake-server';
import { ModelFactory } from '../../testing/model-factory';
import { Player } from './auth-models';

describe('auth saga', () => {
    describe('sign in with google', () => {
        let player: Player;
        let user: firebase.User;
        beforeEach(() => {
            user = ModelFactory.createUser();
            player = ModelFactory.createPlayer();
        });
        test('should call firebase auth with google provider', () => {
            const signInFunc = jest.fn().mockImplementation();
            const fakeAuthFactory = () => createFakeAuth({ signInWithPopup: signInFunc });
            FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: false });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signInWithGoogleRequest());

            expect(signInFunc).toHaveBeenCalledWith(new firebase.auth.GoogleAuthProvider());
        });
        test('should POST to the login endpoint with email and name', async () => {
            const fakeAuthFactory = () => createFakeAuth({ user });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: false });

            store.dispatch(AuthActions.signInWithGoogleRequest());

            await waitFor(() => expect(FakeServer.executedRequests.length).toEqual(1));
            const body = FakeServer.executedRequests[0].body;
            expect(body).toEqual({ email: user.email, name: user.displayName });
        });

        test('should dispatch sign in success action when successful', async () => {
            const fakeAuthFactory = () => createFakeAuth({ user });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: false });

            store.dispatch(AuthActions.signInWithGoogleRequest());

            await waitFor(() =>
                expect(store.getActions()).toContainEqual(
                    AuthActions.signInSuccess({ user, player, isReturning: false }),
                ),
            );
        });

        test.each([true, false])(
            'should dispatch a sign in success action with the appropriate isReturning value',
            async isReturning => {
                FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning });
                const fakeAuthFactory = () => createFakeAuth({ user });
                const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
                store.dispatch(AuthActions.signInWithGoogleRequest());

                await waitFor(() =>
                    expect(store.getActions()).toContainEqual(AuthActions.signInSuccess({ user, player, isReturning })),
                );
            },
        );
    });

    describe('sign out', () => {
        test('should call sign out', () => {
            const signOutFunc = jest.fn();
            const fakeAuthFactory = () => createFakeAuth({ signOut: signOutFunc });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signOutRequest());

            expect(signOutFunc).toHaveBeenCalledTimes(1);
        });
    });

    describe('auth state change subscription', () => {
        test('should dispatch sign out request when an auth state change happens and user is null', async () => {
            const signOutFunc = jest.fn();
            const fakeAuth = createFakeAuth({ signOut: signOutFunc });
            const fakeAuthFactory = () => fakeAuth;
            FakeServer.setupPostRequest('/api/player/login', 200, {
                player: ModelFactory.createPlayer(),
                isReturning: false,
            });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signInWithGoogleRequest());
            await waitFor(() =>
                expect(store.getActions()).toContainEqual(AuthActions.signInSuccess(expect.objectContaining({}))),
            );
            fakeAuth.triggerAuthStateChangedEvent(null);

            await waitFor(() => expect(store.getActions()).toContainEqual(AuthActions.signOutRequest()));
            await waitFor(() => expect(signOutFunc).toHaveBeenCalledTimes(1));
        });
    });
});
