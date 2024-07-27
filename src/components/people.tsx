import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Cast} from '../types/cast';
import {useNavigation} from '@react-navigation/native';

export default function People({
  people,
  title,
}: {
  people: Cast[];
  title: string;
}) {
  const navigation = useNavigation();
  people;
  title;
  const dummyName = 'Muhammad Maher';
  const dummyRole = 'Clark Kent';
  return (
    <View className="space-y-1">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">{title}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 4, gap: 12}}>
        {people.map(cast => (
          <TouchableWithoutFeedback
            key={cast.name}
            onPress={() => navigation.navigate('Movie', {movieId: 1})}>
            <View className="w-20 space-y-1">
              <Image
                source={require('../assets/actor.jpg')}
                className="rounded-2xl w-20 h-20"
              />
              <Text
                className="text-white flex-1 flex-wrap text-center"
                style={{fontSize: 12}}>
                {dummyName.length > 18
                  ? dummyName.slice(0, 18) + '...'
                  : dummyName}
              </Text>
              <Text
                className="text-neutral-400 text-center"
                style={{fontSize: 12}}>
                {dummyRole.length > 10
                  ? dummyRole.slice(0, 10) + '...'
                  : dummyRole}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
