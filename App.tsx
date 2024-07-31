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
      <OverlayProvider
        value={{
          style: {
            colors: {
              black: 'white',
              accent_blue: '#dc2626',
              grey_gainsboro: '#404040',
            },
            messageInput: {
              container: {
                backgroundColor: '#404040',
              },
              inputBoxContainer: {
                borderColor: '#737373',
                borderRadius: 10,
                paddingVertical: 5,
              },
            },
            messageList: {
              contentContainer: {
                backgroundColor: '#171717',
              },
            },
            messageSimple: {
              content: {
                senderMessageBackgroundColor: '#dc2626',
                receiverMessageBackgroundColor: '#404040',
                containerInner: {
                  borderWidth: 0,
                },
              },
            },
            channelListMessenger: {
              flatListContent: {
                backgroundColor: '#171717',
              },
            },
            channelListSkeleton: {
              maskFillColor: '#171717',
              container: {
                backgroundColor: '#525252',
              },
              gradientStart: {
                stopColor: '#a3a3a3',
              },
              gradientStop: {
                stopColor: '#525252',
              },
            },
            channelPreview: {
              container: {
                backgroundColor: 'transparent',
              },
              contentContainer: {
                backgroundColor: '#171717',
              },
              title: {
                color: 'white',
              },
            },
          },
        }}>
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
