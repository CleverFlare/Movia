import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, Text, View} from 'react-native';
import Trending from '../components/trending';
import MovieList from '../components/movie-list';
import {type Movie} from '../types/movie';
import People from '../components/people';
import {Cast} from '../types/cast';
import Loading from '../components/loading';
import {fetchGenres, fetchPopularPeople, fetchTrending} from '../api/moviedb';
import {fetchTopRated} from '../api/moviedb';
import {fetchUpcoming} from '../api/moviedb';
import useUserSession from '../hooks/use-user-session';

export default function HomeScreen() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<number, string>>({});
  const [people, setPeople] = useState<Cast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    handleDataFetching();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDataFetching() {
    await getTrendingMovies();
    await getPopularActors();
    await getTopRatedMovies();
    await getUpcomingMovies();
    setLoading(false);
  }

  async function getUpcomingMovies() {
    const upcomingMovies = await fetchUpcoming();
    if (upcomingMovies && upcomingMovies.results)
      setUpcoming(upcomingMovies.results);
  }

  async function getTopRatedMovies() {
    const topRatedMovies = await fetchTopRated();
    if (topRatedMovies && topRatedMovies.results)
      setTopRated(topRatedMovies.results);
  }

  async function getPopularActors() {
    const people = await fetchPopularPeople();
    if (people && people.results) setPeople(people.results);
  }

  async function getTrendingMovies() {
    const {genres} = (await fetchGenres()) as {
      genres: {id: number; name: string}[];
    };

    if (genres)
      setGenres(() => {
        const convertedGenres: Record<number, string> = {};

        for (const genre of genres) {
          convertedGenres[genre.id] = genre.name;
        }

        return convertedGenres;
      });

    const data = await fetchTrending();
    if (data && data.results) setTrending(data.results.slice(0, 6));
  }

  const {session} = useUserSession();

  return (
    <View className="flex-1 bg-neutral-900">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10, gap: 10}}>
          <Text>Hi there, {(session?.username as string) ?? 'Unknown'}</Text>
          <Trending movies={trending} genres={genres} />
          <View className="p-4" style={{gap: 20}}>
            <MovieList title="Upcoming" movies={upcoming} />
            {people.length > 0 && (
              <People title="Popular Actors" people={people} />
            )}
            <MovieList title="Top Rated" movies={topRated} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
