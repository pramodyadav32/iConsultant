import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Animated,Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './HomeScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import ActionTodayList from './ActionTodayList';
import ActionUpcomingList from './ActionUpcomingList';
import DeviceInfo from 'react-native-device-info';

const data = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
  { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

export default function HomeScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const [bannerData, setbannerData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [bannerLoader, setBannerLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const scaleValue = new Animated.Value(1);
  
  const [position] = useState(new Animated.ValueXY({ x: constant.moderateScale(10), y: constant.moderateScale(133) }));
  useEffect(() => {
    //  getBanner()
    //  getCategory()
    //  getProfiles()
  }, [])

  const getBanner = () => {
    setBannerLoader(true)
    tokenApiCall(bannerCallBack, APIName.getBanner, "GET", '')
  }

  const bannerCallBack = (res) => {
    setBannerLoader(false)
    if (res.status === 'success') {
      setbannerData(res.data)
    } else {
      constant.showMsg(res.message)
    }
  }

  const getCategory = () => {
    setLoader(true)
    tokenApiCall(categoryCallBack, APIName.getCategories, "GET", '')
  }

  const categoryCallBack = (res) => {
    setLoader(false)
    if (res.status === 'success') {
      setCategoryData(res.data)
    } else {
      constant.showMsg(res.message)
    }
  }

  const getProfiles = () => {
    tokenApiCall(profileCallBack, APIName.getPopularProfile, "GET", '')
  }

  const profileCallBack = (res) => {
    console.log('profiledata==============', res.data)
    if (res.status === 'success') {
      setProfileData(res.data?.profiles)
    } else {
      constant.showMsg(res.message)
    }
  }

const fn_buttonClick=(type)=>{
 props.navigation.navigate("ActionTodayScreen")
}

const fn_Button=(type)=>{
  let isTablet = DeviceInfo.isTablet();
   isTablet ? fn_Button2(type) : fn_Button1(type)
}

const fn_Button1=(type)=>{
  if(type==1){
    Animated.spring(position, {
      toValue: { x: constant.resW(3), y: constant.moderateScale(130) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
  // props.navigation.navigate("ActionTodayScreen")
  }else if(type==2){
    Animated.spring(position, {
      toValue: { x: constant.resW(52), y: constant.moderateScale(130) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate('UpcomingActionScreen')
  }else if(type==3){
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(12), y: constant.moderateScale(265) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("TodayTestDriveScreen")
  }else{
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(200), y: constant.moderateScale(265) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("ActionProspectScreen")
  }
}

const fn_Button2=(type)=>{
  if(type==1){
    Animated.spring(position, {
      toValue: { x: constant.resW(3), y: constant.moderateScale(130) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
  // props.navigation.navigate("ActionTodayScreen")
  }else if(type==2){
    Animated.spring(position, {
      toValue: { x: constant.resW(52), y: constant.moderateScale(130) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate('UpcomingActionScreen')
  }else if(type==3){
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(12), y: constant.moderateScale(265) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("TodayTestDriveScreen")
  }else{
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(200), y: constant.moderateScale(265) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("ActionProspectScreen")
  }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
      <StatusBar translucent={false} />
      <HomeHeader title='Home' mainExt={styles.drawerStyle} />
       <View style={{position:"relative",paddingHorizontal:constant.moderateScale(10),paddingVertical:constant.moderateScale(5)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Pressable onPress={()=>fn_Button(1)} style={styles.homeBoxStyle}  >
            <Text style={styles.boxText}>Actions Today</Text>
            <View style={styles.homeSubBox}> 
              <View style={styles.homeSubBox1}>
              <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} />
              </View>
              <Text style={styles.homeSubBoxText}>5</Text>

            </View>
      
            </Pressable>
          <Pressable onPress={()=>fn_Button(2)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Upcoming Actions</Text>
            <View>
              
            </View>
            </Pressable>

        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:constant.moderateScale(6)}}>
          <Pressable onPress={()=>fn_Button(3)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Test Drives Today</Text>
            <View>
              
            </View>
            </Pressable>
          <Pressable onPress={()=>fn_Button(4)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Active Prospect</Text>
            <View>
              
            </View>
            </Pressable>
        </View>
        <Animated.View style={[styles.homeHorz,{  transform: position.getTranslateTransform()}]} />
       </View>
      <View style={styles.topButtonView}>
        <Pressable style={ styles.userButton} onPress={() => fn_buttonClick(1)}>
          <Text style={styles.userText}>Create Prospect</Text>
          <FastImage source={images.rightArrow} tintColor={constant.whiteColor} resizeMode='contain' style={styles.userStyle} />

        </Pressable>
        <Pressable style={styles.userButton} onPress={() => fn_buttonClick(2)}>
          <Text style={styles.userText}>Calender</Text>
          <FastImage source={images.rightArrow} tintColor={constant.whiteColor} resizeMode='contain' style={styles.userStyle} />
        </Pressable>
      </View>
      <ActionTodayList />
      {/* <ActionUpcomingList /> */}


    </SafeAreaView>
  )
}
