import { Tournament } from '../components/tournament/state/tournament-model';
import faker from 'faker';
import { AppSettings } from '../shared/settings/settings-model';
import firebase from 'firebase/app';
import { Player } from '../models/Player';

function createTournament(model: Partial<Tournament> = {}): Tournament {
    return {
        id: model.id || faker.datatype.number(),
        date: model.date || faker.date.future().toISOString(),
        isActive: model.isActive === undefined ? faker.datatype.boolean() : model.isActive,
        isOpenForRegistration:
            model.isOpenForRegistration === undefined ? faker.datatype.boolean() : model.isOpenForRegistration,
    };
}

function createAppSettings(model: Partial<AppSettings> = {}): AppSettings {
    return {
        firebaseConfig: {
            apiKey: faker.datatype.string(),
            appId: faker.datatype.string(),
            authDomain: faker.datatype.string(),
            messagingSenderId: faker.datatype.string(),
            projectId: faker.datatype.string(),
            storageBucket: faker.datatype.string(),
        },
    };
}

function createUser(model: Partial<firebase.User> = {}): firebase.User {
    return {
        displayName: model.displayName || faker.name.firstName(),
        email: model.email || faker.internet.email(),
        emailVerified: model.emailVerified ?? faker.datatype.boolean(),
        isAnonymous: model.isAnonymous ?? faker.datatype.boolean(),
        phoneNumber: model.phoneNumber || faker.phone.phoneNumber(),
        refreshToken: model.refreshToken || faker.git.commitSha(),
        getIdToken: model.getIdToken || (() => Promise.resolve(faker.git.commitSha())),
    } as firebase.User;
}

function createPlayer(model: Partial<Player> = {}): Player {
    return {
        email: model.email || faker.internet.email(),
        id: model.id || faker.datatype.number(),
        name: model.name || faker.name.firstName(),
    };
}

export const ModelFactory = {
    createTournament,
    createAppSettings,
    createUser,
    createPlayer,
};
