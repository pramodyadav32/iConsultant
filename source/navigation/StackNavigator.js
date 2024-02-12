import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/Login/LoginScreen';
import Signup from '../screens/Signup/Signup';
import VerifyScreen from '../screens/VerifyScreen/VerifyScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import OrderDetail from '../screens/OrderScreen/OrderDetail';
import VendorProfilesList from '../screens/ProfileScreen/VendorProfilesList';
import VendorProfile from '../screens/ProfileScreen/VenderProfile';
import SuggestionScreen from '../screens/SuggestionScreen/SuggestionScreen';
import CategoryScreen from '../screens/CategoryScreen/CategoryScreen';
import AttributeScreen from '../screens/AttributeScreen/AttributeScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName='DashboardScreen'
      screenOptions={{
        headerShown: false,     
        }}
      >
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
      {/* <Stack.Screen  name='Main' component={DrawerNavigator}/> */}
      <Stack.Screen name='OrderDetail' component={OrderDetail} />
      <Stack.Screen name='VendorProfilesList' component={VendorProfilesList} />
      <Stack.Screen name='VendorProfile' component={VendorProfile} />
      <Stack.Screen name='SuggestionScreen' component={SuggestionScreen} />
      <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
      <Stack.Screen name='AttributeScreen' component={AttributeScreen} />



     
    </Stack.Navigator>
  );
}
