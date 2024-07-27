import axios from 'axios';
import {API_KEY} from '../../constants';

// endpoints
const baseUrl = `https://api.themoviedb.org/3`;
const trendingEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;
const popularPeopleEndpoint = `${baseUrl}/person/popular?api_key=${API_KEY}`;
const genresEndpoint = `${baseUrl}/genre/movie/list?api_key=${API_KEY}`;

const apiCall = async (endpoint: string, params?: Record<string, unknown>) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log('ERROR:', err);
    return {};
  }
};

export const fetchTrending = async () => {
  return apiCall(trendingEndpoint);
};

export const fetchGenres = async () => {
  return apiCall(genresEndpoint);
};

export const fetchTopRated = () => {
  return apiCall(topRatedEndpoint);
};

export const fetchUpcoming = () => {
  return apiCall(upcomingEndpoint);
};

export const fetchPopularPeople = () => {
  return apiCall(popularPeopleEndpoint);
};

export const image500 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;