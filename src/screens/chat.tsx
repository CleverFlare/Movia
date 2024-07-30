import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextInput from '../components/text-input';

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="p-4 flex-1">
        <TextInput placeholder="search..." />
      </View>
    </SafeAreaView>
  );
}
