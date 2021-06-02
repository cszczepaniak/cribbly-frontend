import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { TeamSearch } from './TeamSearch';
import { Player } from '../../models/Player';
import { Team } from '../../models/Team';
import { useAuth } from '../../shared/auth/auth-hooks';
import { PageWrapper } from '../layout/PageWrapper';

const defaultPlayer: Player = {
    id: 0,
    name: '',
    email: '',
};

const defaultTeam: Team = {
    name: '',
    players: [],
};

export const TeamPage = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(defaultPlayer);
    const [team, setTeam] = useState<Team>(defaultTeam);
    const [myId, setMyId] = useState(0);
    const [teamName, setTeamName] = useState('');
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

    const onClickCreate = async () => {
        const teamRequest: Team = {
            name: teamName,
            players: [
                {
                    id: myId,
                    name: '',
                    email: '',
                },
                selectedPlayer,
            ],
        };
        const teamCreateResponse = await axios.post<number>('/api/team', teamRequest);
        const teamGetResponse = await axios.get<Team>(`/api/team/${teamCreateResponse.data}`);
        setTeam(teamGetResponse.data);
    };

    return (
        <PageWrapper>
            <TeamSearch onSearch={p => setSelectedPlayer(p)} />
            {selectedPlayer.name.length > 0 && (
                <div>
                    <Typography>
                        Found player: {selectedPlayer.name} with id {selectedPlayer.id}. Choose a team name:
                    </Typography>
                    <TextField
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder='Desired team name...'
                        variant='outlined'
                    />
                    <div>
                        <Button disabled={myId === 0} onClick={onClickCreate}>
                            Create Team
                        </Button>
                        <Button color='default' onClick={() => setSelectedPlayer(defaultPlayer)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            {team.name.length > 0 && (
                <>
                    <Typography>On team {team.name}</Typography>
                    <Typography>Your teammates are:</Typography>
                    {team.players
                        .filter(p => p.id !== myId)
                        .map((p, i) => (
                            <Typography key={i}>{p.name}</Typography>
                        ))}
                </>
            )}
        </PageWrapper>
    );
};
