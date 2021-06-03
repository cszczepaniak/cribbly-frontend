import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../../../shared/auth/auth-hooks';
import { PlayerSearch, Team } from '../state/team-model';
import { Player } from '../../../shared/auth/auth-models';
import { TeamCreate } from './TeamCreate';
import { ButtonClickCallback, InputChangeCallback } from '../../../shared/types/change-callbacks';

interface Props {
    team: Team | null;
    desiredTeamName: string;
    onDesiredTeamNameChange: InputChangeCallback;
    searchQuery: string;
    playerSearch: PlayerSearch;
    onSearchPlayerClick: ButtonClickCallback;
    onCreateTeamClick: ButtonClickCallback;
    onSearchQueryChange: InputChangeCallback;
}

export const TeamPage: React.FunctionComponent<Props> = ({
    playerSearch,
    onSearchPlayerClick,
    onSearchQueryChange,
    searchQuery,
    team,
    desiredTeamName,
    onDesiredTeamNameChange,
    onCreateTeamClick,
}) => {
    const [myId, setMyId] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        if (user && myId === 0) {
            const fetchMe = async () => {
                const response = await axios.get<Player>('/api/player', {
                    headers: {
                        Email: user.email,
                    },
                });
                setMyId(response.data.id);
            };
            fetchMe();
        }
    }, [user, myId]);

    if (!team?.name) {
        return (
            <TeamCreate
                teamName={desiredTeamName}
                onTeamNameChange={onDesiredTeamNameChange}
                playerSearch={playerSearch}
                onSearchPlayerClick={onSearchPlayerClick}
                onSearchQueryChange={onSearchQueryChange}
                searchQuery={searchQuery}
                onCancelCreateTeamClick={() => {}}
                onCreateTeamClick={onCreateTeamClick}
            />
        );
    }

    return (
        <>
            <Typography>On team {team.name}</Typography>
            <Typography>Your teammates are:</Typography>
            {team.players
                .filter(p => p.id !== myId)
                .map((p, i) => (
                    <Typography key={i}>{p.name}</Typography>
                ))}
        </>
    );
};
