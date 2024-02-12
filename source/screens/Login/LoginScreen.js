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

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <FastImage source={images.loginTopImage} resizeMode='contain' style={styles.loginTopImage} />
                <Text style={styles.loginText}>Login</Text>

                <View style={styles.loginTopView}>
                    <Text style={styles.loginText2}>Email</Text>
                    <TextInput style={styles.inputLogin} onChangeText={(t) => setEmail(t)}></TextInput>
                </View>

                <View style={styles.loginTopView}>
                    <Text style={styles.loginText2}>Password</Text>
                    <TextInput style={styles.inputLogin} secureTextEntry={true} placeholder='*******' placeholderTextColor={constant.silver} onChangeText={(t) => setPassword(t)}></TextInput>
                </View>
                <Text style={styles.forgetStyle}>Forget Password</Text>
                <Button title='Verify' buttonExt={styles.verifyButton} click_Action={() => fn_Veify()} />
                <Text onPress={() => props.navigation.push("Signup")} style={styles.text2}>Don't have a account ? <Text style={styles.text3}>Register</Text></Text>

            </ScrollView>

        </SafeAreaView>
    );
}
