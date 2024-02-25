import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSideBarMenu';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EmiCalculatorScreen from '../screens/EmiCalculatorScreen/EmiCalculator';
import ActiveOfferScreen from '../screens/ActiveOfferScreen/ActiveOffer';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const dimensions = useWindowDimensions();

  const sideBarMenu = (props) => {
    return <CustomSidebarMenu props={props} />;
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: dimensions.width >= 768 ? 'front' : 'front',
        drawerStyle: { width: '100%',backgroundColor:'#00000099' },
      }}
      drawerContent={props => sideBarMenu(props)}>
      <Drawer.Screen name={'HomeScreen'} component={HomeScreen} />
      <Drawer.Screen name={'EmiCalculatorScreen'} component={EmiCalculatorScreen} />
      <Drawer.Screen name={'ActiveOfferScreen'} component={ActiveOfferScreen} />


 
    


    </Drawer.Navigator>
  );
}
