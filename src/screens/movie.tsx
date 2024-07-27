import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'moti';
import People from '../components/people';
import {type Cast} from '../types/cast';
import MovieList from '../components/movie-list';
import Loading from '../components/loading';
import {RootStackParamList} from '../navigation/app-navigation';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
  image500,
} from '../api/moviedb';
import {Movie} from '../types/movie';

const {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params}: RouteProp<RootStackParamList> = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [people, setPeople] = useState<Cast[]>([]);
  const [details, setDetails] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [similar, setSimilar] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieDetails(params?.id ?? 0);
    getCredits(params?.id ?? 0);
    getSimilar(params?.id ?? 0);
  }, [params]);

  async function getSimilar(id: number) {
    try {
      const similarMovies = await fetchMovieSimilar(id);
      if (similarMovies && similarMovies.results)
        setSimilar(similarMovies.results);
      setLoading(false);
    } catch (err) {
      console.log('ERROR:', err);
    }
  }

  async function getCredits(id: number) {
    try {
      const movieCredits = await fetchMovieCredits(id);
      if (movieCredits && movieCredits.cast) setPeople(movieCredits.cast);
    } catch (err) {
      console.log('ERROR:', err);
    }
  }

  async function getMovieDetails(id: number) {
    try {
      const movieDetails = await fetchMovieDetails(id);
      if (movieDetails)
        setDetails({
          id: movieDetails.id,
          title: movieDetails.original_title,
          poster_path: movieDetails.poster_path,
          vote_average: movieDetails.vote_average,
          genres: movieDetails.genres,
          runtime: movieDetails.runtime,
          release_date: movieDetails.release_date,
          overview: movieDetails.overview,
        });
    } catch (err) {
      console.log('ERROR:', err);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900 relative">
      {loading ? (
        <Loading />
      ) : (
        <>
          <View className="w-full">
            <SafeAreaView
              className={
                'absolute z-20 w-full flex-row justify-between items-center p-4'
              }>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="rounded-full bg-neutral-900 w-10 h-10 justify-center items-center">
                <Icon name="chevron-left" size={20} style={{color: 'white'}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFavorite(prev => !prev)}
                className="rounded-full bg-neutral-900 w-10 h-10 justify-center items-center">
                <Icon
                  name="heart"
                  solid
                  size={20}
                  style={{color: isFavorite ? 'red' : 'white'}}
                />
              </TouchableOpacity>
            </SafeAreaView>
            <View>
              <Image
                source={{
                  uri:
                    image500(details?.poster_path ?? '') ??
                    'https://www.juliedray.com/wp-content/uploads/2022/01/sans-affiche.png',
                }}
                style={{width, height: height * 0.55}}
              />
              <LinearGradient
                colors={[
                  'transparent',
                  'rgba(23,23,23,0.8)',
                  'rgba(23,23,23,1)',
                ]}
                style={{width, height: height * 0.4}}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                className="absolute bottom-0"
              />
            </View>
          </View>
          <View
            style={{marginTop: -(height * 0.09)}}
            className="space-y-2 px-4">
            <Text className="text-xl text-white font-bold">
              {details?.title ?? 'Unknown Movie Title'}
            </Text>
            <Text className="text-neutral-400 font-bold" style={{fontSize: 14}}>
              {details?.release_date
                ? details.release_date.split('-')[0]
                : 'Unknown Release Date'}{' '}
              •{' '}
              {details?.genres?.map(({name}) => name).join(', ') ??
                'Unknown Genres'}{' '}
              •{' '}
              {details?.runtime
                ? convertMinutesToHoursAndMinutes(details.runtime)
                : 'Unknown Movie Time'}
            </Text>
            <View className="flex-row space-x-1 items-center">
              <Icon name="star" color="orange" solid size={14} />
              <Text className="text-neutral-400" style={{fontSize: 14}}>
                {details?.vote_average.toFixed(1) ?? 'Unknown Rating'}
              </Text>
            </View>
          </View>
          <View className="p-4 space-y-2">
            <Text className="text-xl text-white font-bold">Story</Text>
            <Text className="text-neutral-400">
              {details?.overview ?? 'Unknown Story'}
            </Text>
          </View>
          <View className="p-4" style={{gap: 16}}>
            {similar.length > 0 && <People title="Cast" people={people} />}
            {similar.length > 0 && (
              <MovieList title="Similar" movies={similar} hideSeeAll />
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
