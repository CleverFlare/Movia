import React from 'react';
import {ChannelList} from 'stream-chat-react-native';
import {useChatClient} from '../hooks/use-chat-client';
import {Text, View} from 'react-native';
import {useUserSession} from '../components/user-session-context';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../components/app-context';

export default function ChannelListScreen() {
  const {session} = useUserSession();
  const {clientIsReady} = useChatClient();
  const {setChannel} = useAppContext();
  const navigation = useNavigation();

  console.log('CLIENT IS READY:', clientIsReady);

  if (!clientIsReady) {
    return <Text>Loading chat...</Text>;
  }

  const filters = {
    members: {
      $in: [session?.id as string] ?? '',
    },
  };

  const sort: {last_message_at: -1 | 1} = {
    last_message_at: -1,
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <Text className="text-center text-white">Channel List</Text>
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={channel => {
          setChannel(channel);
          navigation.navigate('Channel');
        }}
      />
    </View>
  );
}
