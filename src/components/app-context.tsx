import React, {useState} from 'react';

export const AppContext = React.createContext({
  channel: null as any,
  setChannel: (channel: any) => {
    channel;
  },
  thread: null as any,
  setThread: (thread: any) => {
    thread;
  },
});

export const AppProvider = ({children}: {children: any}) => {
  const [channel, setChannel] = useState(null);
  const [thread, setThread] = useState(null);

  return (
    <AppContext.Provider value={{channel, thread, setChannel, setThread}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
