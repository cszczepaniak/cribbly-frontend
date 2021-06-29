import { Team } from './Team';

export interface Game {
    Round: number;
    Teams: Team[];
    Winner: Team;
    ScoreDifference: number;
}
