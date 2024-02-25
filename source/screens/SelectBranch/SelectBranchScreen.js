import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux'
import { userData_Action,emptyLoader_Action, selectedBranch_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './SelectBranchStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import * as Async from '../../utilities/AsyncStorage'

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
    const {outlets,token} = useSelector(state=>state.AuthReducer)
    const [branchList,setBranchList] = useState(outlets)
  
    useEffect(()=>{
      setBranchList(outlets)
      console.log("outlets",outlets)
    },[])
  

    const fn_Veify = (item,index) => {
        dispatch(emptyLoader_Action(true));
        setActive(index);
        dispatch(selectedBranch_Action(item));
        Async.set_SelectBranch(item)
        setTimeout(() => {
          dispatch(emptyLoader_Action(false));
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            }),
          );
        }, 3000);    
    }


    return (
        <SafeAreaView style={styles.safeView}>
            <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
            <ImageBackground source={images.SplashScreen} resizeMode='cover' style={styles.bgImage}>
                <View style={styles.mainView}>
                    <FastImage source={images.logo} resizeMode='contain' style={styles.logoStyle} />
                    <Text style={styles.text1}>iConsultant</Text>
                    <View style={styles.detailMainView}>
                      <FlatList
                       data={branchList}
                       style={{maxHeight:constant.moderateScale(300)}}
                       renderItem={({item,index})=>{
                        return(
                            <Pressable onPress={()=>fn_Veify(item,index)} style={active=== index ? styles.inputMainView2 : styles.inputMainView} >
                            <Text style={active === index ? styles.text3 : styles.text2}>{item?.locationDesc}</Text>
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
