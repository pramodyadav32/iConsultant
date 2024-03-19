import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable } from 'react-native';
import images from '../../utilities/images';
import * as Async from '../../utilities/AsyncStorage'
import { useDispatch } from 'react-redux'
import { userData_Action,emptyLoader_Action } from '../../redux/actions/AuthAction'
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
    // const [comp_Id, setComp_Id] = useState('Aras')
    // const [user_Id,setUser_Id] = useState('dilip')
    // const [password, setPassword] = useState('orbit')
    const [comp_Id, setComp_Id] = useState('')
    const [user_Id,setUser_Id] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(true)

    const fn_Veify = () => {
        if (comp_Id === '') common.showMsg("Please enter company ID")
        else if (user_Id === '') common.showMsg("Please enter user ID")
        else if (password === '') common.showMsg("Please enter password")
        else fn_Login()
    }

    const fn_Login = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "loginType": active ? "CDB_USER" : "CDB_ADMIN",
            "companyId": comp_Id.toUpperCase(),
            "password": password,
            "userId": user_Id.toUpperCase(),
            "appVersion": "2",
            "versionCode": "SERVICE_RECEPTION",
            "macAddress": "90:e7:c4:04:cb:39"
          }
        apiCall(loginCallBack, APIName.login, "POST", param)
    }

    const loginCallBack = (res) => {
        dispatch(emptyLoader_Action(false))
        console.log("loginres"+JSON.stringify(res))
        if (res != undefined && res?.isAuthenticated) {
            dispatch(emptyLoader_Action(false))
            let data = { loginStatus : true , data: res?.loginContext, token: res?.token, outlets: res?.outlets }
            Async.set_UserData('true', res?.loginContext, res?.token, res?.outlets)
            dispatch(userData_Action(data))
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'SelectBranchScreen' }],
              }),
            );
          } else {
            constant.showMsg("Invalid login Details")
            setTimeout(() => { dispatch(emptyLoader_Action(false)) }, 1000);
          }
    }

    const fn_buttonClick = (type) => {
        setActive(type)
    }

    const fn_LoginClick =()=>{
        props.navigation.navigate("SelectBranchScreen")
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
            <ImageBackground source={images.SplashScreen} resizeMode='cover' style={styles.bgImage}>
                <View style={styles.mainView}>
                    <FastImage source={images.logo} resizeMode='contain' style={styles.logoStyle} />
                    <Text style={styles.text1}>iConsultant</Text>
                    <View style={styles.detailMainView}>
                        <Text style={styles.text2}>Welcome! Please login to continue.</Text>
                        <View style={styles.topButtonView}>
                            <Pressable style={active ? styles.userButton : styles.userButton2} onPress={() => fn_buttonClick(true)}>
                                <FastImage source={images.user} resizeMode='contain' style={styles.userStyle} />
                                <Text style={styles.userText}>User</Text>
                            </Pressable>
                            <Pressable style={active ? styles.userButton2 : styles.userButton} onPress={() => fn_buttonClick(false)}>
                                <FastImage source={images.adminIcon} resizeMode='contain' style={styles.userStyle} />
                                <Text style={styles.userText}>Admin</Text>
                            </Pressable>
                        </View>

                        <View style={styles.inputMainView}>
                            <Image source={images.scanIcon} resizeMode='contain' style={styles.scanIconStyle} />
                            <TextInput style={styles.inputStyle} onChangeText={(t)=>setComp_Id(t)} placeholderTextColor={'#797979'} placeholder='Company ID' >{comp_Id}</TextInput>
                            <Image source={images.eyeIcon} resizeMode='contain' style={styles.eyeStyle} />
                        </View>
                        <View style={styles.inputMainView}>
                            <FastImage source={images.userIcon} resizeMode='contain' style={styles.userIconStyle} />
                            <TextInput style={styles.inputStyle} onChangeText={(t)=>setUser_Id(t)}  placeholderTextColor={'#797979'} placeholder='User ID' >{user_Id}</TextInput>
                        </View>
 
                        <View style={styles.inputMainView}>
                            <Image source={images.lock} resizeMode='contain' style={styles.scanIconStyle} />
                            <TextInput style={styles.inputStyle} onChangeText={(t)=>setPassword(t)} placeholderTextColor={'#797979'} placeholder='Password' >{password}</TextInput>
                            <Image source={images.eyeIcon} resizeMode='contain' style={styles.eyeStyle} />
                        </View>
                        <Button
                            title='Log In'
                            buttonExt={styles.loginButton}
                           click_Action={()=>fn_Veify()}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
