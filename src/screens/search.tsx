import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';

const {height} = Dimensions.get('window');

export default function SearchScreen() {
  const [results] = useState([]);
  const navigation = useNavigation();
  const dummyName = 'Ant-Man and the Wasp: Quantumania';
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View
        className="p-4 relative items-center w-full flex-row"
        style={{height: 65, gap: 16}}>
        <TextInput
          placeholder="Search..."
          className="border border-red-500 rounded-lg px-4 py-0 pl-10 flex-1 h-full"
          autoFocus
        />
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View className="aspect-square bg-red-500 h-full rounded-lg justify-center items-center">
            <Icon name="xmark" />
          </View>
        </TouchableWithoutFeedback>
        <Icon
          name="magnifying-glass"
          size={15}
          style={{position: 'absolute', left: 30, pointerEvents: 'none'}}
        />
      </View>
      {Boolean(results.length) && (
        <FlatList
          data={results}
          numColumns={2}
          className="p-4"
          contentContainerStyle={{gap: 16}}
          columnWrapperStyle={{gap: 16}}
          renderItem={({item: movie}) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Movie', {movieId: movie})}>
              <View className="space-y-2 flex-1">
                <Image
                  source={require('../assets/dummy_poster_2.jpg')}
                  className="rounded-2xl"
                  style={{width: '100%', height: height * 0.3}}
                />

                <Text className="text-neutral-300 w-full">
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
          )}
        />
      )}
      {!Boolean(results.length) && (
        <View className="flex-1 justify-center items-center" style={{gap: 16}}>
          <Image
            source={require('../assets/popcorn.png')}
            style={{width: 120, height: 120}}
          />
          <Text
            className="text-2xl font-bold text-white text-center"
            style={{width: 240}}>
            Search in Movia
          </Text>
          <Text
            className="font-bold text-neutral-400 text-center"
            style={{width: 240}}>
            By typing in search box, Movia search in movies then show you the
            best results
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
