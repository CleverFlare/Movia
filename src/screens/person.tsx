import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
import MovieList from '../components/move-list';

const {width, height} = Dimensions.get('window');

export default function PersonScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 bg-neutral-900">
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
            source={require('../assets/actor.jpg')}
            className="w-36 h-36 rounded-full"
          />
          <Text className="text-white text-xl font-bold">Muhammad Maher</Text>
          <Text className="text-neutral-400 text-sm">
            Action • Drama • Adventure
          </Text>
        </View>
        <Image
          source={require('../assets/actor.jpg')}
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
          <Text className="text-neutral-400 text-sm">Male</Text>
        </View>
        <View className="items-center" style={{gap: 8}}>
          <Text className="text-white font-bold">Popularity</Text>
          <Text className="text-neutral-400 text-sm">4.3</Text>
        </View>
        <View className="items-center" style={{gap: 8}}>
          <Text className="text-white font-bold">Birthday</Text>
          <Text className="text-neutral-400 text-sm">20 Aug, 1990</Text>
        </View>
      </View>
      <View className="p-4 space-y-2">
        <Text className="text-xl text-white font-bold">Bio</Text>
        <Text className="text-neutral-400">
          Robert Downey Jr. has evolved into one of the most respected actors in
          Hollywood. With an amazing list of credits to his name, he has managed
          to stay new and fresh even after over four decades in the business
        </Text>
      </View>
      <View className="p-4">
        <MovieList title="Staring in" movies={[1, 2, 3]} hideSeeAll />
      </View>
    </ScrollView>
  );
}
