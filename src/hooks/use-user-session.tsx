import {useEffect, useState} from 'react';
import {
  createUserSession as createUserSessionUtil,
  destroyUserSession as destroyUserSessionUtil,
  getUserSession,
} from '../utils/user-session';

export default function useUserSession() {
  const [session, setSession] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    handleSettingSession();
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
