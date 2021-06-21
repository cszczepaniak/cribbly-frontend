import firebase from 'firebase/app';

interface FakeAuth extends firebase.auth.Auth {
    onAuthStateChangedCallback: firebase.Observer<any, Error> | ((a: firebase.User | null) => any);
    triggerAuthStateChangedEvent: (user: firebase.User | null) => void;
}

interface FakeAuthOptions {
    user: Partial<firebase.User>;
    signInWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
    signOut: () => Promise<void>;
}

let onAuthStateChangedCallback: firebase.Observer<any, Error> | ((a: firebase.User | null) => any) = () => {};

export function createFakeAuth(opts: Partial<FakeAuthOptions> = {}): FakeAuth {
    const userCred: firebase.auth.UserCredential = {
        user: opts.user,
    } as firebase.auth.UserCredential;
    return {
        signInWithPopup: (provider: firebase.auth.AuthProvider) => {
            if (opts.signInWithPopup) {
                opts.signInWithPopup(provider);
            }
            return Promise.resolve(userCred);
        },
        signOut: opts.signOut || (() => Promise.resolve()),
        onAuthStateChanged: cb => (onAuthStateChangedCallback = cb),
        onAuthStateChangedCallback,
        triggerAuthStateChangedEvent: user => {
            (onAuthStateChangedCallback as (a: firebase.User | null) => any)(user);
        },
    } as FakeAuth;
}
