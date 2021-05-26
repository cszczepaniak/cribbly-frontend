import { Tournament } from '../components/tournament/state/tournament-model';
import faker from 'faker';
import { AppSettings } from '../shared/settings/settings-model';

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

export const ModelFactory = {
    createTournament,
    createAppSettings,
};
