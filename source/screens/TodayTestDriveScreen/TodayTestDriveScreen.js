import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './TestDriveStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import TodayTestDriveList from './TestDriveList';


export default function TodayTestDriveScreen(props) {
  const { navigation,route } = props
  const dispatch = useDispatch()
  const [listData,setListData] = useState(route.params.dataList)
  const [data,setData] = useState(route.params.dataList)
  const [active,setActive] = useState(1)
  const [count,setCount] = useState(0)
  const [searchText,setSearchText] = useState('')
 
  const fn_Search=(d)=>{
    setSearchText(d)
     if(d.length > 0 ){
     let text = d.toLowerCase()
      let newData = data
       let filteredName = newData.filter((item) => {
        if (item.firstName.toLowerCase().match(text) || item.action.toLowerCase().match(text) || item.custMobile.toLowerCase().match(text) || item.model.toLowerCase().match(text) ) {
          return item
        }
      })
      setListData([...filteredName])
     }else{
      setListData([...data])
     }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Test Drive Today' mainExt={styles.drawerStyle} onBack={()=>navigation.goBack()} />
      <View style={styles.inputView}>
        <TextInput style={styles.input} onChangeText={(d)=>fn_Search(d)} selectionColor={'#3B3B3B'} placeholder='Search by Name, Mobile no, Model' placeholderTextColor={'#3B3B3B40'} ></TextInput>
        <FastImage source={images.search} resizeMode='contain' style={styles.searchIcon} />
      </View>
     <TodayTestDriveList
      data={listData}
      onClick={(item,index)=>navigation.navigate("ProspectDataSheetScreen",{cardData: item})}

     />
     </SafeAreaView>
  )
}
