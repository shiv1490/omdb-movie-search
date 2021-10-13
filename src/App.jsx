import '@babel/polyfill';
import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
} from '@material-ui/core';
import MovieSearch from './Components/MovieSearch';

export default function App() {
  return (
    <Box data-testid="app-header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GETFLIX</Typography>
        </Toolbar>
      </AppBar>
      <MovieSearch />
    </Box>
  );
}
