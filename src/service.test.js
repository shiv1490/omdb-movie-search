import axios from 'axios';
import { getMovieList, getMovieDetails } from './service';

jest.mock('axios');

describe('getMovieList service test suite', () => {
  it('should return success response', async () => {
    const res = {
      data: {
        Search: [{
          Title: 'The Lego Movie', Year: '2014', imdbID: 'tt1490017', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg',
        }],
      },
    };
    axios.get.mockResolvedValueOnce(res);
    const { response, errorDetails } = await getMovieList('Avenger');
    expect(response).toEqual(res.data.Search);
    expect(errorDetails).toEqual({ error: false });
  });

  it('should return response when call succeed but doesnt retrun required response', async () => {
    const res = {
      data: {
        Error: 'Too many result',
      },
    };
    axios.get.mockResolvedValueOnce(res);
    const { response, errorDetails } = await getMovieList();
    expect(response).toEqual([]);
    expect(errorDetails).toEqual({ error: true, errorResponse: 'Too many result' });
  });

  it('should return error response when api call fail', async () => {
    axios.get.mockRejectedValueOnce(new Error());
    const { response, errorDetails } = await getMovieList();
    expect(response).toEqual([]);
    expect(errorDetails).toEqual({ error: true, errorResponse: 'Some Error Occurred while fetching results' });
  });
});

describe('getMovieDetails service test suite', () => {
  it('should return success response for getMovieDetails call', async () => {
    const res = {
      data: {
        Title: 'The Lego Movie', Year: '2014', imdbID: 'tt1490017', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg',
      },
    };
    axios.get.mockResolvedValueOnce(res);
    const { response, error } = await getMovieDetails('12345');
    expect(response).toEqual(res.data);
    expect(error).toEqual(false);
  });

  it('should return error when call failed', async () => {
    axios.get.mockRejectedValueOnce(new Error());
    const { response, error } = await getMovieDetails('12345');
    expect(response).toEqual(null);
    expect(error).toEqual(true);
  });
});
