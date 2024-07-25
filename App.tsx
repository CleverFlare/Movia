/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, Alert} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const handlePress = () =>
    Alert.alert('My Own Title', 'My Own Message', [
      {text: 'Yes'},
      {text: 'No'},
    ]);
  return (
    <SafeAreaView className="flex-1 bg-neutral-800 justify-center items-center">
      <Button onPress={handlePress} title="Click Me!" />
    </SafeAreaView>
  );
}

export default App;
