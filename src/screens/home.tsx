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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10, gap: 18}}>
        <SafeAreaView
          className={
            ios ? '-mb-2' : 'mb-3' + ' absolute top-0 left-0 w-full p-4 z-30'
          }>
          <View className="flex-row justify-between items-center">
            <View className="px-4 h-10 justify-center rounded-full bg-red-500">
              <Text className="text-white font-bold" style={{fontSize: 16}}>
                Trending
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 justify-center items-center rounded-full bg-neutral-900">
              <Icon
                name="magnifying-glass"
                size={20}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Trending movies={trending} />
        <View className="p-4" style={{gap: 20}}>
          <MovieList title="Upcoming" movies={trending} />
          <MovieList title="Top Rated" movies={trending} />
        </View>
      </ScrollView>
    </View>
  );
}
