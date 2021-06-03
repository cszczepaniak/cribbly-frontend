import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { PlayerSearch } from '../state/team-model';
import { TeamSearch } from './TeamSearch';

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
            <TeamSearch
                searchQuery={searchQuery}
                onSearchQueryChange={onSearchQueryChange}
                onSearchPlayerClick={onSearchPlayerClick}
            />
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
