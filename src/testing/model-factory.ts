import { Tournament } from '../components/tournament/state/tournament-model';
import faker from 'faker';
import { AppSettings } from '../shared/settings/settings-model';
import firebase from 'firebase/app';
import { Player } from '../shared/auth/auth-models';
import { Team } from '../components/team/state/team-model';

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

function createTeam(model: Partial<Team> = {}): Team {
    return {
        id: model.id || faker.datatype.number(),
        name: model.name || faker.name.firstName(),
        players: model.players || createMany(createPlayer, 2),
    };
}

function createMany<T>(creator: (model?: Partial<T>) => T, n: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
        result.push(creator());
    }
    return result;
}

export const ModelFactory = {
    createTournament,
    createAppSettings,
    createUser,
    createPlayer,
    createTeam,
    createMany,
};
