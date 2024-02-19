import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/splashScreen';
import DrawerNavigator from './DrawerNavigator';
import ProspectScreen from '../screens/ProspectScreen/ProspectScreen';
import CalenderScreen from '../screens/CalenderScreen/CalenderScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SelectBranchScreen from '../screens/SelectBranch/SelectBranchScreen';
import ActionTodayScreen from '../screens/ActionTodayScreen/ActionTodayScreen';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen  name='LoginScreen' component={LoginScreen}/>
       <Stack.Screen  name='HomeScreen' component={DrawerNavigator}/>
       <Stack.Screen  name='ProspectScreen' component={ProspectScreen}/>
       <Stack.Screen  name='CalenderScreen' component={CalenderScreen}/>
       <Stack.Screen  name='SelectBranchScreen' component={SelectBranchScreen}/>
       <Stack.Screen  name='ActionTodayScreen' component={ActionTodayScreen}/>




      </Stack.Navigator>
    </NavigationContainer>
  );
}
