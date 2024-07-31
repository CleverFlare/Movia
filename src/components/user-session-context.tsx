import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

const defaultValue: {
  session: Record<string, unknown> | null;
  setSession: Dispatch<SetStateAction<null>>;
} = {
  session: null,
  setSession: () => {},
};

const UserContext = createContext(defaultValue);

export default function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState(null);
  return (
    <UserContext.Provider value={{session, setSession}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserSession = () => useContext(UserContext);
