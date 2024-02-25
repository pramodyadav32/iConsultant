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
import * as Progress from 'react-native-progress';
const data = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
  { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

export default function HomeScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const [prospectData, setProspectData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [bannerLoader, setBannerLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const scaleValue = new Animated.Value(1);
  
  const [position] = useState(new Animated.ValueXY({ x: constant.moderateScale(10), y: constant.moderateScale(133) }));
  useEffect(() => {
     getProspectData()
     getDataCount()
    //  getProfiles()
  }, [])

  const getProspectData = () => {
    let param={
      "brandCode": "ISUZU",
      "countryCode": "IN",
      "companyId": "ARAS",
      "branchCode": "MADU01",
      "prospectStatus": "A",
      "prospectNo": 0,
      "rating": "ALL",
      "loginUserCompanyId": "ARAS",
      "loginUserId": "vinod",
      "ipAddress": "1::1"
  }
    tokenApiCall(bannerCallBack, APIName.GetProspectsList, "POST",param)
  }

  const bannerCallBack = (res) => {
    console.log("prospect",JSON.stringify(res))
    if (res.statusCode === 200) {
      setProspectData(res?.result)
    } else {
      constant.showMsg(res.message)
    }
  }

  const getDataCount = () => {
   let param ={
    "brandCode": "ISUZU",
    "countryCode": "IN",
    "companyId": "ARAS",
    "branchCode": "MADU01",
    "loginUserCompanyId": "ORBIT",
    "loginUserId": "VINOD",
    "ipAddress": "1::1"
}
    tokenApiCall(dataCountCallBack, APIName.GetDataCounts, "POST", param)
  }

  const dataCountCallBack = (res) => {
    console.log("dataCount"+JSON.stringify(res))
    if (res.statusCode === 200) {
      
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
  if(type===1){
 props.navigation.navigate("ProspectScreen")
  }
  else{
    props.navigation.navigate("EmiCalculatorScreen")
  }
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
      toValue: { x: constant.resW(2), y: constant.moderateScale(132) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
  // props.navigation.navigate("ActionTodayScreen")
  }else if(type==2){
    Animated.spring(position, {
      toValue: { x: constant.resW(52), y: constant.moderateScale(132) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate('UpcomingActionScreen')
  }else if(type==3){
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(12), y: constant.moderateScale(268) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("TodayTestDriveScreen")
  }else{
    Animated.spring(position, {
      toValue: { x: constant.moderateScale(277), y: constant.moderateScale(268) }, // Example new position
      useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
    }).start();
    // props.navigation.navigate("ActionProspectScreen")
  }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
      <StatusBar translucent={false} />
      <HomeHeader title='Home' mainExt={styles.drawerStyle} showDrawer={navigation} />
      <ScrollView>
       <View style={{position:"relative",paddingHorizontal:constant.moderateScale(10),paddingVertical:constant.moderateScale(5)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Pressable onPress={()=>fn_Button(1)} style={styles.homeBoxStyle}  >
            <Text style={styles.boxText}>Actions Today</Text>
            <View style={styles.homeSubBox}> 
              <View style={styles.homeSubBox1}>
              <Progress.Circle 
              size={constant.moderateScale(50)} 
              indeterminate={false} 
              progress={0.2}
              color={'#FE0F17'}
              unfilledColor={'#FE0F1730'}
              borderWidth={0}
              thickness={8}
              showsText={true}
              textStyle={{
                fontSize:constant.moderateScale(15),
                fontFamily:constant.typeRegular,
                color:'#535353'
              }}

              />
              <FastImage source={images.DashboardIcon}  resizeMode='contain' style={styles.dashBoardIcon} />
              </View>
              <Text onPress={()=>navigation.navigate("ActionTodayScreen")} style={styles.homeSubBoxText}>5</Text>

            </View>
      
            </Pressable>
          <Pressable onPress={()=>fn_Button(2)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Upcoming Actions</Text>
          <View style={styles.homeSubBox}> 
              <View style={styles.homeSubBox1}>
              {/* <Progress.Circle 
              size={constant.moderateScale(50)}
              indeterminate={false} 
              progress={0.2}
              color={'#FE0F17'}
              unfilledColor={'#FE0F1730'}
              borderWidth={0}
              thickness={8}
              showsText={true}
              textStyle={{
                fontSize:constant.moderateScale(15),
                fontFamily:constant.typeRegular,
                color:'#535353'
              }}
              /> */}
              {/* <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} /> */}
              </View>
              <Text onPress={()=>navigation.navigate("UpcomingActionScreen")}  style={styles.homeSubBoxText}>5</Text>
            </View>
            </Pressable>

        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:constant.moderateScale(6)}}>
          <Pressable onPress={()=>fn_Button(3)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Test Drives Today</Text>
          <View style={styles.homeSubBox}> 
              <View style={styles.homeSubBox1}>
              <Progress.Circle 
              size={constant.moderateScale(50)}
              indeterminate={false} 
              progress={0.2}
              color={'#FE0F17'}
              unfilledColor={'#FE0F1730'}
              borderWidth={0}
              thickness={8}
              showsText={true}
              textStyle={{
                fontSize:constant.moderateScale(15),
                fontFamily:constant.typeRegular,
                color:'#535353'
              }}

              />
              <FastImage source={images.DashboardIcon}  resizeMode='contain' style={styles.dashBoardIcon} />
              </View>
              <Text onPress={()=>navigation.navigate("TodayTestDriveScreen")} style={styles.homeSubBoxText}>5</Text>

            </View>
            </Pressable>
          <Pressable onPress={()=>fn_Button(4)}  style={styles.homeBoxStyle} >
          <Text style={styles.boxText}>Active Prospect</Text>
          <View style={styles.homeSubBox}> 
              <View style={styles.homeSubBox1}>
              <Progress.Circle 
              size={constant.moderateScale(50)}
              indeterminate={false} 
              progress={0.5}
              color={'#FE0F17'}
              unfilledColor={'#FE0F1730'}
              borderWidth={0}
              thickness={8}
              showsText={true}
              textStyle={{
                fontSize:constant.moderateScale(15),
                fontFamily:constant.typeRegular,
                color:'#535353'
              }}

              />
              <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} />
              </View>
              <Text onPress={()=>navigation.navigate("ActionProspectScreen")} style={styles.homeSubBoxText}>10</Text>

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
      <ActionTodayList 
       cardClick={()=>navigation.navigate("ProspectDataSheetScreen")}
      />
      {/* <ActionUpcomingList /> */}

      </ScrollView>
    </SafeAreaView>
  )
}
