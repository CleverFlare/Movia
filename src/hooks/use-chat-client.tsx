import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {STREAM_KEY} from '../../constants';
import {useUserSession} from '../components/user-session-context';

const chatClient = StreamChat.getInstance(STREAM_KEY);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const {session} = useUserSession();

  useEffect(() => {
    const setupClient = async () => {
      try {
        console.log('SESSION:', session);
        if (session) {
          const user = {
            id: session!.id as string,
            name: session!.firstName + ' ' + session!.lastName,
          };
          chatClient.connectUser(
            user,
            chatClient.devToken(session!.id as string),
          );

          setClientIsReady(true);

          // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
          // But in case you need the chat to load from offline storage first then you should render chat components
          // immediately after calling `connectUser()`.
          // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, [session]);

  return {
    clientIsReady,
  };
};
