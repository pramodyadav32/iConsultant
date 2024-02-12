import React, { useEffect } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView,StatusBar } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, selectedBranch_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import styles from './splashScreenStyle'

export default function SplashScreen(props) {

  const dispatch = useDispatch()

  useEffect(() => {
        //   setTimeout(() => {
        //    props.navigation.dispatch(
        //       CommonActions.reset({
        //         index: 0,
        //         // routes: [{ name: 'StackNavigator' }],

        //         routes: [{ name: 'IntroScreen1' }],
        //       }),
        //     );
        // }, 1000);
  
    getData()
  }, [])



  const getData = () => {
    AsyncStorage.multiGet(['isLogin', 'userData', 'token']).then(response => {
      let login = response[0][1] != null ? JSON.parse(response[0][1]) : false
      if (login === true) {
        let userData = response[1][1] != null ? JSON.parse(response[1][1]) : {}
        let token = response[2][1] != null ? JSON.parse(response[2][1]) : ''
        let newObj = { 'loginStatus' :login, 'data': userData, 'token': token }
        dispatch(userData_Action(newObj))
        setTimeout(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                // routes: [{ name: 'IntroScreen1' }],
                routes: [{ name: 'VendorNavigator' }],
              }),
            );         
        }, 1000);

      } else {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            // routes: [{ name: 'StackNavigator' }],
            routes: [{ name: 'IntroScreen1' }],
          }),
        );
      }
    })
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <ImageBackground source={require("../../assets/images/splashImage.png")}
        style={styles.splashImage}
        resizeMode='cover'
      />
    </SafeAreaView>
  );
}
