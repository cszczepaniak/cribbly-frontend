import { ModelFactory } from '../../testing/model-factory';
import { generateState } from '../../testing/redux-test-utils';
import { AuthActions, authReducer, AuthState } from './auth-reducer';

describe('auth reducer', () => {
    describe('sign in request', () => {
        test('sets loading to true', () => {
            const state = generateState(authReducer, AuthActions.signInWithGoogleRequest());

            expect(state.isLoading).toEqual(true);
        });
        test('sets isSignedIn to false', () => {
            const state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
                AuthActions.signInWithGoogleRequest(),
            );

            expect(state.isSignedIn).toEqual(false);
        });
        test('sets user to null', () => {
            const state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
                AuthActions.signInWithGoogleRequest(),
            );

            expect(state.user).toBeNull();
        });
        test('sets player to null', () => {
            const state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
                AuthActions.signInWithGoogleRequest(),
            );

            expect(state.player).toBeNull();
        });
    });

    describe('sign in success', () => {
        test('sets loading to false', () => {
            const state = generateState(
                authReducer,
                AuthActions.signInWithGoogleRequest(),
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
            );

            expect(state.isLoading).toEqual(false);
        });
        test('loads the user into redux', () => {
            const user = ModelFactory.createUser();
            const state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user, player: ModelFactory.createPlayer() }),
            );

            expect(state.user).toEqual(user);
        });
        test('loads the player into redux', () => {
            const player = ModelFactory.createPlayer();
            const state = generateState(authReducer, AuthActions.signInSuccess({ user: null, player }));

            expect(state.player).toEqual(player);
        });
        test('sets isSignedIn to true', () => {
            const state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
            );

            expect(state.isSignedIn).toEqual(true);
        });
    });

    describe('sign out request', () => {
        let state: AuthState;
        beforeEach(() => {
            state = generateState(
                authReducer,
                AuthActions.signInSuccess({ user: ModelFactory.createUser(), player: ModelFactory.createPlayer() }),
                AuthActions.signOutRequest(),
            );
        });
        test('should set user to null', () => {
            expect(state.user).toBeNull();
        });
        test('sets player to null', () => {
            expect(state.player).toBeNull();
        });
        test('should set isSignedIn to false', () => {
            expect(state.isSignedIn).toEqual(false);
        });
    });
});
