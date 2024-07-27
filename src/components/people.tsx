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
import {image185} from '../api/moviedb';

export default function People({
  people,
  title,
}: {
  people: Cast[];
  title: string;
}) {
  const navigation = useNavigation();
  return (
    <View className="space-y-2">
      <Text className="text-xl text-white font-bold">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 4, gap: 20}}>
        {people.map((cast, index) => (
          <TouchableWithoutFeedback
            key={`${cast.id} ${cast.original_name} ${index}`}
            onPress={() => navigation.navigate('Person', {id: 1})}>
            <View className="w-20 space-y-1">
              <Image
                source={{
                  uri:
                    image185(cast.profile_path) ??
                    'https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=1024x1024&w=is&k=20&c=sLlDgR_nFD10RmmlaqooFOgT7q2deQJSUtf3X_yP4K0=',
                }}
                className="rounded-2xl w-20 h-20"
              />
              <Text
                className="text-white flex-1 flex-wrap text-center"
                style={{fontSize: 12}}>
                {cast.original_name.length > 18
                  ? cast.original_name.slice(0, 18) + '...'
                  : cast.original_name}
              </Text>
              {cast.character && (
                <Text
                  className="text-neutral-400 text-center"
                  style={{fontSize: 12}}>
                  {cast.character.length > 10
                    ? cast.character.slice(0, 10) + '...'
                    : cast.character}
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
