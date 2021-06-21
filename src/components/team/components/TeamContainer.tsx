import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../shared/auth/auth-hooks';
import { InputChangeCallback } from '../../../shared/types/input-callbacks';
import { useRootSelector } from '../../../store';
import { TeamActions } from '../state/team-reducer';
import { selectPlayerSearch, selectTeam } from '../state/team-selectors';
import { TeamPage } from './TeamPage';

export const TeamContainer: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const team = useRootSelector(selectTeam);
    const { player } = useAuth();

    // player search
    const playerSearch = useRootSelector(selectPlayerSearch);
    const [playerQuery, setPlayerQuery] = useState('');
    const handleSearchPlayerClick = () => {
        dispatch(TeamActions.searchPlayerRequest(playerQuery));
    };
    const handleSearchQueryChange: InputChangeCallback = e => setPlayerQuery(e.target.value);

    // create team
    const [desiredTeamName, setDesiredTeamName] = useState('');
    const handleDesiredTeamNameChange: InputChangeCallback = e => setDesiredTeamName(e.target.value);
    const handleCreateTeamClick = () => {
        if (playerSearch.result && player) {
            dispatch(
                TeamActions.createTeamRequest({
                    name: desiredTeamName,
                    players: [player, playerSearch.result],
                }),
            );
        }
    };
    const handleCancelCreateTeamClick = () => {
        if (playerSearch.hasSearched) {
            dispatch(TeamActions.resetPlayerSearch());
        }
    };

    return (
        <TeamPage
            team={team}
            player={player}
            desiredTeamName={desiredTeamName}
            onDesiredTeamNameChange={handleDesiredTeamNameChange}
            searchQuery={playerQuery}
            playerSearch={playerSearch}
            onSearchPlayerClick={handleSearchPlayerClick}
            onSearchQueryChange={handleSearchQueryChange}
            onCreateTeamClick={handleCreateTeamClick}
            onCancelCreateTeamClick={handleCancelCreateTeamClick}
        />
    );
};
