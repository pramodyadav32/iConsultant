import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StackNavigator from './StackNavigator';
import SplashScreen from '../screens/SplashScreen/splashScreen';
import IntroScreen1 from '../screens/SplashScreen/Intro_Screen';
import IntroScreen2 from '../screens/SplashScreen/IntroScreen2';
import IntroScreen3 from '../screens/SplashScreen/IntroScreen';
import StartScreen from '../screens/SplashScreen/StartScreen';
import LoginScreen from '../VendorScreen/VendorLogin/LoginScreen';
import Signup from '../VendorScreen/VendorSignup/Signup';
import VerifyScreen from '../VendorScreen/VendorVerifyScreen/VerifyScreen';
import VendorNavigator from './VendorNavigation';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
        <AuthStack.Screen name="IntroScreen1" component={IntroScreen1} />
        <AuthStack.Screen name="IntroScreen2" component={IntroScreen2} />
        <AuthStack.Screen name="IntroScreen3" component={IntroScreen3} />
        <AuthStack.Screen name="StartScreen" component={StartScreen} />
        <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="VerifyScreen" component={VerifyScreen} />
        <AuthStack.Screen name="StackNavigator" component={StackNavigator}/>
        <AuthStack.Screen name="VendorNavigator" component={VendorNavigator}/>

      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
