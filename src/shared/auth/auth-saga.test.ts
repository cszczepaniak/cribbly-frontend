import { createFakeAuth } from '../../testing/fake-auth';
import { createSagaTestStore } from '../../testing/redux-test-utils';
import { AuthActions } from './auth-reducer';
import { createAuthSaga } from './auth-saga';
import firebase from 'firebase/app';
import { waitFor } from '@testing-library/react';

describe('auth saga', () => {
    describe('sign in with google', () => {
        test('should call firebase auth with google provider', () => {
            const signInFunc = jest.fn().mockImplementation();
            const fakeAuthFactory = () => createFakeAuth({ signInWithPopup: signInFunc });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signInWithGoogleRequest());

            expect(signInFunc).toHaveBeenCalledWith(new firebase.auth.GoogleAuthProvider());
        });

        test('should dispatch a sign in success action', async () => {
            const fakeAuthFactory = () => createFakeAuth({ user: { email: 'yo yo yo' } });
            const store = createSagaTestStore(createAuthSaga(fakeAuthFactory));
            store.dispatch(AuthActions.signInWithGoogleRequest());

            await waitFor(() =>
                expect(store.getActions()).toContainEqual(
                    AuthActions.signInSucess(expect.objectContaining({ email: 'yo yo yo' } as firebase.User)),
                ),
            );
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
});
