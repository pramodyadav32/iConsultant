import React, {useState,useEffect} from 'react';
import {Image, View,Platform,Keyboard} from 'react-native';
import {BottomTabBar,createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import * as constants from '../../utilities/constants';
import styles from './DashboardStyle';
import HomeScreen from '../HomeScreen/HomeScreen';
import DrawerNavigator from '../../navigation/DrawerNavigator';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import OrderScreen from '../OrderScreen/OrderScreen';
import { useSelector,useDispatch } from 'react-redux';

import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';

const Tab = createBottomTabNavigator();

function DashboardScreen({navigation}) {
   const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); 
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); 
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const active=(focus)=>{
   
      if(focus===true) 
      return(constants.baseColor)
     else return('#00000080')
     
  }
return (
  <Tab.Navigator

 backBehavior="initialRoute"
  screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard:true,
          backgroundColor: "transparent",
          elevation: 20,
          zIndex:10,
          unmountOnBlur: true,
          tabBarStyle: {
            // backgroundColor:colors.bottomTabColor,
            // backgroundColor:'#ffffff90',

            position:'absolute',
            elevation:10,
            shadowColor:constants.blackColor,
            shadowOpacity:1,
            left: 0,
            bottom: 0,
            right: 0,
            height: Platform.OS=="ios"  ? constants.resW(20) : constants.resW(18),
            display:isKeyboardVisible? 'none' : 'flex',
            borderTopEndRadius:20,
            borderTopStartRadius:20,
            borderTopWidth:-1,
            paddingBottom:Platform.OS=="ios" ? '4%' : '0%'
         },
         
        }}
  >
    <Tab.Screen
      name="a"
      component={DrawerNavigator}
      options={{
        unmountOnBlur: false,
        tabBarIcon: ({ focused }) => (
                 <FastImage
                  source={images.tab1}
                  resizeMode='contain'
                  tintColor={active(focused)}
                  style={[
                    {
                      height:constants.resW(7),
                      width: constants.resW(7),
                      tintColor: active(focused) ,
                    },
                  ]}
                />
        ),
      }}
    />

    <Tab.Screen
      name="b"
      component={OrderScreen}
      options={{
        unmountOnBlur: false,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabIcon,{}]}>
           <FastImage
                  source={images.tab2}
                  resizeMode='contain'
                  tintColor={active(focused)}
                  style={[
                    {
                      height: constants.resW(7),
                      width: constants.resW(7),
                      tintColor : active(focused)
                    },
                  ]}
                />
           </View>
        ),
      }}
    />

<Tab.Screen
      name="c"
      component={HomeScreen}
      options={{
        unmountOnBlur: false,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabIcon,{}]}>
           <FastImage
                  source={images.tab3}
                  resizeMode='contain'
                  tintColor={active(focused)}
                  style={[
                    {
                      height: constants.resW(6.8),
                      width: constants.resW(6.8),
                      tintColor : active(focused)
                    },
                  ]}
                />
           </View>
        ),
      }}
    />

    <Tab.Screen
      name="d"
      component={HomeScreen}
      options={{
        unmountOnBlur: false,
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabIcon,{}]}> 
             <FastImage
                  source={images.tab4}
                  resizeMode='contain'
                  tintColor={active(focused)}
                  style={[
                    // styles.footerIcon2,
                    {
                      height:constants.resW(7),
                      width: constants.resW(7),
                     

                    },
                  ]}
                />
          </View>
        )
      }}
    />

    <Tab.Screen
      name="e"
      component={ProfileScreen}
      options={{
        unmountOnBlur: false,
        tabBarIcon: ({ focused }) => (  
            <FastImage
            source={images.tab5}
            resizeMode='contain'
                  tintColor={active(focused)}
                  style={[
                    {
                      height:constants.resW(7),
                      width: constants.resW(7),
                    },
                  ]}
                />
        ),
      }}
    />
  </Tab.Navigator>
);
};

export default DashboardScreen;
