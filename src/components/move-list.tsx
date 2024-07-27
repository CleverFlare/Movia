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
  const dummyName = 'Ant-Man and the Wasp: Quantumania';
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
        contentContainerStyle={{marginTop: 4, gap: 12}}>
        {movies.map(movie => (
          <TouchableWithoutFeedback
            key={movie}
            onPress={() => navigation.navigate('Movie', {movieId: movie})}>
            <View className="space-y-1">
              <Image
                source={require('../assets/dummy_poster_2.jpg')}
                className="rounded-2xl"
                style={{width: width * 0.33, height: height * 0.22}}
              />

              <Text className="text-neutral-300">
                {dummyName.length > 14
                  ? dummyName.slice(0, 14) + '...'
                  : dummyName}
              </Text>
              <View className="flex-row space-x-1 items-center">
                <Icon name="star" color="orange" solid size={14} />
                <Text className="text-neutral-400" style={{fontSize: 14}}>
                  4.3
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}