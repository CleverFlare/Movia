import {MotiView} from 'moti';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');

export default function Trending({movies}: {movies: number[]}) {
  movies;
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <View className="flex-col">
      <Carousel
        data={movies}
        renderItem={({item}) => <MovieCard data={item} />}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={width}
        itemWidth={width}
        autoplay
        loop
        onSnapToItem={index => setActiveSlide(index)}
        autoplayInterval={5000}
        slideStyle={{
          display: 'flex',
          alignItems: 'center',
          width: width,
        }}
      />
      <Pagination
        dotsLength={movies.length}
        activeDotIndex={activeSlide}
        inactiveDotScale={1}
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 5,
        }}
        renderDots={(activeIndex, total) => {
          return Array(total)
            .fill(0)
            .map((_, index) => (
              <MotiView
                key={`Pagination ${index}`}
                animate={{
                  width: activeIndex === index ? 20 : 10,
                  backgroundColor:
                    activeIndex === index
                      ? 'rgb(239, 68, 68)'
                      : 'rgb(38, 38, 38)',
                }}
                style={{
                  height: 10,
                }}
                className="rounded-full"
              />
            ));
        }}
      />
    </View>
  );
}

function MovieCard({data}: {data: number}) {
  data;
  return (
    <TouchableWithoutFeedback>
      <View
        className="overflow-hidden justify-end relative"
        style={{width, height: height * 0.55}}>
        <Image
          source={require('../assets/dummy_poster.jpg')}
          className="absolute top-0"
          style={{
            flex: 1,
            alignSelf: 'stretch',
            width,
            height,
          }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
          style={{width, height: height * 0.4}}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          className="absolute bottom-0"
        />
        <View className="mx-4">
          <Text className="text-2xl font-bold">Captian Marvel</Text>
          <Text className="text-neutral-400 text-sm">
            Action • Drama • Adventure
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
