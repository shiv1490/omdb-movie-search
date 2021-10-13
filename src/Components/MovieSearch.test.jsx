import React from 'react';
import {
  render, cleanup, screen, act,
} from '@testing-library/react';
import axios from 'axios';
import MovieSearch from './MovieSearch';
import * as service from '../service';

describe('Getflix test suite', () => {
  it('should render correct elements when call succeed ', async () => {
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        Search: [{
          Title: 'The Lego Movie',
          Year: '2014',
          imdbID: 'tt1490017',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg',
        }],
        errorDetails: {
          error: false,
        },
      },
    }));

    jest.spyOn(service, 'getMovieList');
    await act(async () => {
      render(<MovieSearch />);
    });

    expect(screen.getByText('2014'));
    expect(screen.getByText('The Lego Movie'));
    expect(screen.getByAltText('The Lego Movie'));
    expect(service.getMovieList).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    cleanup();
  });

  it('should render error elements when call failed ', async () => {
    axios.get = jest.fn(() => Promise.reject(new Error()));
    jest.spyOn(service, 'getMovieDetails');
    await act(async () => {
      render(<MovieSearch />);
    });
    expect(service.getMovieList).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByText('Some Error Occurred while fetching results'));
    jest.clearAllMocks();
    cleanup();
  });
});
