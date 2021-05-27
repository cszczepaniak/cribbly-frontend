import { ModelFactory } from '../../testing/model-factory';
import { generateState } from '../../testing/redux-test-utils';
import { AuthActions, authReducer } from './auth-reducer';

describe('auth reducer', () => {
    test('sign in request sets loading to true', () => {
        const state = generateState(authReducer, AuthActions.signInWithGoogleRequest());

        expect(state.isLoading).toEqual(true);
    });
    test('sign in request sets isSignedIn to false', () => {
        const state = generateState(
            authReducer,
            AuthActions.signInSucess(ModelFactory.createUser()),
            AuthActions.signInWithGoogleRequest(),
        );

        expect(state.isSignedIn).toEqual(false);
    });
    test('sign in request sets user to null', () => {
        const state = generateState(
            authReducer,
            AuthActions.signInSucess(ModelFactory.createUser()),
            AuthActions.signInWithGoogleRequest(),
        );

        expect(state.user).toBeNull();
    });
    test('sign in success sets loading to false', () => {
        const state = generateState(
            authReducer,
            AuthActions.signInWithGoogleRequest(),
            AuthActions.signInSucess(ModelFactory.createUser()),
        );

        expect(state.isLoading).toEqual(false);
    });
    test('sign in success loads the user into redux', () => {
        const user = ModelFactory.createUser();
        const state = generateState(authReducer, AuthActions.signInSucess(user));

        expect(state.user).toEqual(user);
    });
    test('sign in success sets isSignedIn to true', () => {
        const state = generateState(authReducer, AuthActions.signInSucess(ModelFactory.createUser()));

        expect(state.isSignedIn).toEqual(true);
    });
    test('sign out request should set user to null', () => {
        const state = generateState(
            authReducer,
            AuthActions.signInSucess(ModelFactory.createUser()),
            AuthActions.signOutRequest(),
        );

        expect(state.user).toBeNull();
    });
    test('sign out request should set isSignedIn to false', () => {
        const state = generateState(
            authReducer,
            AuthActions.signInSucess(ModelFactory.createUser()),
            AuthActions.signOutRequest(),
        );

        expect(state.isSignedIn).toEqual(false);
    });
});
