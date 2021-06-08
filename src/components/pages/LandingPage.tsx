import React, { useEffect } from 'react';
import { Button, Container, makeStyles, Typography, withStyles } from '@material-ui/core';
import moment from 'moment';
import { useRootSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { TournamentActions } from '../tournament/state/tournament-reducer';
import { useAuth } from '../../shared/auth/auth-hooks';
import { AuthActions } from '../../shared/auth/auth-reducer';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../shared/routing/routes';

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

const nextTournamentText = (isLoading: boolean, isOpenForRegistration: boolean, date: string): string => {
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

    const { isSignedIn, isLoading: authIsLoading } = useAuth();
    const {
        isLoading: tournamentIsLoading,
        tournament: { date, isOpenForRegistration },
    } = useRootSelector(state => state.tournament);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TournamentActions.loadNextTournamentRequest());
    }, [dispatch]);

    const handleSignInClick = () => {
        dispatch(AuthActions.signInWithGoogleRequest());
    };

    if (isSignedIn) {
        return <Redirect to={Routes.home} />;
    }
    if (authIsLoading) {
        return <div>loading</div>;
    }
    return (
        <Container maxWidth='sm' className={classes.landingPageContainer}>
            <div className={classes.landingPageContent}>
                <div>
                    <Typography variant='h2'>Welcome to Cribbly.</Typography>
                    <Typography align='center'>
                        {nextTournamentText(tournamentIsLoading, isOpenForRegistration, date)}
                    </Typography>
                </div>
                <CallToActionButton
                    aria-label='sign in'
                    onClick={handleSignInClick}
                    color='primary'
                    variant='contained'
                >
                    Get Started
                </CallToActionButton>
            </div>
        </Container>
    );
};
