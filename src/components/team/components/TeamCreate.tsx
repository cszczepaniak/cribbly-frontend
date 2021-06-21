import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { PlayerSearch } from '../state/team-model';

const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
    },
}));

interface Props {
    searchQuery: string;
    onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchPlayerClick: () => void;
    playerSearch: PlayerSearch;
    teamName: string;
    onTeamNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCreateTeamClick: () => void;
    onCancelCreateTeamClick: () => void;
}

export const TeamCreate: React.FunctionComponent<Props> = ({
    searchQuery,
    onSearchQueryChange,
    onSearchPlayerClick,
    playerSearch,
    teamName,
    onTeamNameChange,
    onCreateTeamClick,
    onCancelCreateTeamClick,
}) => {
    const classes = useStyles();
    return (
        <div>
            <Typography>You're not on a team yet. Type a player's email in below to start creating a team.</Typography>
            <TextField
                variant='outlined'
                fullWidth
                placeholder='Enter an email address...'
                value={searchQuery}
                onChange={onSearchQueryChange}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Button aria-label='search' onClick={onSearchPlayerClick}>
                Search
            </Button>
            {playerSearch.hasSearched && !playerSearch.result && (
                <Typography
                    className={classes.error}
                >{`Player not found with email "${playerSearch.executedQuery}"`}</Typography>
            )}
            {playerSearch.result && (
                <>
                    <Typography>
                        Found player: {playerSearch.result.name} with id {playerSearch.result.id}. Choose a team name:
                    </Typography>
                    <TextField
                        value={teamName}
                        onChange={onTeamNameChange}
                        placeholder='Desired team name...'
                        variant='outlined'
                        inputProps={{ 'aria-label': 'team name' }}
                    />
                    <div>
                        <Button aria-label='create team' onClick={onCreateTeamClick}>
                            Create Team
                        </Button>
                        <Button aria-label='cancel' color='default' onClick={onCancelCreateTeamClick}>
                            Cancel
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
