import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {type Movie} from '../types/movie';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {image500} from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function MovieList({
  title,
  movies,
  hideSeeAll = false,
}: {
  title: string;
  movies: Movie[];
  hideSeeAll?: boolean;
}) {
  const navigation = useNavigation();
  return (
    <View className="space-y-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl text-white font-bold">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity className="flex-row items-center space-x-1">
            <Text className="text-neutral-400">See all</Text>
            <Icon name="chevron-right" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 4, gap: 20}}>
        {movies.map(movie => (
          <TouchableWithoutFeedback
            key={movie.id}
            onPress={() => navigation.navigate('Movie', {movieId: movie.id})}>
            <View className="space-y-1">
              <Image
                source={{uri: image500(movie.poster_path) ?? ''}}
                className="rounded-2xl"
                style={{width: width * 0.33, height: height * 0.22}}
              />

              <Text className="text-neutral-300">
                {movie.title.length > 14
                  ? movie.title.slice(0, 14) + '...'
                  : movie.title}
              </Text>
              <View className="flex-row space-x-1 items-center">
                <Icon name="star" color="orange" solid size={14} />
                <Text className="text-neutral-400" style={{fontSize: 14}}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
