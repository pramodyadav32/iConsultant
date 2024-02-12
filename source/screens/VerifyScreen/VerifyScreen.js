import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, selectedBranch_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './VerifyScreenStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import OTPTextView from "react-native-otp-textinput";
import * as common from '../../utilities/common_fn'
import { APIName, apiCall } from '../../utilities/apiCaller';
import { set_UserData } from '../../utilities/AsyncStorage';

export default function VerifyScreen(props) {
    const {navigation,route} = props
    const dispatch = useDispatch()
    const [otp,setOtp] = useState('')

    const fn_Veify = () => {
        if (otp === '') common.showMsg("Please enter otp")
        else if(otp.length != 6) common.showMsg("Please enter valid otp") 
        else fn_OtpApi()
    }

    const fn_OtpApi = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "email": route.params.data,
            "otp": otp
        }
        apiCall(otpCallBack, APIName.verifyOTP, "POST", param)
    }

    const otpCallBack = (res) => {
        setTimeout(()=>{dispatch(emptyLoader_Action(false))},1000)
        if (res.status === 'success') {
            set_UserData("true",res.data,res.token)
            props.navigation.pop(2)
        } else {
          constant.showMsg(res.message)
        }
    }

    const fn_Resend = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "email": route.params.data,
        }
        apiCall(resendCallBack, APIName.resendOTP, "POST", param)
    }

    const resendCallBack = (res) => {
        setTimeout(()=>{dispatch(emptyLoader_Action(false))},1000)
        if (res.status === 'success') {
            // props.navigation.navigate("StackNavigator")
        } else {
          constant.showMsg(res.message)
        }
    }


    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <Pressable style={styles.backButton} onPress={()=>props.navigation.goBack()}>
                <FastImage source={images.backIcon} resizeMode='contain' style={styles.loginTopImage} />
                </Pressable>
                <Text style={styles.loginText}>Verify Mobile Number{'\n'}Enter OTP</Text>
                <OTPTextView
          handleTextChange={(e) => setOtp(e)}
          containerStyle={styles.otpInputContainer}
          textInputStyle={styles.otpFormTextInputStyle}
          tintColor="#000"
          inputCount={6}
          autoFocus={true}
        />
      <Text onPress={() => fn_Resend()} style={styles.text2}>Don't get Code ? <Text style={styles.text3}>Resend</Text></Text>
                <Button title='Continue' buttonExt={styles.verifyButton} click_Action={()=>fn_Veify()} />
                <Text onPress={() => props.navigation.navigate("Signup")} style={styles.text2}>Don't have a account ? <Text style={styles.text3}>Register</Text></Text>
            </ScrollView>
        </SafeAreaView>
    );
}
