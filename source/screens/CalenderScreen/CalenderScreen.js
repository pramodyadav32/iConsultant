import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, useWindowDimensions,Animated, StatusBar, Pressable, Text, TouchableOpacity } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './CalenderStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { TabView, SceneMap } from 'react-native-tab-view';
import TestDriveScreen from './TestDriveScreen';
import CallCustScreen from './CallCustScreen';
import VisitCustScreen from './VisitCustScreen';
import moment from 'moment';

LocaleConfig.defaultLocale = 'custom';
LocaleConfig.locales['custom'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
  {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
  {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
  {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
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
  const layout = useWindowDimensions();
  const [active,setActive] = useState(1)
  const [count,setCount] = useState(0)
  const tabWidth = constant.resW(38); 
  const [monthChange,setMonthChange] = useState(moment(new Date).format("MMMM - YYYY"))

  const [animatedValue] = useState(new Animated.Value(2));
 
    const interpolateX = animatedValue.interpolate({
        inputRange: [0, 1, 2], // Adjust based on the number of tabs
        outputRange: [0, constant.resW(3), tabWidth],
    });

const fn_TabClick=(type)=>{
  setActive(type)
  Animated.timing(animatedValue, {
    toValue: type,
    duration: 800, // Adjust the duration of the animation
    useNativeDriver: false,
  }).start();

}
const dayRender = (date,state,marking) => {
  console.log("day",marking)
  return (
    <TouchableOpacity
      onPress={() => { console.log('selected day', date.dateString) }}
       style={styles.cal_DayButton}> 
       <Text  style={[styles.cal_DayText,{color:  moment(date.dateString).day()===0 ? 'red' : 'black'}]} > 
       {date.day} 
       </Text>
       <View />   
        </TouchableOpacity>
        )
};




 
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Calender' mainExt={styles.drawerStyle} onBack={()=>navigation.goBack()} />
     <Calendar
  initialDate={'2024-02-01'}
  minDate={'2012-05-10'}
  maxDate={'2012-05-30'}
  onDayPress={day => {
    console.log('selected day', day);
  }}
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
  monthFormat={'MMMM - yyyy'}
  onMonthChange={month => {
    setMonthChange(moment(month.dateString).format("MMMM - YYYY"))
    console.log('month changed', month);
  }}
renderArrow={direction =>
    <FastImage source={ direction==='left' ? images.leftarrow : images.rightArrow} resizeMode='contain' tintColor={'#FE0F17'} style={styles.cal_Arrow} />
    }
hideExtraDays={true}
 disableMonthChange={false}
  firstDay={0}
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
 
headerStyle={{
    borderRadius:10,
}}


style={{
    borderWidth: 1,
    borderColor: '#FFFFFF',
    elevation:1,
    borderRadius:10,
    marginHorizontal:constant.moderateScale(5),
    marginVertical:constant.moderateScale(5),
    paddingVertical:'0%'
}}

theme={{
    monthTextColor:'red',
    textMonthFontFamily: constant.typeRegular,
    textDayHeaderFontFamily:constant.typeMedium,
    textMonthFontSize: constant.moderateScale(16),
    textDayHeaderFontSize: constant.moderateScale(12),
}}

dayComponent={({date, state, marking}) => dayRender(date,state,marking)}

markedDates={{
  '2024-02-01': { marked: true},
  '2024-02-02': {marked: true},
  '2024-02-03': { marked: true,}
}}

/>
<View style={styles.cal_SubView}>
<View style={styles.tabMainView}>
        <View style={styles.tabSubView}>
        <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={()=>fn_TabClick(1)} >
            <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Test Drive</Text>
            {/* {active===1 &&<View style={styles.horixontalLine} />} */}
        </Pressable>
        <Pressable style={active === 2 ? styles.tabButton : styles.tabButton2} onPress={()=>fn_TabClick(2)} >
            <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Visit Cust</Text>
            {/* {active===2 &&<View style={styles.horixontalLine} />} */}
        </Pressable>
        <Pressable style={active === 3 ? [styles.tabButton,{width:constant.resW(35),}] : [styles.tabButton2,{width:constant.resW(35)}]} onPress={()=>fn_TabClick(3)} >
            <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Call to Cust</Text>
            {/* {active===3 &&<View style={styles.horixontalLine} />} */}
        </Pressable>
        </View>
              <Animated.View
        style={[ styles.horixontalLine,{
          transform: [{ translateX: interpolateX }],
        }]}
      >
      </Animated.View>
        </View>
      {active===1 &&  <TestDriveScreen />}
      {active===2 && <VisitCustScreen />}
      {active===3 && <CallCustScreen />}
        
</View>
     </SafeAreaView>
  )
}

