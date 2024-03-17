import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Animated, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar, RefreshControl } from 'react-native';
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
import TestDriveList from './TestDriveList';
import ActiveProspectList from './ActiveProspectList';
import { emptyLoader_Action, home_Refresh_Action } from '../../redux/actions/AuthAction';
import { useFocusEffect, } from '@react-navigation/native';

const data = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
  { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

export default function HomeScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const { userData, selectedBranch,homeRefresh } = useSelector(state => state.AuthReducer)
  const [prospectData, setProspectData] = useState([])
  const [loader, setLoader] = useState(false)
  const [Action_Today, setActionToday] = useState([])
  const [upComing_Action, setUpComingAction] = useState([])
  const [filterUpComing,setFilterUpcomingAction] = useState({})
  const [upComingListData,SetUpComingListData] = useState([])
  const [test_DriveData, setTestDriveData] = useState([])
  const [activeProspect, setActiveProspect] = useState([])
  const [active, setActive] = useState(1)
  const [refresh,setrefresh] = useState(false)
  const [testdriveCount,setTestDriveCount] = useState(0)
  const scaleValue = new Animated.Value(1);

  const [position] = useState(new Animated.ValueXY({ x: constant.moderateScale(10), y: constant.moderateScale(133) }));
 
  useEffect(() => {
    dispatch(emptyLoader_Action(true))
    getProspectData()
    //  getDataCount()
    //  getProfiles()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      // Screen is in focus
      homeRefresh ? getProspectData() : null
      console.log('Screen in focus');
      return () => {
        // Screen is out of focus
        console.log('Screen out of focus');
        // goLive("end",live_Id,broadCastName,broadCasttoken)
        // Call your function or perform actions here
      };
    }, [homeRefresh])
  ) ;

  const getProspectData = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchCode": selectedBranch?.branchCode,
      "prospectStatus": "A",
      "prospectNo": 0,
      "rating": "ALL",
      "loginUserCompanyId": userData?.userCompanyId,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(prospectCallBack, APIName.GetProspectsList, "POST", param)
  }

  const prospectCallBack = async(res) => {
    console.log("prospect", JSON.stringify(res))
     setrefresh(false)
     dispatch(emptyLoader_Action(false))
     dispatch(home_Refresh_Action(false))
    if (res.statusCode === 200) {
      setProspectData(res?.result)
      const initialValue = 0;
       const sumWithInitial = await res?.result.testDeriveTodayList.reduce(
       (accumulator,item) => accumulator + item?.testDriveCount,
       initialValue,   
       )
       setTestDriveCount(sumWithInitial)
      res?.result.actionTodayList != null ? setActionToday(res?.result.actionTodayList) : null
      res?.result.upcommingActionList != null ? SetUpComingListData(res.result?.upcommingActionList) : null
      res?.result.testDeriveTodayList != null ? setTestDriveData(res.result?.testDeriveTodayList) : null
      res?.result.activeProspectList != null ? setActiveProspect(res.result?.activeProspectList) : null
       const groupedData = {};

   await res.result?.upcommingActionList.forEach(item => {
  const dateKey = item.actionDate;

  if (!groupedData[dateKey]) {
    groupedData[dateKey] = [item];
  } else {
    groupedData[dateKey].push(item);
  }
});
 let groupdate = Object.keys(groupedData)
  setFilterUpcomingAction(groupedData)
  setUpComingAction(groupdate)
  console.log("groupedata",groupdate)
    } else {
      constant.showMsg(res.message)
    }
  }

  const getDataCount = () => {
    let param = {
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
    console.log("dataCount" + JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }


  const fn_buttonClick = (type) => {
    if (type === 1) {
      props.navigation.navigate("ProspectScreen")
    }
    else {
      props.navigation.navigate("CalenderScreen")
    }
  }

  const fn_Button = (type) => {
    let isTablet = DeviceInfo.isTablet();
    setActive(type)
    isTablet ? fn_Button2(type) : fn_Button1(type)
  }

  const fn_Button1 = (type) => {
    if (type == 1) {
      Animated.spring(position, {
        toValue: { x: constant.resW(3), y: constant.moderateScale(130) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("ActionTodayScreen")
    } else if (type == 2) {
      Animated.spring(position, {
        toValue: { x: constant.resW(52), y: constant.moderateScale(130) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate('UpcomingActionScreen')
    } else if (type == 3) {
      Animated.spring(position, {
        toValue: { x: constant.moderateScale(12), y: constant.moderateScale(265) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("TodayTestDriveScreen")
    } else {
      Animated.spring(position, {
        toValue: { x: constant.moderateScale(200), y: constant.moderateScale(265) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("ActionProspectScreen")
    }
  }

  const fn_Button2 = (type) => {
    if (type == 1) {
      Animated.spring(position, {
        toValue: { x: constant.resW(2), y: constant.moderateScale(132) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("ActionTodayScreen")
    } else if (type == 2) {
      Animated.spring(position, {
        toValue: { x: constant.resW(52), y: constant.moderateScale(132) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate('UpcomingActionScreen')
    } else if (type == 3) {
      Animated.spring(position, {
        toValue: { x: constant.moderateScale(12), y: constant.moderateScale(268) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("TodayTestDriveScreen")
    } else {
      Animated.spring(position, {
        toValue: { x: constant.moderateScale(277), y: constant.moderateScale(268) }, // Example new position
        useNativeDriver: false, // Ensure to set useNativeDriver to false for non-transform animations
      }).start();
      // props.navigation.navigate("ActionProspectScreen")
    }
  }

  const fn_refresh=()=>{
     setrefresh(true)
     getProspectData()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
      <StatusBar translucent={false} />
      <HomeHeader title='Home' mainExt={styles.drawerStyle} showDrawer={navigation} />
      <ScrollView
       showsVerticalScrollIndicator={false}
       refreshControl={<RefreshControl refreshing={refresh}  onRefresh={()=>fn_refresh()} />}
      >
        <View style={{ position: "relative", paddingHorizontal: constant.moderateScale(10), paddingVertical: constant.moderateScale(5) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={() => fn_Button(1)} style={styles.homeBoxStyle}  >
              <Text style={styles.boxText}>Actions Today</Text>
              <View style={styles.homeSubBox}>
                <View style={styles.homeSubBox1}>
                  <Progress.Circle
                    size={constant.moderateScale(50)}
                    indeterminate={false}
                    progress={Action_Today.length / 100}
                    color={'#FE0F17'}
                    unfilledColor={'#FE0F1730'}
                    borderWidth={0}
                    thickness={8}
                    showsText={true}
                    textStyle={{
                      fontSize: constant.moderateScale(15),
                      fontFamily: constant.typeRegular,
                      color: '#535353'
                    }}

                  />
                  {/* <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} /> */}
                </View>
                <Text onPress={() => navigation.navigate("ActionTodayScreen",{dataList:Action_Today})} style={styles.homeSubBoxText}>{Action_Today.length}</Text>

              </View>

            </Pressable>
            <Pressable onPress={() => fn_Button(2)} style={styles.homeBoxStyle} >
              <Text style={styles.boxText}>Upcoming Actions</Text>
              <View style={styles.homeSubBox}>
                <View style={styles.homeSubBox1}>
                </View>
                <Text onPress={() => navigation.navigate("UpcomingActionScreen",{dataList : upComingListData})} style={styles.homeSubBoxText}>{upComing_Action.length}</Text>
              </View>
            </Pressable>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: constant.moderateScale(6) }}>
            <Pressable onPress={() => fn_Button(3)} style={styles.homeBoxStyle} >
              <Text style={styles.boxText}>Test Drives Today</Text>
              <View style={styles.homeSubBox}>
                <View style={styles.homeSubBox1}>
                  <Progress.Circle
                    size={constant.moderateScale(50)}
                    indeterminate={false}
                    progress={testdriveCount / 100}
                    color={'#FE0F17'}
                    unfilledColor={'#FE0F1730'}
                    borderWidth={0}
                    thickness={8}
                    showsText={true}
                    textStyle={{
                      fontSize: constant.moderateScale(15),
                      fontFamily: constant.typeRegular,
                      color: '#535353'
                    }}

                  />
                  {/* <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} /> */}
                </View>
                <Text onPress={() => navigation.navigate("TodayTestDriveScreen",{dataList : test_DriveData})} style={styles.homeSubBoxText}>{testdriveCount}</Text>

              </View>
            </Pressable>
            <Pressable onPress={() => fn_Button(4)} style={styles.homeBoxStyle} >
              <Text style={styles.boxText}>Active Prospect</Text>
              <View style={styles.homeSubBox}>
                <View style={styles.homeSubBox1}>
                  <Progress.Circle
                    size={constant.moderateScale(50)}
                    indeterminate={false}
                    progress={activeProspect.length/100}
                    color={'#FE0F17'}
                    unfilledColor={'#FE0F1730'}
                    borderWidth={0}
                    thickness={8}
                    showsText={true}
                    textStyle={{
                      fontSize: constant.moderateScale(15),
                      fontFamily: constant.typeRegular,
                      color: '#535353'
                    }}

                  />
                  {/* <FastImage source={images.DashboardIcon} resizeMode='contain' style={styles.dashBoardIcon} /> */}
                </View>
                <Text onPress={() => navigation.navigate("ActionProspectScreen",{dataList:activeProspect})} style={styles.homeSubBoxText}>{activeProspect.length}</Text>

              </View>
            </Pressable>
          </View>
          <Animated.View style={[styles.homeHorz, { transform: position.getTranslateTransform() }]} />
        </View>
        <View style={styles.topButtonView}>
          <Pressable style={styles.userButton} onPress={() => fn_buttonClick(1)}>
            <Text style={styles.userText}>Create Prospect</Text>
            <FastImage source={images.rightArrow} tintColor={constant.whiteColor} resizeMode='contain' style={styles.userStyle} />

          </Pressable>
          <Pressable style={styles.userButton} onPress={() => fn_buttonClick(2)}>
            <Text style={styles.userText}>Calender</Text>
            <FastImage source={images.rightArrow} tintColor={constant.whiteColor} resizeMode='contain' style={styles.userStyle} />
          </Pressable>
        </View>
        {active === 1 &&
          <ActionTodayList
            data={Action_Today}
            cardClick={(item,index) => navigation.navigate("ProspectDataSheetScreen",{cardData:item})}
          />
        }
        {active === 2 &&
          <ActionUpcomingList
            data={upComing_Action}
            filterData={filterUpComing}
            cardClick={(item,index) => navigation.navigate("ProspectDataSheetScreen",{cardData:item})}

          />
        }
        {active === 3 &&
          <TestDriveList
            data={test_DriveData}
            cardClick={(item,index) => navigation.navigate("ProspectDataSheetScreen",{cardData:item})}
          />

        }
        {active === 4 &&
          <ActiveProspectList
            data={activeProspect}
            cardClick={(item,index) => navigation.navigate("ProspectDataSheetScreen",{cardData:item})}
          />
        }

      </ScrollView>
    </SafeAreaView>
  )
}
