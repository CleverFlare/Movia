import React from 'react';
import {Platform, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <Text>Hi there!</Text>
      </SafeAreaView>
    </View>
  );
}
