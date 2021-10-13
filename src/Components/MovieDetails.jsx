import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
} from '@material-ui/core';
import { getMovieDetails } from '../service';
import movieDetailsStyles from '../styles';

const MovieDetails = ({ movieId, setModalOpen }) => {
  const [movieDetails, setMovieDetails] = useState();
  const [isError, setIsError] = useState(false);
  const classes = movieDetailsStyles();
  useEffect(() => {
    const apiList = async () => {
      const { response, error } = await getMovieDetails(movieId);
      setMovieDetails(response || []);
      setIsError(error);
    };
    apiList();
  }, [movieId]);

  return (
    <>
      <DialogTitle>Details</DialogTitle>
      <DialogContent data-testid="test">
        <Grid container>
          {movieDetails && (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <img className={classes.posterImage} src={movieDetails.Poster} alt={movieDetails.Title} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box p={2}>
                <Typography variant="h4" gutterBottom>
                  {movieDetails.Title}
                </Typography>

                <Chip className={classes.chip} label={movieDetails.Runtime} />
                <Chip className={classes.chip} label={movieDetails.Genre} />
                <Chip className={classes.chip} label={movieDetails.Rated} />
                <Box className={classes.boxwrapper} my={1} py={1}>
                  <Typography variant="h6" gutterBottom>
                    Cast
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {movieDetails.Actors}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Plot
                </Typography>
                <Typography variant="body1">
                  {movieDetails.Plot}
                </Typography>
              </Box>
            </Grid>
          </>
          )}
          {isError && (
          <Typography variant="body1">
            Some Error occurred while fetching Details for movie
          </Typography>
          )}
          <Box />
        </Grid>
        <Box />

      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
      </DialogActions>
    </>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default MovieDetails;
