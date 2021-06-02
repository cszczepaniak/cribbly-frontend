import firebase from 'firebase/app';

interface FakeAuth extends firebase.auth.Auth {}

interface FakeAuthOptions {
    user: Partial<firebase.User>;
    signInWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
    signOut: () => Promise<void>;
}

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
    } as firebase.auth.Auth;
}
