import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useUserSession from '../hooks/use-user-session';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigation';

export default function ProfileScreen() {
  const {session, destroyUserSession} = useUserSession();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function handleSignOut() {
    await destroyUserSession();

    navigation.replace('Login');
  }
  return (
    <ScrollView className="bg-neutral-900 flex-1">
      <SafeAreaView>
        <View className="p-4" style={{gap: 16}}>
          <Text className="text-center w-full text-2xl font-bold text-white">
            Profile
          </Text>
          <View className="flex-row" style={{gap: 16}}>
            <Image
              source={{
                uri:
                  (session?.image as string) ??
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
              }}
              className="rounded-full"
              style={{width: 60, height: 60}}
            />
            <View>
              <Text className="text-lg font-bold text-white">
                {session?.firstName + ' ' + session?.lastName}
              </Text>
              <Text className="font-bold text-neutral-500">
                {'@' + session?.username ?? 'Unknown username'}
              </Text>
            </View>
          </View>
          <View style={{gap: 8}}>
            <Text className="text-lg font-bold text-white mb-1">Account</Text>
            <TouchableWithoutFeedback onPress={handleSignOut}>
              <View className="w-full px-4 flex-row bg-red-600 items-center rounded-lg justify-between">
                <View
                  className="flex-row items-center"
                  style={{height: 45, gap: 8}}>
                  <Icon name="arrow-right-from-bracket" />
                  <Text className="text-center font-bold">Logout</Text>
                </View>
                <Icon name="chevron-right" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
