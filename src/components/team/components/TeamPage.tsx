import React from 'react';
import { Typography } from '@material-ui/core';
import { PlayerSearch, Team } from '../state/team-model';
import { Player } from '../../../shared/auth/auth-models';
import { TeamCreate } from './TeamCreate';
import { ButtonClickCallback, InputChangeCallback } from '../../../shared/types/input-callbacks';

interface Props {
    team: Team | null;
    player: Player | null;
    desiredTeamName: string;
    onDesiredTeamNameChange: InputChangeCallback;
    searchQuery: string;
    playerSearch: PlayerSearch;
    onSearchPlayerClick: ButtonClickCallback;
    onSearchQueryChange: InputChangeCallback;
    onCreateTeamClick: ButtonClickCallback;
    onCancelCreateTeamClick: ButtonClickCallback;
}

export const TeamPage: React.FunctionComponent<Props> = ({
    playerSearch,
    onSearchPlayerClick,
    onSearchQueryChange,
    searchQuery,
    team,
    player,
    desiredTeamName,
    onDesiredTeamNameChange,
    onCreateTeamClick,
    onCancelCreateTeamClick,
}) => {
    if (!team?.name) {
        return (
            <TeamCreate
                teamName={desiredTeamName}
                onTeamNameChange={onDesiredTeamNameChange}
                playerSearch={playerSearch}
                onSearchPlayerClick={onSearchPlayerClick}
                onSearchQueryChange={onSearchQueryChange}
                searchQuery={searchQuery}
                onCreateTeamClick={onCreateTeamClick}
                onCancelCreateTeamClick={onCancelCreateTeamClick}
            />
        );
    }

    return (
        <>
            <Typography>On team {team.name}</Typography>
            <Typography>Your teammates are:</Typography>
            {team.players
                .filter(p => p.id !== player?.id)
                .map((p, i) => (
                    <Typography key={i}>{p.name}</Typography>
                ))}
        </>
    );
};
