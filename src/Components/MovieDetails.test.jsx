import React from 'react';
import {
  fireEvent, render, cleanup, screen, act,
} from '@testing-library/react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import * as service from '../service';

describe('Getflix test suite', () => {
  it('should render correct elementsn when call succeed ', async () => {
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        Title: 'The Simpsons Movie', Year: '2007', Rated: 'PG-13', Released: '27 Jul 2007', Runtime: '87 min', Genre: 'Animation, Adventure, Comedy', Director: 'David Silverman', Writer: 'James L. Brooks, Matt Groening, Al Jean', Actors: 'Dan Castellaneta, Julie Kavner, Nancy Cartwright', Plot: "Homer adopts a pig who's run away from Krusty Burger after Krusty tried to have him slaughtered, naming the pig \"Spider Pig.\" At the same time, the lake is protected after the audience sink the barge Green Day are on with garbage after they mention the environment. Meanwhile, Spider Pig's waste has filled up a silo in just 2 days, apparently with Homer's help. Homer can't get to the dump quickly so dumps the silo in the lake, polluting it. Russ Cargill, the villainous boss of the EPA, gives Arnold Schwarzenegger, president of the USA, 5 options and forces him to choose 4 (which is, unfortunately, to destroy Springfield) and putting a dome over Springfield to prevent evacuation. Homer, however, has escaped, along with his family. Can he stop the evil Cargill from annihilating his home town, and his family, who have been forced to return to Springfield?", Language: 'English', Country: 'United States', Awards: '5 wins & 34 nominations total', Poster: 'https://m.media-amazon.com/images/M/MV5BMTgxMDczMTA5N15BMl5BanBnXkFtZTcwMzk1MzMzMw@@._V1_SX300.jpg', Ratings: [{ Source: 'Internet Movie Database', Value: '7.3/10' }, { Source: 'Rotten Tomatoes', Value: '87%' }, { Source: 'Metacritic', Value: '80/100' }], Metascore: '80', imdbRating: '7.3', imdbVotes: '318,021', imdbID: 'tt0462538', Type: 'movie', DVD: '18 Dec 2007', BoxOffice: '$183,135,014', Production: 'Gracie Films', Website: 'N/A', Response: 'True',
      },
    }));
    const props = {
      movieId: '12345',
      setModalOpen: jest.fn(),
    };
    jest.spyOn(service, 'getMovieDetails');
    await act(async () => {
      render(<MovieDetails {...props} />);
    });

    expect(screen.getByText(/87/i));
    expect(screen.getByText(/Animation/i));
    expect(screen.getByText(/Castellaneta/i));
    expect(screen.getByAltText(/Simpsons/i));
    expect(service.getMovieDetails).toHaveBeenCalledTimes(1);
    const errorNode = screen.queryAllByText('Some Error occurred while fetching Details for movie');
    expect(errorNode).toHaveLength(0);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(props.setModalOpen).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correct elements when call failed ', async () => {
    axios.get = jest.fn(() => Promise.reject(new Error('something bad happened')));
    const props = {
      movieId: '12345',
      setModalOpen: jest.fn(),
    };
    jest.spyOn(service, 'getMovieDetails');
    await act(async () => {
      render(<MovieDetails {...props} />);
    });

    expect(service.getMovieDetails).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByText('Some Error occurred while fetching Details for movie'));
    const successNode = screen.queryAllByText(/Simpsons/i);
    expect(successNode).toHaveLength(0);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(props.setModalOpen).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
    cleanup();
  });
});
