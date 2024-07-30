import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/home';
import MovieScreen from '../screens/movie';
import PersonScreen from '../screens/person';
import SearchScreen from '../screens/search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';

import LoginScreen from '../screens/login';
import ChatScreen from '../screens/chat';
import ProfileScreen from '../screens/profile';

export type RootTabParamList = {
  HomeTab: undefined;
  Search: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const INACTIVE_TINT = '#737373';
const ACTIVE_TINT = '#dc2626';

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={() => ({
        tabBarStyle: {
          backgroundColor: '#262626',
          borderTopWidth: 0,
          paddingVertical: 10,
          height: 60,
        },
        tabBarLabelStyle: {paddingBottom: 10},
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="house"
              solid
              size={20}
              color={focused ? ACTIVE_TINT : INACTIVE_TINT}
            />
          ),
          tabBarActiveTintColor: ACTIVE_TINT,
          tabBarInactiveTintColor: INACTIVE_TINT,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({focused}) => (
            <Icon
              name="message"
              solid
              size={20}
              color={focused ? ACTIVE_TINT : INACTIVE_TINT}
            />
          ),
          tabBarActiveTintColor: ACTIVE_TINT,
          tabBarInactiveTintColor: INACTIVE_TINT,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({focused}) => (
            <Icon
              name="magnifying-glass"
              solid
              size={20}
              color={focused ? ACTIVE_TINT : INACTIVE_TINT}
            />
          ),
          tabBarActiveTintColor: ACTIVE_TINT,
          tabBarInactiveTintColor: INACTIVE_TINT,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              solid
              size={20}
              color={focused ? ACTIVE_TINT : INACTIVE_TINT}
            />
          ),
          tabBarActiveTintColor: ACTIVE_TINT,
          tabBarInactiveTintColor: INACTIVE_TINT,
        }}
      />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Movie: {id: number};
  Person: {id: number};
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={TabNavigator}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
