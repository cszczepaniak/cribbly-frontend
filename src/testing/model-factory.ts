import { Tournament } from '../components/tournament/state/tournament-model';
import faker from 'faker';

function createTournament(model: Partial<Tournament> = {}): Tournament {
    return {
        id: model.id || faker.datatype.number(),
        date: model.date || faker.date.future().toISOString(),
        isActive: model.isActive === undefined ? faker.datatype.boolean() : model.isActive,
        isOpenForRegistration:
            model.isOpenForRegistration === undefined ? faker.datatype.boolean() : model.isOpenForRegistration,
    };
}

export const ModelFactory = {
    createTournament,
};
