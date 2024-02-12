import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import CommonHeader from '../../components/CommonHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'

const data =[
    {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
    {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
    {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
    {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':5,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':6,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':7,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':8,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
    {'key':9,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
  
]

export default function VendorProfilesList(props) {
  const { navigation } = props
  const dispatch = useDispatch()
 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: constant.baseLight }}>
      <CommonHeader title='All Profiles' onBack={()=>navigation.goBack()} />
        <FlatList 
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={()=>common_fn.listSpace(constant.resW(4))}
        ListFooterComponent={()=>common_fn.listSpace(constant.resW(25))}
        renderItem={({item,index})=>{
          return(
            <Pressable onPress={()=>null} style={styles.orderD_BiderMainView}>
             <FastImage source={require('../../assets/dummy/profileImage.png')} style={styles.orderBiderImage} resizeMode='cover' />
             <View style={styles.listBiderSubView}>
                <Text style={styles.orderBiderTitle}>DNA lounge chair</Text>
                <Text style={styles.orderBiderDes}>Help you relax after work time </Text>
                <Text style={styles.orderBiderText}>$125</Text>     
             </View>
            </Pressable>
          )
        }}
        />    
    </SafeAreaView>
  )
}
