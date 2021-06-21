import { createSelector } from 'reselect';
import { RootState } from '../../store/root-reducer';

const selectAuthState = (state: RootState) => state.auth;
export const selectPlayer = createSelector(selectAuthState, state => state.player);
