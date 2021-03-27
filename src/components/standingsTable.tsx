import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Team(
    id: number,
    name: string,
    players: ReturnType<typeof Player>[],
    division: string,
    rank: number,
    totalScore: number,
    wins: number,
    losses: number,
) {
    return {
        id,
        name,
        players,
        division,
        rank,
        totalScore,
        wins,
        losses,
    };
}

function Player(name: string, email: string) {
    return {
        name,
        email,
    };
}

function Row(props: { team: ReturnType<typeof Team> }) {
    const { team } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {team.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {team.division}
                </TableCell>
                <TableCell align='right'>{team.rank}</TableCell>
                <TableCell align='right'>{team.totalScore}</TableCell>
                <TableCell align='right'>{team.wins}</TableCell>
                <TableCell align='right'>{team.losses}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                >
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                            >
                                Players
                            </Typography>
                            <ul>
                                {team.players.map(player => (
                                    <li key={player.name}>{player.name}</li>
                                ))}
                            </ul>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export function StandingsTable() {
    const [teams, setTeams] = React.useState([
        {
            id: 0,
            name: '',
            rank: 0,
            totalScore: 0,
            wins: 0,
            losses: 0,
            division: '',
            players: [
                {
                    name: '',
                    email: '',
                },
            ],
        },
    ]);

    useEffect(() => {
        const getTeams = async () => {
            const res = await axios.get('/api/team');
            setTeams(res.data);
        };
        getTeams();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Team Name</TableCell>
                        <TableCell>Division</TableCell>
                        <TableCell align='right'>Rank</TableCell>
                        <TableCell align='right'>Total Score</TableCell>
                        <TableCell align='right'>Wins</TableCell>
                        <TableCell align='right'>Losses</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map(team => (
                        <Row key={team.id} team={team} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
