import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');

export default function Trending({movies}: {movies: number[]}) {
  movies;
  return (
    <View>
      <Text className="uppercase font-bold">Trending</Text>
      <View className="mt-4">
        <Carousel
          data={movies}
          renderItem={({item}) => <MovieCard data={item} />}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{display: 'flex', alignItems: 'center'}}
        />
      </View>
    </View>
  );
}

function MovieCard({data}: {data: number}) {
  data;
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require('../assets/dummy_poster.jpg')}
        style={{width: width * 0.6, height: height * 0.4}}
        className="rounded-2xl"
      />
    </TouchableWithoutFeedback>
  );
}
