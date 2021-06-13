import { createFakeAuth } from '../../testing/fake-auth';
import { createSagaTestStore } from '../../testing/redux-test-utils';
import { AuthActions } from './auth-reducer';
import { createAuthSaga } from './auth-saga';
import firebase from 'firebase/app';
import { waitFor } from '@testing-library/react';
import { FakeServer } from '../../testing/fake-server';
import { ModelFactory } from '../../testing/model-factory';
import { Player } from './auth-models';
import { SettingsActions } from '../settings/settings-reducer';

describe('auth saga', () => {
    let player: Player;
    let user: firebase.User;
    beforeEach(() => {
        user = ModelFactory.createUser();
        player = ModelFactory.createPlayer();
    });
    describe('sign in with google', () => {
        test('should call firebase auth with google provider', () => {
            const signInFunc = jest.fn().mockImplementation();
            const fakeAuthFactory = () => createFakeAuth({ signInWithPopup: signInFunc });
            FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: false });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signInWithGoogleRequest());

            expect(signInFunc).toHaveBeenCalledWith(new firebase.auth.GoogleAuthProvider());
        });
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
        describe('user is null', () => {
            test('should dispatch sign out request', async () => {
                const signOutFunc = jest.fn();
                const fakeAuth = createFakeAuth({ signOut: signOutFunc });
                const fakeAuthFactory = () => fakeAuth;

                const settings = ModelFactory.createAppSettings();
                const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
                store.dispatch(SettingsActions.loadSettingsSuccess(settings));

                fakeAuth.triggerAuthStateChangedEvent(null);
                await waitFor(() => expect(store.getActions()).toContainEqual(AuthActions.signOutRequest()));
                await waitFor(() => expect(signOutFunc).toHaveBeenCalledTimes(1));
            });
        });
        describe('user is not null', () => {
            test('should post to login endpoint', async () => {
                const fakeAuth = createFakeAuth();
                const fakeAuthFactory = () => fakeAuth;
                FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: true });

                const settings = ModelFactory.createAppSettings();
                const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
                store.dispatch(SettingsActions.loadSettingsSuccess(settings));

                fakeAuth.triggerAuthStateChangedEvent(user);

                await waitFor(() => expect(FakeServer.executedRequests).toHaveLength(1));
                const req = FakeServer.executedRequests[0];
                expect(req.body).toEqual({ email: user.email, name: user.displayName });
            });

            test('should dispatch login success', async () => {
                const fakeAuth = createFakeAuth();
                const fakeAuthFactory = () => fakeAuth;
                FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning: false });

                const settings = ModelFactory.createAppSettings();
                const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
                store.dispatch(SettingsActions.loadSettingsSuccess(settings));

                fakeAuth.triggerAuthStateChangedEvent(user);

                await waitFor(() =>
                    expect(store.getActions()).toContainEqual(
                        AuthActions.signInSuccess({ user, player, isReturning: false }),
                    ),
                );
            });

            test.each([true, false])(
                'should dispatch login success with appropriate isReturning value [%s]',
                async isReturning => {
                    const fakeAuth = createFakeAuth();
                    const fakeAuthFactory = () => fakeAuth;
                    FakeServer.setupPostRequest('/api/player/login', 200, { player, isReturning });

                    const settings = ModelFactory.createAppSettings();
                    const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
                    store.dispatch(SettingsActions.loadSettingsSuccess(settings));

                    fakeAuth.triggerAuthStateChangedEvent(user);

                    await waitFor(() =>
                        expect(store.getActions()).toContainEqual(
                            AuthActions.signInSuccess({ user, player, isReturning }),
                        ),
                    );
                },
            );
        });
    });
});
