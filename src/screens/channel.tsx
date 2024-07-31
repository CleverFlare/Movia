import React from 'react';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {useAppContext} from '../components/app-context';

export default function ChannelScreen() {
  const {channel} = useAppContext();

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
