import React from 'react';
import {Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  return (
    <View className="flex bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <View className="flex-row justify-between items-center mx-4"></View>
      </SafeAreaView>
    </View>
  );
}
