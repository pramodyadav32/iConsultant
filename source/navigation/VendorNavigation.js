import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DashboardScreen from '../VendorScreen/VendorDashboard/VendorDashboardScreen';
import ProfileScreen from '../VendorScreen/VendorProfileScreen/ProfileScreen';
import OrderDetail from '../screens/OrderScreen/OrderDetail';
import VendorProfilesList from '../screens/ProfileScreen/VendorProfilesList';
import VendorProfile from '../screens/ProfileScreen/VenderProfile';
import SuggestionScreen from '../screens/SuggestionScreen/SuggestionScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function VendorNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        }}
      >
       
     <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
      {/* <Stack.Screen  name='Main' component={DrawerNavigator}/> */}
      <Stack.Screen name='OrderDetail' component={OrderDetail} />
      <Stack.Screen name='VendorProfilesList' component={VendorProfilesList} />
      <Stack.Screen name='VendorProfile' component={VendorProfile} />
      <Stack.Screen name='SuggestionScreen' component={SuggestionScreen} />



     
    </Stack.Navigator>
  );
}
