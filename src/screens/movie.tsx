import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params} = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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
    </ScrollView>
  );
}
