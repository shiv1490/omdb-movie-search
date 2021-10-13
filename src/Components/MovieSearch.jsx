import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  CardActionArea,
  Dialog,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@material-ui/core';
import debounce from 'lodash.debounce';
import { getMovieList } from '../service';
import MovieDetails from './MovieDetails';

const MovieSearch = () => {
  const [movieList, setMovieList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMovieId, setActiveMovieId] = useState('');
  const [isError, setIsError] = useState(false);

  const apiList = async (searchText) => {
    setIsLoading(true);
    const { response, errorDetails } = await getMovieList(searchText);
    setMovieList(response);
    setIsError(errorDetails);
    setIsLoading(false);
  };

  const delayedSearchHandler = useCallback(debounce((searchText) => apiList(searchText), 500), []);

  useEffect(() => {
    apiList('movie');
  }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{
        display: 'flex', justifyContent: 'end', m: 2, p: 2,
      }}
      >
        <TextField
          size="small"
          label="Search Movie name"
          inputProps={{
            'data-testid': 'movieinput',
          }}
          variant="standard"
          style={{ width: '50%' }}
          onChange={(e) => delayedSearchHandler(e.target.value)}
        />
      </Box>
      <Box m={2} p={2}>
        <Grid container spacing={3} alignItems="stretch">
          {movieList.length > 0 && (
            movieList.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
                <Card
                  raised
                  style={{
                    height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}
                >
                  <CardActionArea onClick={() => { setModalOpen(true); setActiveMovieId(movie.imdbID); }}>
                    <CardMedia
                      component="img"
                      height="190"
                      image={movie.Poster}
                      alt={movie.Title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {movie.Title}
                      </Typography>
                      <Typography variant="body1">
                        {movie.Year}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        {isError.error && (
        <Box sx={{
          flexDirection: 'row', display: 'flex', justifyContent: 'center', mt: 3,
        }}
        >
          <Typography variant="h4">
            {isError.errorResponse}
          </Typography>
        </Box>

        )}
        {isLoading && (
        <Box sx={{
          flexDirection: 'row', display: 'flex', justifyContent: 'center', mt: 3,
        }}
        >
          <CircularProgress />
        </Box>
        )}
      </Box>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
      >
        <MovieDetails movieId={activeMovieId} setModalOpen={setModalOpen} />
      </Dialog>

    </>
  );
};

export default MovieSearch;
