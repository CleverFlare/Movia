import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Trending from '../components/trending';
import MovieList from '../components/move-list';
import {type Movie} from '../types/movie';
import People from '../components/people';
import {Cast} from '../types/cast';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import {fetchGenres, fetchTrending} from '../api/moviedb';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Record<number, string>>({});
  const [people] = useState<Cast[]>([
    {name: 'a', role: '', image: ''},
    {name: 'b', role: '', image: ''},
    {name: 'c', role: '', image: ''},
    {name: 'd', role: '', image: ''},
    {name: 'e', role: '', image: ''},
  ]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTrendingMovies();
  }, []);

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
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-neutral-900">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10, gap: 10}}>
          <SafeAreaView
            className={
              ios ? '-mb-2' : 'mb-3' + ' absolute top-0 left-0 w-full p-4 z-30'
            }>
            <View className="flex-row justify-end items-center">
              <TouchableOpacity
                className="w-10 h-10 justify-center items-center rounded-full bg-neutral-900"
                onPress={() => navigation.navigate('Search')}>
                <Icon
                  name="magnifying-glass"
                  size={20}
                  style={{color: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <Trending movies={trending} genres={genres} />
          <View className="p-4" style={{gap: 20}}>
            <MovieList title="Upcoming" movies={trending} />
            <People title="Popular Actors" people={people} />
            <MovieList title="Top Rated" movies={trending} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
