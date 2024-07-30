import AsyncStorage from '@react-native-async-storage/async-storage';

export async function createUserSession(userObject: Record<string, unknown>) {
  try {
    const JSONSerializedUserObject = JSON.stringify(userObject);

    await AsyncStorage.setItem('user-session', JSONSerializedUserObject);

    return true;
  } catch (err) {
    console.log('USER_SESSION_ERROR:', err);

    return false;
  }
}

export async function isLoggedin() {
  try {
    return !!(await AsyncStorage.getItem('user-session'));
  } catch (err) {
    console.log('USER_SESSION_ERROR:', err);

    return null;
  }
}

export async function getUserSession() {
  try {
    const JSONSession = await AsyncStorage.getItem('user-session');

    if (!JSONSession) return null;

    const deserializedUserObject = JSON.parse(JSONSession);

    return deserializedUserObject;
  } catch (err) {
    console.log('USER_SESSION_ERROR:', err);

    return null;
  }
}

export async function destroyUserSession() {
  try {
    await AsyncStorage.removeItem('user-session');

    return true;
  } catch (err) {
    console.log('USER_SESSION_ERROR:', err);

    return false;
  }
}
