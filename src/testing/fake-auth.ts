import faker from 'faker';
import firebase from 'firebase/app';

interface FakeAuth extends firebase.auth.Auth {}

interface FakeUserOptions {
    email: string;
    getIdToken: () => Promise<string>;
}

interface FakeAuthOptions {
    user: Partial<FakeUserOptions>;
    signInWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
    signOut: () => Promise<void>;
}

export function createFakeAuth(opts: Partial<FakeAuthOptions> = {}): FakeAuth {
    const userCred: firebase.auth.UserCredential = {
        user: {
            getIdToken: opts.user?.getIdToken || (() => Promise.resolve('')),
            email: opts.user?.email || faker.internet.email,
        } as firebase.User,
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
