import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './UpcomingActionStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import UpcomingActionList from './UpcomingActionList';

const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
  {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
  {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
  {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
]

export default function UpcomingActionScreen(props) {
  const { navigation,route } = props
  const dispatch = useDispatch()
  const [actionList,setActionList] = useState(route.params.dataList)
  const [filterData,setFilterData] = useState({})
  const [filterList,setFilterList] = useState([])
  const [active,setActive] = useState(1)
  const [count,setCount] = useState(0)
  const [searchText,setSearchText] = useState("")

  useEffect(()=>{
  fn_GetData()
  },[])
  

  const fn_GetData=async()=>{
    const groupedData = {};

    await route.params.dataList.forEach(item => {
   const dateKey = item.actionDate;
 
   if (!groupedData[dateKey]) {
     groupedData[dateKey] = [item];
   } else {
     groupedData[dateKey].push(item);
   }
 });
  let groupdate = Object.keys(groupedData)
   setFilterData(groupedData)
   setFilterList(groupdate)
  }
 
  const fn_Search=(d)=>{
    setSearchText(d)
     if(d.length > 0 ){
     let text = d.toLowerCase()
       let filteredName = route.params.dataList.filter((item) => {
        if (item.firstName.toLowerCase().match(text) || item.action.toLowerCase().match(text) || item.custMobile.toLowerCase().match(text) || item.model.toLowerCase().match(text) ) {
          return item
        }
      })
      const groupedData = {};

     filteredName.forEach(item => {
     const dateKey = item.actionDate;
   
     if (!groupedData[dateKey]) {
       groupedData[dateKey] = [item];
     } else {
       groupedData[dateKey].push(item);
     }
   });
    let groupdate = Object.keys(groupedData)
     setFilterData(groupedData)
     setFilterList(groupdate)
     }else{
      const groupedData = {};

     route.params.dataList.forEach(item => {
     const dateKey = item.actionDate;
   
     if (!groupedData[dateKey]) {
       groupedData[dateKey] = [item];
     } else {
       groupedData[dateKey].push(item);
     }
   });
    let groupdate = Object.keys(groupedData)
     setFilterData(groupedData)
     setFilterList(groupdate)
     }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Upcoming Actions' mainExt={styles.drawerStyle} onBack={()=>navigation.goBack()} />
      <View style={styles.inputView}>
        <TextInput style={styles.input} onChangeText={(d)=>fn_Search(d)} selectionColor={'#3B3B3B'} placeholder='Search by Name, Mobile no, Model' placeholderTextColor={'#3B3B3B40'} ></TextInput>
        <FastImage source={images.search} resizeMode='contain' style={styles.searchIcon} />
      </View>
     <UpcomingActionList
       data={filterList}
       filterData={filterData}
       onClick={(item,index)=>navigation.navigate("ProspectDataSheetScreen",{cardData: item})}
     />
     </SafeAreaView>
  )
}
