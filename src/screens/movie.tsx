import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import MovieList from '../components/move-list';

const {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const dummyName = 'Ant-Man and the Wasp: Quantumania';
  const {params} = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [people] = useState<Cast[]>([
    {name: 'a', role: '', image: ''},
    {name: 'b', role: '', image: ''},
    {name: 'c', role: '', image: ''},
    {name: 'd', role: '', image: ''},
    {name: 'e', role: '', image: ''},
  ]);

  useEffect(() => {
    params;
  }, [params]);

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900">
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
            source={require('../assets/dummy_poster_2.jpg')}
            style={{width, height: height * 0.55}}
          />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{width, height: height * 0.4}}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            className="absolute bottom-0"
          />
        </View>
      </View>
      <View style={{marginTop: -(height * 0.09)}} className="space-y-2 px-4">
        <Text className="text-xl font-bold">{dummyName}</Text>
        <Text className="text-neutral-400 font-bold" style={{fontSize: 14}}>
          2021 • Horror, Thriller • 20h 5min
        </Text>
        <View className="flex-row space-x-1 items-center">
          <Icon name="star" color="orange" solid size={14} />
          <Text className="text-neutral-400" style={{fontSize: 14}}>
            4.3
          </Text>
        </View>
      </View>
      <View className="p-4 space-y-2">
        <Text className="text-xl text-white font-bold">Story</Text>
        <Text className="text-neutral-400">
          Super-Hero partners Scott Lang and Hope van Dyne, along with with
          Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter
          Cassie Lang, find themselves exploring the Quantum Realm, interacting
          with strange new creatures and embarking on an adventure that will
          push them beyond the limits of what they thought possible.
        </Text>
      </View>
      <View className="p-4" style={{gap: 16}}>
        <People title="Cast" people={people} />
        <MovieList title="Similar" movies={[1, 2, 3]} hideSeeAll />
      </View>
    </ScrollView>
  );
}
