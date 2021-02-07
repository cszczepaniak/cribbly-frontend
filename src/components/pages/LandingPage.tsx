import React from 'react';
import {
    Button,
    Container,
    makeStyles,
    Typography,
    withStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AccessPrivateDataButton } from '../AccessPrivateDataButton';
import { useTournament } from '../../hooks/useTournament';
import moment from 'moment';

const useStyles = makeStyles({
    landingPageContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landingPageContent: {
        height: '25vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

const CallToActionButton = withStyles({
    root: {
        height: '5vh',
        fontSize: '1.5rem',
        textTransform: 'none',
        margin: '0 5rem',
    },
})(Button);

const nextTournamentText = (
    isLoading: boolean,
    isOpenForRegistration: boolean,
    date: Date,
): string => {
    if (isLoading) {
        return 'Loading tournament details...';
    }
    if (isOpenForRegistration) {
        return `Next tournament is on ${moment(date).format('MMMM Do, YYYY')}!`;
    }
    return 'No tournament is scheduled. You can still register to be prepared for future tournaments!';
};

export const LandingPage = () => {
    const classes = useStyles();
    const { isSignedIn, loading: authIsLoading, signInWithGoogle } = useAuth();
    const {
        date,
        isLoading: tournamentIsLoading,
        isOpenForRegistration,
    } = useTournament();
    if (authIsLoading) {
        return <div>loading</div>;
    }
    if (isSignedIn) {
        return <Redirect to='/home' />;
    }
    return (
        <Container maxWidth='sm' className={classes.landingPageContainer}>
            <div className={classes.landingPageContent}>
                <div>
                    <Typography variant='h2'>Welcome to Cribbly.</Typography>
                    <Typography align='center'>
                        {nextTournamentText(
                            tournamentIsLoading,
                            isOpenForRegistration,
                            date,
                        )}
                    </Typography>
                </div>
                <CallToActionButton
                    onClick={signInWithGoogle}
                    color='primary'
                    variant='contained'
                >
                    Get Started
                </CallToActionButton>
                <AccessPrivateDataButton />
            </div>
        </Container>
    );
};
