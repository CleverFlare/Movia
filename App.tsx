/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/app-navigation';
import SplashScreen from 'react-native-splash-screen';
import {AppProvider} from './src/components/app-context';
import {Chat, OverlayProvider} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {STREAM_KEY} from './constants';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UserSessionProvider from './src/components/user-session-context';

const chatClient = StreamChat.getInstance(STREAM_KEY);

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <GestureHandlerRootView>
      <OverlayProvider>
        <Chat client={chatClient}>
          <UserSessionProvider>
            <AppProvider>
              <AppNavigation />
            </AppProvider>
          </UserSessionProvider>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}

export default App;
