import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './HomeScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';


const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},
  {'key':2,"title":'Help Center','source':images.info,'screenName':'HomeScreen'},
  {'key':3,"title":'Privacy Policy','source':images.lock,'screenName':'HomeScreen'},
  {'key':4,"title":'Logout','source':images.logout,'screenName':'HomeScreen'},
]

export default function HomeScreen(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const [bannerData,setbannerData] = useState([])
  const [categoryData,setCategoryData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [bannerLoader,setBannerLoader] = useState(false)
  const [loader,setLoader] = useState(false)

  useEffect(()=>{
  //  getBanner()
  //  getCategory()
  //  getProfiles()
  },[])

  const getBanner=()=>{
    setBannerLoader(true)
  tokenApiCall(bannerCallBack, APIName.getBanner, "GET",'')
  }

  const bannerCallBack = (res) => {
    setBannerLoader(false)
    if (res.status === 'success') { 
      setbannerData(res.data) 
    } else {
      constant.showMsg(res.message)
    }
}

const getCategory=()=>{
  setLoader(true)
  tokenApiCall(categoryCallBack, APIName.getCategories, "GET",'')
  }

  const categoryCallBack = (res) => {
    setLoader(false)
    if (res.status === 'success') {  
      setCategoryData(res.data)
    } else {
      constant.showMsg(res.message)
    }
}

const getProfiles=()=>{
  tokenApiCall(profileCallBack, APIName.getPopularProfile, "GET",'')
}

const profileCallBack = (res) => {
  console.log('profiledata==============', res.data)
  if(res.status === 'success') {
    setProfileData(res.data?.profiles)
  }else{
    constant.showMsg(res.message)
  }
}
 




  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent={false} />
     <HomeHeader title='Home' mainExt={styles.drawerStyle} />
  
    
  
     </SafeAreaView>
  )
}
