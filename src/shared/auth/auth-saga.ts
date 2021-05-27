import firebase from 'firebase/app';
import { Action } from 'redux';
import { put, select, takeEvery } from 'redux-saga/effects';
import { AppSettings, FirebaseConfig } from '../settings/settings-model';
import { selectSettings } from '../settings/settings-reducer';
import { AuthActions } from './auth-reducer';
import 'firebase/auth';

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
    const res: firebase.auth.UserCredential = yield auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    yield put(AuthActions.signInSucess(res.user));
}

function* signOut(createAuth: AuthFactory) {
    const settings: AppSettings = yield select(selectSettings);
    const auth = createAuth(settings.firebaseConfig);
    yield auth.signOut();
}

export function createAuthSaga(createAuth = createDefaultAuth): () => Generator<Action> {
    function* authSaga() {
        yield takeEvery(AuthActions.signInWithGoogleRequest.type, signInWithGoogle, createAuth);
        yield takeEvery(AuthActions.signOutRequest.type, signOut, createAuth);
    }
    return authSaga;
}
