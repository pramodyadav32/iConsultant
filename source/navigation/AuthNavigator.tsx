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
import UpcomingActionScreen from '../screens/UpcomingActionScreen/UpcomingActionScreen';
import TodayTestDriveScreen from '../screens/TodayTestDriveScreen/TodayTestDriveScreen';
import ActionProspectScreen from '../screens/ActiveProspectScreen/ActiveProspectScreen';
import ProspectDataSheetScreen from '../screens/ProspectDataSheetScreen/ProspectDataSheetScreen';
import CreatePerforma from '../screens/CreatePerforma/CreatePerforma';
import EditProspectScreen from '../screens/EditProspectScreen/EditProspectScreen';
import EmiCalculatorScreen from '../screens/EmiCalculatorScreen/EmiCalculator';
import ActiveOfferScreen from '../screens/ActiveOfferScreen/ActiveOffer';

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
       <Stack.Screen  name='UpcomingActionScreen' component={UpcomingActionScreen}/>
       <Stack.Screen  name='TodayTestDriveScreen' component={TodayTestDriveScreen}/>
       <Stack.Screen  name='ActionProspectScreen' component={ActionProspectScreen}/>
       <Stack.Screen  name='ProspectDataSheetScreen' component={ProspectDataSheetScreen}/>
       <Stack.Screen  name='CreatePerforma' component={CreatePerforma}/>
       <Stack.Screen  name='EditProspectScreen' component={EditProspectScreen}/>
       <Stack.Screen  name='EmiCalculatorScreen' component={EmiCalculatorScreen}/>
       <Stack.Screen  name='ActiveOfferScreen' component={ActiveOfferScreen}/>




      </Stack.Navigator>
    </NavigationContainer>
  );
}
