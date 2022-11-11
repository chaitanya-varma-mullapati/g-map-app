import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
);

export default RootStackScreen;