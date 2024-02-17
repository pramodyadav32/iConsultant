import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action,emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './SelectBranchStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import { set_UserData } from '../../utilities/AsyncStorage';

const data =[
    {"key":1,'title':'SECUNDERABAD WK'},
    {"key":2,'title':'SECUNDERABAD WK'},
    {"key":3,'title':'SECUNDERABAD WK'},
    {"key":4,'title':'SECUNDERABAD WK'},
    {"key":5,'title':'SECUNDERABAD WK'},
    {"key":6,'title':'SECUNDERABAD WK'},
 

]


export default function SelectBranchScreen(props) {

    const dispatch = useDispatch()
    const [active, setActive] = useState(-1)


    const fn_Veify = (item,index) => {
        setActive(index)
        props.navigation.navigate("HomeScreen")
    //    fn_Login()
    }

    // const fn_Login = () => {
    //     dispatch(emptyLoader_Action(true))
    //     let param = {
    //         'email': email,
    //         'password': password
    //     }
    //     apiCall(loginCallBack, APIName.login, "POST", param)
    // }

    // const loginCallBack = (res) => {
    //     dispatch(emptyLoader_Action(false))
    //     if (res.status === 'success') {
    //         set_UserData("true", res.data, res.token)
    //         props.navigation.goBack()
    //     } else {
    //         constant.showMsg(res.message)
    //     }
    // }


    return (
        <SafeAreaView style={styles.safeView}>
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
            <ImageBackground source={images.SplashScreen} resizeMode='cover' style={styles.bgImage}>
                <View style={styles.mainView}>
                    <FastImage source={images.logo} resizeMode='contain' style={styles.logoStyle} />
                    <Text style={styles.text1}>iConsultant</Text>
                    <View style={styles.detailMainView}>
                      <FlatList
                       data={data}
                       style={{maxHeight:constant.moderateScale(300)}}
                       renderItem={({item,index})=>{
                        return(
                            <Pressable onPress={()=>fn_Veify(item,index)} style={active=== index ? styles.inputMainView2 : styles.inputMainView} >
                            <Text style={active === index ? styles.text3 : styles.text2}>{item?.title}</Text>
                           </Pressable>
                        )
                       }}
                      
                      />
                       
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
