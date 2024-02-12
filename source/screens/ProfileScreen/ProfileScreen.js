import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator } from 'react-native';
// import * as apiConfig from '../../utilities/apiCaller'
import * as constant from '../../utilities/constants'
import styles from './ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import DrawerHeader from '../../components/DrawerHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { CommonActions } from '@react-navigation/native';

const data =[
    {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
    {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
    {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
    {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
  ]

export default function ProfileScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
 
  const fn_Click=(item)=>{
    console.log("it",item)
    if(item.key===4){
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        }),
      );
    }
  }

  const fn_Seprator=()=>{
    return(<View style={styles.seprateLine} />)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: constant.whiteColor }}>
      <DrawerHeader title='Profile' showDrawer={navigation} />
      
      <View style={styles.profilePicView}>
        <FastImage source={require('../../assets/dummy/profileuser.png')} style={styles.profilePic} resizeMode='contain' />
        <Pressable style={styles.profilePicEditView}>
        <View style={styles.profilePicEditSubView}>
            <FastImage source={images.edit} style={styles.profilePicEditIcon} resizeMode='contain' />
        </View>
        </Pressable>
      </View>
      <Text style={styles.profileText}>Jacob Jones</Text>
        <FlatList 
        data={data}
        ListHeaderComponent={()=>common_fn.listSpace(constant.resW(8))}
        ItemSeparatorComponent={()=>fn_Seprator()}
        renderItem={({item,index})=>{
          return(
            <Pressable onPress={()=>fn_Click(item)} style={styles.listView}>
            <View style={styles.listSubView}>
             <FastImage source={item.source} style={styles.listImage} resizeMode='contain' />
            <Text style={styles.listTitle}>{item.title}</Text>
            </View>
            <FastImage source={images.leftIcon}  tintColor={constant.baseColor} style={styles.leftIconStyle} resizeMode='contain' />
            </Pressable>
          )
        }}
        />
        
    </SafeAreaView>
  )
}
