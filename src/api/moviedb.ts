import axios from 'axios';
import {API_KEY} from '../../constants';

// endpoints
const baseUrl = `https://api.themoviedb.org/3`;
const trendingEndpoint = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingEndpoint = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedEndpoint = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;
const popularPeopleEndpoint = `${baseUrl}/person/popular?api_key=${API_KEY}`;
const genresEndpoint = `${baseUrl}/genre/movie/list?api_key=${API_KEY}`;
const movieDetailsEndpoint = (movie_id: number) =>
  `${baseUrl}/movie/${movie_id}?api_key=${API_KEY}`;

const creditsEndpoint = (movie_id: number) =>
  `${baseUrl}/movie/${movie_id}/credits?api_key=${API_KEY}`;

const similarEndpoint = (movie_id: number) =>
  `${baseUrl}/movie/${movie_id}/similar?api_key=${API_KEY}`;

const personDetailsEndpoint = (person_id: number) =>
  `${baseUrl}/person/${person_id}?api_key=${API_KEY}`;

const personCreditsEndpoint = (person_id: number) =>
  `${baseUrl}/person/${person_id}/movie_credits?api_key=${API_KEY}`;

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

export const fetchMovieDetails = (id: number) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id: number) => {
  return apiCall(creditsEndpoint(id));
};

export const fetchMovieSimilar = (id: number) => {
  return apiCall(similarEndpoint(id));
};

export const fetchPersonDetails = (id: number) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonCredits = (id: number) => {
  return apiCall(personCreditsEndpoint(id));
};

export const image500 = (path?: string) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

export const image342 = (path?: string) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;

export const image185 = (path?: string) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;
