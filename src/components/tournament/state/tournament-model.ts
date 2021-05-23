export interface Tournament {
    id: number;
    date: Date;
    isActive: boolean;
    isOpenForRegistration: boolean;
}

export const initialTournament: Tournament = {
    id: 0,
    date: new Date(2020, 1, 1),
    isActive: false,
    isOpenForRegistration: false,
};
