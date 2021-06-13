import firebase from 'firebase/app';
import { Action } from 'redux';
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { AppSettings, FirebaseConfig } from '../settings/settings-model';
import { selectSettings, SettingsActions } from '../settings/settings-reducer';
import { AuthActions } from './auth-reducer';
import 'firebase/auth';
import axios, { AxiosResponse } from 'axios';
import { LoginResponse } from './auth-network-models';
import { EventChannel, eventChannel } from '@redux-saga/core';

type AuthFactory = (config: FirebaseConfig) => firebase.auth.Auth;
let authInitialized = false;

function createDefaultAuth(config: FirebaseConfig) {
    if (!authInitialized) {
        firebase.initializeApp(config);
        authInitialized = true;
    }
    return firebase.auth();
}

function* signInWithGoogle(createAuth: AuthFactory) {
    const settings: AppSettings = yield select(selectSettings);
    const auth = createAuth(settings.firebaseConfig);
    yield auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function* signOut(createAuth: AuthFactory) {
    const settings: AppSettings = yield select(selectSettings);
    const auth = createAuth(settings.firebaseConfig);
    yield auth.signOut();
}

function* watchSettings(createAuth: AuthFactory) {
    // we know we have settings at this point
    const settings: AppSettings = yield select(selectSettings);
    const auth = createAuth(settings.firebaseConfig);
    // start watching auth events indefinitely
    yield fork(watchAuthEvents, auth);
}

function* watchAuthEvents(auth: firebase.auth.Auth) {
    const channel: EventChannel<firebase.User | null> = yield call(() =>
        eventChannel(emit =>
            auth.onAuthStateChanged(user => {
                emit({ user });
            }),
        ),
    );
    while (true) {
        const { user }: { user: firebase.User | null } = yield take(channel);
        if (!user) {
            yield put(AuthActions.signOutRequest());
            continue;
        }

        const loginResponse: AxiosResponse<LoginResponse> = yield axios.post('/api/player/login', {
            email: user.email,
            name: user.displayName,
        });

        yield put(
            AuthActions.signInSuccess({
                user: user,
                ...loginResponse.data,
            }),
        );
    }
}

export function createAuthSaga(createAuth = createDefaultAuth): () => Generator<Action> {
    function* authSaga() {
        yield takeEvery(AuthActions.signInWithGoogleRequest.type, signInWithGoogle, createAuth);
        yield takeEvery(AuthActions.signOutRequest.type, signOut, createAuth);
        // as soon as we've loaded settings, run the watchSettings saga
        yield takeEvery(SettingsActions.loadSettingsSuccess.type, watchSettings, createAuth);
    }
    return authSaga;
}
