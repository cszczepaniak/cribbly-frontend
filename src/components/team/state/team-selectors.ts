import { createSelector } from 'reselect';
import { RootState } from '../../../store/root-reducer';

const selectTeamState = (state: RootState) => state.team;
export const selectPlayerSearch = createSelector(selectTeamState, state => state.playerSearch);
export const selectTeam = createSelector(selectTeamState, state => state.team);
