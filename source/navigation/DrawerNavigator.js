import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSideBarMenu';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const sideBarMenu = (props) => {
    return <CustomSidebarMenu props={props} />;
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => sideBarMenu(props)}>
      <Drawer.Screen name={'HomeScreen'} component={HomeScreen} />
 
    


    </Drawer.Navigator>
  );
}
