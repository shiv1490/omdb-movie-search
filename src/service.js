import axios from 'axios';

export async function getMovieList(searchText) {
  const searchQuery = searchText ? searchText.trim() : 'movie';
  let res = [];
  try {
    res = await axios.get(`https://www.omdbapi.com/?apikey=320f6ab2&s=${searchQuery}`);
    return {
      response: !res.data.Error ? res.data.Search : [],
      errorDetails: {
        error: !!res.data.Error,
        errorResponse: res.data.Error,
      },
    };
  } catch (error) {
    return {
      errorDetails: {
        error: true,
        errorResponse: 'Some Error Occurred while fetching results',
      },
      response: [],
    };
  }
}

export async function getMovieDetails(movieId) {
  let res = null;
  try {
    res = await axios.get(`https://www.omdbapi.com/?apikey=320f6ab2&plot=full&i=${movieId}`);
    return {
      response: res.data,
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      response: null,
    };
  }
}
