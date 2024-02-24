import React, { useEffect,useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView,StatusBar, Animated } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, selectedBranch_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import styles from './splashScreenStyle'
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'

export default function SplashScreen(props) {

  const dispatch = useDispatch()
  const [fadeAnimation,setFadeAnimation] = useState(new Animated.Value(0))
  const [buttonFadeAnimation,setButtonFadeAnimation] = useState(new Animated.Value(0))

  const [moveUpAnimation,setMoveUpAnimation] = useState(new Animated.Value(0))
  const [showButton,setShowButton] = useState(false)

  useEffect(() => {
        //   setTimeout(() => {
        //    props.navigation.dispatch(
        //       CommonActions.reset({
        //         index: 0,
        //         // routes: [{ name: 'StackNavigator' }],

        //         routes: [{ name: 'HomeScreen' }],
        //       }),
        //     );
        // }, 1000);
        setTimeout(() => {
          animateOpacity()
    }, 500);
      
            setTimeout(() => {
              animateMoveUp()
        }, 1500);

        setTimeout(() => {
         buttonAnimateOpacity()
         setShowButton(true)
    }, 1900);
  
    // getData()
  }, [])



  // const getData = () => {
  //   AsyncStorage.multiGet(['isLogin', 'userData', 'token']).then(response => {
  //     let login = response[0][1] != null ? JSON.parse(response[0][1]) : false
  //     if (login === true) {
  //       let userData = response[1][1] != null ? JSON.parse(response[1][1]) : {}
  //       let token = response[2][1] != null ? JSON.parse(response[2][1]) : ''
  //       let newObj = { 'loginStatus' :login, 'data': userData, 'token': token }
  //       dispatch(userData_Action(newObj))
  //       setTimeout(() => {
  //           props.navigation.dispatch(
  //             CommonActions.reset({
  //               index: 0,
  //               // routes: [{ name: 'IntroScreen1' }],
  //               routes: [{ name: 'VendorNavigator' }],
  //             }),
  //           );         
  //       }, 1000);

  //     } else {
  //       props.navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           // routes: [{ name: 'StackNavigator' }],
  //           routes: [{ name: 'IntroScreen1' }],
  //         }),
  //       );
  //     }
  //   })
  // }

  animateOpacity = () => {
    Animated.timing(
    fadeAnimation,
      {
        toValue: 1, // Target opacity (0 for fully transparent)
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // To improve performance, use the native driver for animation
      }
    ).start();
  };

  buttonAnimateOpacity = () => {
    Animated.timing(
   buttonFadeAnimation,
      {
        toValue: 1, // Target opacity (0 for fully transparent)
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // To improve performance, use the native driver for animation
      }
    ).start();
  };

  animateMoveUp = () => {
    Animated.timing(
      moveUpAnimation,
      {
        toValue: -100, // Target position (negative values move the view up)
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // To improve performance, use the native driver for animation
      }
    ).start();
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <ImageBackground source={images.SplashScreen}
        style={styles.splashImage}
        resizeMode='cover'
      >
        <View style={styles.mainView}>
              <Animated.View  
               style={{
                opacity: fadeAnimation,
                alignItems:'center',
                justifyContent:'center',
                transform: [{ translateY: moveUpAnimation }],
               
              }}
              >
                    <FastImage source={images.logo} resizeMode='contain' style={styles.logoStyle} />
                    <Text style={styles.text1}>iConsultant</Text>   
                    </Animated.View>  
{showButton &&

                   <Animated.View
                   style={{
                    backgroundColor:'#FFFFFF29',
                    borderWidth:1,
                    borderColor:'#fff',
                    width:constant.moderateScale(300),
                    borderRadius:20,
                    paddingTop:constant.moderateScale(10),
                    paddingBottom:constant.moderateScale(10),
                    opacity: buttonFadeAnimation,
                    position:'absolute',
                    top:constant.moderateScale(340)
                   }}
                   >
                    <Button 
                    title='DEMO OFFLINE'
                    buttonExt={{backgroundColor:'#ABABAB'}}
                    />
                     <Button 
                    title='DEMO ONLINE'
                    buttonExt={{backgroundColor:'#ABABAB',marginTop:constant.moderateScale(10),}}
                    />
                      <Button 
                    title='LIVE'
                    buttonExt={{marginTop:constant.moderateScale(10),}}
                    click_Action={()=>
                          props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                // routes: [{ name: 'StackNavigator' }],

                routes: [{ name: 'HomeScreen' }],
              }),
            )
                    }
                    />
                    </Animated.View>  
}   
                </View>
        </ImageBackground>
    </SafeAreaView>
  );
}
