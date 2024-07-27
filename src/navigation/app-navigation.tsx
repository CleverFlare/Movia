import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import MovieScreen from '../screens/movie';
import PersonScreen from '../screens/person';
import SearchScreen from '../screens/search';

export type RootStackParamList = {
  Home: undefined;
  Movie: {movieId: number};
  Person: {personId: number};
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{headerShown: false}}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{headerShown: false}}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{headerShown: false}}
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
