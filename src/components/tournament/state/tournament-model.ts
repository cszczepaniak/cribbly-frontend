export interface Tournament {
    id: number;
    date: string;
    isActive: boolean;
    isOpenForRegistration: boolean;
}

export const initialTournament: Tournament = {
    id: 0,
    date: '',
    isActive: false,
    isOpenForRegistration: false,
};
