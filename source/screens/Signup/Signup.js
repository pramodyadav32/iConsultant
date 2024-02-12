import React, { useEffect,useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView,StatusBar, TextInput } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, selectedBranch_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './SignupStyle'
import Button from '../../components/Button';
import SelectDropList from '../../components/SelectDropList';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { APIName, apiCall } from '../../utilities/apiCaller';

export default function Signup(props) {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [name,setName] = useState('')
  const [workExp,setWorkExp] = useState('')
  const [password, setPassword] = useState('')

    const fn_Veify = () => {
        if (email === '') common.showMsg("Please enter email")
        else if (!common.validEmail(email)) common.showMsg("Please enter valid email")
        else if(phone==='')common.showMsg("Please enter mobile number")
        else if(phone.length != 10) common.showMsg("Please enter valid mobile nmumber")
        else if(name==='') common.showMsg("Please enter full name")
        else if(workExp==='') common.showMsg("Please enter work experience")
        else if (password === '') common.showMsg("Please enter password")
        else fn_Signup()
    }

    const fn_Signup = () => {
      dispatch(emptyLoader_Action(true))
        let param = {
          "email": email, 
          "mobileNumber": phone, 
          "fullName": name, 
          "workOfExperience": workExp, 
          "interest": "e23", 
          "password": password,
          "userType": "user",
        }
        apiCall(signupCallBack, APIName.signup, "POST", param)
    }

    const signupCallBack = (res) => {
      dispatch(emptyLoader_Action(false))
        if (res.status === 'success') {
            props.navigation.push("VerifyScreen",{'data':email})
        } else {
          constant.showMsg(res.message)
        }
    }
  

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <FastImage source={images.loginTopImage} resizeMode='contain' style={styles.loginTopImage} />
      <Text style={styles.loginText}>Create a account</Text>

      <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Email</Text>
        <TextInput style={styles.inputLogin} onChangeText={(t)=>setEmail(t)}>{email}</TextInput>
      </View>

      <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Mobile Number</Text>
        <TextInput style={styles.inputLogin} keyboardType='numeric' onChangeText={(t)=>setPhone(t)}>{phone}</TextInput>
      </View>

      <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Full Name</Text>
        <TextInput style={styles.inputLogin} onChangeText={(t)=>setName(t)}>{name}</TextInput>
      </View>

      <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Work of Experience</Text>
        <TextInput style={styles.inputLogin} keyboardType='numeric' onChangeText={(t)=>setWorkExp(t)}>{workExp}</TextInput>
      </View>

      {/* <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Choose your interest</Text>
        <SelectDropList
            title=' '
            list={[]}
            buttonExt={styles.interestList}
            textExt={styles.interestListText}
            // on_Select={(d) => { fn_ChargeType(d) }}
          /> 
      </View> */}

      <View style={styles.loginTopView}>
        <Text style={styles.loginText2}>Password</Text>
        <TextInput style={styles.inputLogin} secureTextEntry={true} placeholder='*******' placeholderTextColor={constant.silver} onChangeText={(t)=>setPassword(t)}>{password}</TextInput>
      </View>

      <Button title='Verify' buttonExt={styles.verifyButton} click_Action={()=>fn_Veify()} />
     <Text onPress={()=>props.navigation.navigate("LoginScreen")} style={styles.text2}>Already have a account ? <Text style={styles.text3}>Login</Text></Text>
     </ScrollView>
    </SafeAreaView>
  );
}
