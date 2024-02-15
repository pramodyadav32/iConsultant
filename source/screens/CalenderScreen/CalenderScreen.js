import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, useWindowDimensions,Animated, StatusBar, Pressable, Text } from 'react-native';
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
 
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Calender' mainExt={styles.drawerStyle} />
     <Calendar
  // Initially visible month. Default = now
  initialDate={'2024-02-01'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={day => {
    console.log('selected day', day);
  }}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={month => {
    console.log('month changed', month);
  }}
  // Hide month navigation arrows. Default = false
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={direction =>
    <FastImage source={ direction==='left' ? images.leftarrow : images.rightArrow} resizeMode='contain' tintColor={'#FE0F17'} style={styles.cal_Arrow} />

    }
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={false}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  firstDay={0}
  // Hide day names. Default = false
//   hideDayNames={true}
  // Show week numbers to the left. Default = false
//   showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
//   disableArrowLeft={true}
  // Disable right arrow. Default = false
//   disableArrowRight={true}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
//   disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter
  renderHeader={date => {
 
    /*Return JSX*/
  }}
  // Enable the option to swipe between months. Default = false
//   enableSwipeMonths={true}

headerStyle={{
    // backgroundColor:'red',
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
    backgroundColor: '#F9F9F9',
    calendarBackground: '#F9F9F9',
    // textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: 'red',
    selectedDayTextColor: '#ffffff',
    todayTextColor: 'blue',
    dayTextColor: 'red',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    disabledArrowColor: '#d9e1e8',
    textDayFontFamily: constant.typeMedium,
    textMonthFontFamily: constant.typeMedium,
    textDayHeaderFontFamily:constant.typeMedium,
    textDayFontSize: constant.moderateScale(13),
    textMonthFontSize: constant.moderateScale(13),
    textDayHeaderFontSize: constant.moderateScale(12),

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

