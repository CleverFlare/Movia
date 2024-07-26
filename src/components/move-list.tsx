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

const {width, height} = Dimensions.get('window');

export default function MovieList({
  title,
  movies,
}: {
  title: string;
  movies: number[];
}) {
  const navigation = useNavigation();
  const dummyName = 'Ant-Man and the Wasp: Quantumania';
  return (
    <View className="space-y-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg uppercase font-bold">{title}</Text>
        <TouchableOpacity>
          <Text className="text-yellow-500">See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 4, gap: 12}}>
        {movies.map(movie => (
          <TouchableWithoutFeedback
            key={movie}
            onPress={() => navigation.navigate('Movie', movie + '')}>
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
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
