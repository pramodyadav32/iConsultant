import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, selectedBranch_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './LoginScreenStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import { set_UserData } from '../../utilities/AsyncStorage';

export default function LoginScreen(props) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active,setActive] = useState(true)

    const fn_Veify = () => {
        if (email === '') common.showMsg("Please enter email")
        else if (!common.validEmail) common.showMsg("Please enter valid email")
        else if (password === '') common.showMsg("Please enter password")
        else fn_Login()
    }

    const fn_Login = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            'email': email,
            'password': password
        }
        apiCall(loginCallBack, APIName.login, "POST", param)
    }

    const loginCallBack = (res) => {
        dispatch(emptyLoader_Action(false))
        if (res.status === 'success') {
            set_UserData("true",res.data,res.token)
            props.navigation.goBack()
        } else {
          constant.showMsg(res.message)
        }
    }

  const fn_buttonClick=(type)=>{
    setActive(type)
  }

    return (
        <SafeAreaView style={styles.safeView}>
         <StatusBar backgroundColor={'#000'} barStyle={'dark-content'} />
         <View style={styles.mainView}>
            <FastImage source={images.logo} resizeMode='contain' style={styles.logoStyle} />
            <Text style={styles.text1}>iConsultant</Text>
            <View style={styles.detailMainView}>
                <Text style={styles.text2}>Welcome! Please login to continue.</Text>
            <View style={styles.topButtonView}>
                <Pressable style={active ?styles.userButton : styles.userButton2 } onPress={()=>fn_buttonClick(true)}>
                    <FastImage source={images.user} resizeMode='contain' style={styles.userStyle} />
                    <Text style={styles.userText}>User</Text>
                </Pressable>
                <Pressable style={active ?styles.userButton2 : styles.userButton } onPress={()=>fn_buttonClick(false)}>
                    <FastImage source={images.adminIcon} resizeMode='contain' style={styles.userStyle} />
                    <Text style={styles.userText}>Admin</Text>
                </Pressable>
            </View>
            <View style={styles.inputMainView}>
                <FastImage source={images.scanIcon} resizeMode='contain' styles={styles.scanStyle} />
             <TextInput style={styles.inputStyle} ></TextInput>
             <FastImage source={images.eyeIcon} resizeMode='contain' styles={styles.eyeStyle} />

            </View>
            </View>
         </View>
        </SafeAreaView>
    );
}
