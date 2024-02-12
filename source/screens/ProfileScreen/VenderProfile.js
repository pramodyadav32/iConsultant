import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import CommonHeader from '../../components/CommonHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import Portfolio from './Portfolio';
import Button from '../../components/Button';

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

export default function VendorProfile(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const [active,setActive] = useState(1)
 
  const fn_TabClick=(type)=>{
    setActive(type)
  }

  return (
    <SafeAreaView style={styles.v_SafeView}>
      <CommonHeader title='Profiler title' onBack={()=>navigation.goBack()} mainExt={styles.v_HeaderView} />
     <View style={styles.v_MainView}>
      <ScrollView>
      <View  style={styles.v_ImageView}>
         <FastImage source={require('../../assets/dummy/profileImage.png')} style={styles.v_Image} resizeMode='cover' />   
            </View>
            <Text style={styles.v_name}>Carpanter Name</Text>
            <Text style={styles.v_place}>Crownie Plaza</Text>
            <View style={styles.v_Hor_Line} />
            <View style={styles.tabMainView}>
            <Pressable onPress={()=>fn_TabClick(1)} style={[styles.tabViewButton,{backgroundColor:active=== 1 ? constant.baseLight : 'transparent',borderColor:active===1 ? constant.silver : 'transparent'}]}>
              <Text style={[styles.tabViewButtonText,{color:active=== 1 ? constant.baseColor : '#838383'}]}>Descriptions</Text>
            </Pressable>
            <Pressable onPress={()=>fn_TabClick(2)} style={[styles.tabViewButton,{backgroundColor:active=== 2 ? constant.baseLight : 'transparent',borderColor:active===2 ? constant.silver : 'transparent'}]}>
              <Text style={[styles.tabViewButtonText,{color:active=== 2 ? constant.baseColor : '#838383'}]}>Portflio</Text>
            </Pressable>
            <Pressable onPress={()=>fn_TabClick(3)} style={[styles.tabViewButton,{backgroundColor:active=== 3 ? constant.baseLight : 'transparent',borderColor:active===3 ? constant.silver : 'transparent'}]}>
              <Text style={[styles.tabViewButtonText,{color:active=== 3 ? constant.baseColor : '#838383'}]}>Reviews</Text>
            </Pressable>
            </View>
            {active===1 &&
            <View>
            <Text style={styles.jobDesTitle}>Job discriptions</Text>
            <Text style={styles.jobDes}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, ontent here', making it look like readable English. Many desktop lishing packages and web page editors now use Lorem Ipsum as their. </Text>
            <Text style={styles.jobDesTitle}>Responsibilities</Text>
            <Text style={styles.jobDes}>{'\u25CF'} It is a long established fact that a reader will be</Text>
            </View>
}
{active===2 && <Portfolio />}
            </ScrollView>
            </View>
            <Button 
            title='Hire Now' 
            buttonExt={styles.profileButton}
            textExt={styles.profileButtonText}
            />
    </SafeAreaView>
  )
}
