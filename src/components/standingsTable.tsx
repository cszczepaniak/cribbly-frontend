import React from 'react';
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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(
    name: string,
    division: string,
    rank: number,
    totalScore: number,
    wins: number,
    losses: number,
) {
    return {
        name,
        division,
        rank,
        totalScore,
        wins,
        losses,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
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
                    {row.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                    {row.division}
                </TableCell>
                <TableCell align='right'>{row.rank}</TableCell>
                <TableCell align='right'>{row.totalScore}</TableCell>
                <TableCell align='right'>{row.wins}</TableCell>
                <TableCell align='right'>{row.losses}</TableCell>
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
                                <li>Adam S</li>
                                <li>Connor S</li>
                            </ul>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Frozen yoghurt', 'Division', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 'Division', 237, 9.0, 37, 4.3),
    createData('Eclair', 'Division', 262, 16.0, 24, 6.0),
    createData('Cupcake', 'Division', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 'Division', 356, 16.0, 49, 3.9),
];

export function StandingsTable() {
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
                    {rows.map(row => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
