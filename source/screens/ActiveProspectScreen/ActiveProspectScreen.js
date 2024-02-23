import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ActionProspectStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import ActionProspectList from './ActionProspectList';

const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
  {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
  {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
  {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
]

export default function ActionProspectScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const [active,setActive] = useState(1)
  const [count,setCount] = useState(0)
 


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Actions Today' mainExt={styles.drawerStyle} onBack={()=>navigation.goBack()} />
      <View style={styles.inputView}>
        <TextInput style={styles.input} selectionColor={'#3B3B3B'} placeholder='Search...' placeholderTextColor={'#3B3B3B'} ></TextInput>
        <FastImage source={images.search} resizeMode='contain' style={styles.searchIcon} />
      </View>
     <ActionProspectList />
     </SafeAreaView>
  )
}
