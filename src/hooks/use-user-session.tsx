import {useEffect} from 'react';
import {
  createUserSession as createUserSessionUtil,
  destroyUserSession as destroyUserSessionUtil,
  getUserSession,
} from '../utils/user-session';
import {useUserSession as useSession} from '../components/user-session-context';

export default function useUserSession() {
  const {session, setSession} = useSession();

  useEffect(() => {
    handleSettingSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createUserSession(userObject: Record<string, unknown>) {
    await createUserSessionUtil(userObject);
    await handleSettingSession();
  }

  async function destroyUserSession() {
    await destroyUserSessionUtil();
    await handleSettingSession();
  }

  async function handleSettingSession() {
    const userSession = await getUserSession();

    setSession(userSession);
  }

  return {
    session,
    createUserSession,
    destroyUserSession,
  };
}
