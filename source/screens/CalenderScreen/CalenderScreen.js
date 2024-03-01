import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, useWindowDimensions, Animated, StatusBar, Pressable, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './CalenderStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { TabView, SceneMap } from 'react-native-tab-view';
import TestDriveScreen from './TestDriveScreen';
import CallCustScreen from './CallCustScreen';
import VisitCustScreen from './VisitCustScreen';
import moment from 'moment';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';

const data = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
  { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);


export default function CalenderScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
  const layout = useWindowDimensions();
  const [active, setActive] = useState(0)
  const [loader, setLoader] = useState(false)
  const [selectDate, setSelectDate] = useState(moment(new Date).format("DD-MMM-YYYY"))
  const [chooseDate,setchooseDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
  const tabWidth = constant.resW(38);
  const [monthChange, setMonthChange] = useState(moment(new Date).format("MMMM - YYYY"))
  const [listData, setListData] = useState([])
  const [listHeaderData, setListHeaderData] = useState([])
  const [selectDataHeader,setSelectDataHeader] = useState({})
  const [animatedValue] = useState(new Animated.Value(2));

  const interpolateX = animatedValue.interpolate({
    inputRange: [0, 1, 2], // Adjust based on the number of tabs
    outputRange: [0, constant.resW(3), tabWidth],
  });

  useEffect(() => {
    getActiveList()
  }, [])

  const getActiveList = () => {
    dispatch(emptyLoader_Action(true))
    setLoader(true)
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "calledBy": "FUP_TYPE",
      "loginUserCompanyId": userData?.userCompanyId,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
    }
    tokenApiCall(getActiveListCallBack, APIName.GetActionMaster, "POST", param)
  }

  const getActiveListCallBack = (res) => {
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
      setListHeaderData(res.result[0]?.actionMasterList)
      res.result[0]?.actionMasterList.length > 0 ? fn_listHeader(res.result[0]?.actionMasterList[0],1) : null
    } else {
      constant.showMsg(res.message)
    }
  }


  const fn_TabClick = (type, item) => {
    setActive(type)
    setSelectDataHeader(item)
    fn_listHeader(item,2)
  }

  const fn_listHeader = (item,type) => {
  type===1 ? null :  dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "calledBy": "ACTION_CODE",
      "prospectNo": 0,
      "type": "",
      "code": item.code,
      "status": "A",
      "loginUserCompanyId": userData?.userCompanyId,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
      "actionDate": selectDate
    }
    tokenApiCall(fn_listHeaderCallBack, APIName.GetActionsList, "POST", param)
  }

  const fn_listHeaderCallBack = (res) => {
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
      setListData(res.result?.actionInfoList)
      setLoader(false)
    } else {
      constant.showMsg(res.message)
    }
  }

  const fn_Cal_dateSelect = (date, state, marking) => {
    setchooseDate(moment(date.dateString).format("YYYY-MM-DD"))
    setSelectDate(moment(date.dateString).format("DD-MMM-YYYY"))
    fn_listHeader(selectDataHeader,2)
  }

  const dayRender = (date, state, marking) => {
    console.log("aa",state)
    return (
      moment(date.dateString).isSame(chooseDate) ?
        <ImageBackground source={images.dateIcon} style={styles.calenderDateImage} >
          <TouchableOpacity
            onPress={() => { console.log('selected day', date) }}
            style={styles.cal_DayButton}>
            <Text style={[styles.cal_DayText, { color: '#fff' }]} >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>

        </ImageBackground>
        :
        <ImageBackground source={images.dateIcon} tintColor={constant.whiteColor} style={styles.calenderDateImage} >
          <TouchableOpacity
            onPress={() => {  moment(date.dateString).isBefore(moment(new Date()).format("YYYY-MM-DD")) ? null :fn_Cal_dateSelect(date, state, marking) }}
            style={styles.cal_DayButton}>
            <Text style={[styles.cal_DayText, { color:  moment(date.dateString).isBefore(moment(new Date()).format("YYYY-MM-DD")) ? moment(date.dateString).day() === 0 ? '#FE0F1750' : '#00000040' : moment(date.dateString).day() === 0 ? 'red' : 'black' }]} >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>
        </ImageBackground>
    )
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
      <CommonHeader title='Calender' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />
      <Calendar
        // initialDate={new Date()}
        minDate={new Date()}
        maxDate={'2012-05-30'}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        monthFormat={'MMMM - yyyy'}
        onMonthChange={month => {
          // setMonthChange(moment(month.dateString).format("MMMM - YYYY"))
          console.log('month changed', month);
        }}
        renderArrow={direction =>
          <FastImage source={direction === 'left' ? images.leftarrow : images.rightArrow} resizeMode='contain' tintColor={'#FE0F17'} style={styles.cal_Arrow} />
        }
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={0}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}

        headerStyle={{
          borderRadius: 10,
        }}


        style={{
          borderWidth: 1,
          borderColor: '#FFFFFF',
          elevation: 1,
          borderRadius: 10,
          marginHorizontal: constant.moderateScale(5),
          marginVertical: constant.moderateScale(5),
          paddingVertical: '0%'
        }}

        theme={{
          monthTextColor: 'red',
          textMonthFontFamily: constant.typeRegular,
          textDayHeaderFontFamily: constant.typeMedium,
          textMonthFontSize: constant.moderateScale(16),
          textDayHeaderFontSize: constant.moderateScale(12),
        }}

        dayComponent={({ date, state, marking }) => dayRender(date, state, marking)}

        markedDates={{
          '2024-02-01': { marked: true },
          '2024-02-02': { marked: true },
          '2024-02-03': { marked: true, }
        }}

      />
      <View style={styles.cal_SubView}>
       
        <View style={styles.tabMainView}>
          <View style={styles.tabSubView}>
          <FlatList
          horizontal
          data={listHeaderData}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=>common_fn.listVer_Space(constant.moderateScale(15))}
          renderItem={({item,index}) => {
            return(
              <Pressable style={index === active ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(index, item)} >
              <Text style={active === index ? styles.tabButtonText : styles.tabButtonText2}>{item?.description}</Text>
              {active === index && <View style={styles.horixontalLine} />}
            </Pressable>
            )
          }}
        />
          </View>
        </View>
        {/* {active === 1 && <TestDriveScreen />} */}
        { <VisitCustScreen listData={listData} listLoader = {loader} />}
        {/* {active === 3 && <CallCustScreen />} */}

      </View>
    </SafeAreaView>
  )
}

