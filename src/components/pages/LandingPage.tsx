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

export const LandingPage = () => {
  const classes = useStyles();
  const { isSignedIn, loading, signInWithGoogle } = useAuth();
  if (loading) {
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
            Next tournament starts on March 14, 2021
          </Typography>
        </div>
        <CallToActionButton
          onClick={signInWithGoogle}
          color='primary'
          variant='contained'
        >
          Get Started
        </CallToActionButton>
      </div>
    </Container>
  );
};
