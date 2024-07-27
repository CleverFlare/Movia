import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MovieList from '../components/movie-list';
import Loading from '../components/loading';
import {type Cast} from '../types/cast';
import {RootStackParamList} from '../navigation/app-navigation';
import {
  fetchPersonCredits,
  fetchPersonDetails,
  image342,
  image500,
} from '../api/moviedb';
import {Movie} from '../types/movie';

const {width, height} = Dimensions.get('window');

const genders = ['Unknown', 'Female', 'Male', 'Freak'];

export default function PersonScreen() {
  const navigation = useNavigation();
  const {params}: RouteProp<RootStackParamList> = useRoute();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [details, setDetails] = useState<Cast>();

  useEffect(() => {
    getPersonDetails(params?.id ?? 0);
    getPersonMovies(params?.id ?? 0);
  }, [params]);

  async function getPersonMovies(id: number) {
    const personMovies = await fetchPersonCredits(id);

    if (personMovies && personMovies.cast) setMovies(personMovies.cast);

    setLoading(false);
  }

  async function getPersonDetails(id: number) {
    const personDetails = await fetchPersonDetails(id);

    if (personDetails) setDetails(personDetails);
  }

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      {loading ? (
        <Loading />
      ) : (
        <>
          <View>
            <SafeAreaView
              className={
                'absolute z-30 w-full flex-row justify-between items-center p-4'
              }>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="rounded-full bg-neutral-900 w-10 h-10 justify-center items-center">
                <Icon name="chevron-left" size={20} style={{color: 'white'}} />
              </TouchableOpacity>
            </SafeAreaView>
            <View
              className="absolute z-20 justify-center items-center w-full h-full"
              style={{gap: 8}}>
              <Image
                source={{
                  uri:
                    image342(details?.profile_path as string) ??
                    'https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=1024x1024&w=is&k=20&c=sLlDgR_nFD10RmmlaqooFOgT7q2deQJSUtf3X_yP4K0=',
                }}
                className="w-36 h-36 rounded-full"
              />
              <Text className="text-white text-xl font-bold">
                {details?.name}
              </Text>
              <Text className="text-neutral-400 text-sm">
                {details?.place_of_birth}
              </Text>
            </View>
            <Image
              source={{
                uri:
                  image500(details?.profile_path as string) ??
                  'https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=1024x1024&w=is&k=20&c=sLlDgR_nFD10RmmlaqooFOgT7q2deQJSUtf3X_yP4K0=',
              }}
              style={{width, height: height * 0.55}}
              blurRadius={10}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>
          <View className="flex-row justify-around p-4">
            <View className="items-center" style={{gap: 8}}>
              <Text className="text-white font-bold">Gender</Text>
              <Text className="text-neutral-400 text-sm">
                {details?.gender
                  ? genders[details.gender as number]
                  : genders[0]}
              </Text>
            </View>
            <View className="items-center" style={{gap: 8}}>
              <Text className="text-white font-bold">Popularity</Text>
              <Text className="text-neutral-400 text-sm">
                {details?.popularity ?? 'Unknown'}
              </Text>
            </View>
            <View className="items-center" style={{gap: 8}}>
              <Text className="text-white font-bold">Birthday</Text>
              <Text className="text-neutral-400 text-sm">
                {details?.birthday
                  ? new Date(details.birthday).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Unknown'}
              </Text>
            </View>
          </View>
          <View className="p-4 space-y-2">
            <Text className="text-xl text-white font-bold">Bio</Text>
            <Text className="text-neutral-400">
              {details?.biography ?? 'Unknown Biography'}
            </Text>
          </View>
          <View className="p-4">
            <MovieList title="Staring in" movies={movies} hideSeeAll />
          </View>
        </>
      )}
    </ScrollView>
  );
}
