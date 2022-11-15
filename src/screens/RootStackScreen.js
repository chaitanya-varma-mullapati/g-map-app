import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AboutUsScreen from './AboutUsScreen';
import { ContactUsScreen } from './AboutUsScreen';

const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="About" component={AboutUsScreen} />
        <Stack.Screen name="Contact" component={ContactUsScreen} />
    </Stack.Navigator>
);

export default RootStackScreen;