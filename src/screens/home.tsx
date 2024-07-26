import React, {useState} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Trending from '../components/trending';
import MovieList from '../components/move-list';
import {type Movie} from '../types/movie';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending] = useState<Movie[]>([1, 2, 3]);
  return (
    <View className="flex-1 bg-neutral-900">
      {
        // <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        //   <View className="flex-row justify-between items-center">
        //     <Icon name="bars" size={20} />
        //     <Text className="text-white text-3xl font-bold">Movies</Text>
        //     <TouchableOpacity>
        //       <Icon name="magnifying-glass" size={20} />
        //     </TouchableOpacity>
        //   </View>
        // </SafeAreaView>
      }
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10, gap: 18}}>
        <Trending movies={trending} />
        <View className="p-4">
          <MovieList title="Upcoming" movies={trending} />
          <MovieList title="Top Rated" movies={trending} />
        </View>
      </ScrollView>
    </View>
  );
}
