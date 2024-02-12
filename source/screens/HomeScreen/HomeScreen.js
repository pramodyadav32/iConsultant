import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
// import * as apiConfig from '../../utilities/apiCaller'
import * as constant from '../../utilities/constants'
import styles from './HomeScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import DrawerHeader from '../../components/DrawerHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, apiFormDataCall, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-banner-carousel';
import PopularProfile from './PopularProfile';

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
   getBanner()
   getCategory()
   getProfiles()
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
 
 const categoryRenderItem=({item,index})=>{
 return(
  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.linearStyle} colors={item?.color}>
    <Pressable onPress={()=>props.navigation.navigate("CategoryScreen",{"data":item})}>
     <FastImage source={{uri:imageUrl+item?.image}} resizeMode='contain' style={styles.categoryImage} />
     <Text style={styles.categoryText} >{item?.name}</Text>
    </Pressable>
  </LinearGradient>
 )
 }

function renderPage(item, index) {
  return (
      <View key={index} style={{width:constant.resW(100)}}>
          <Image style={{ width: constant.resW(90), height: constant.resW(50),alignSelf:'center',borderRadius:10 }} source={{ uri: imageUrl+item?.image }} />
      </View>
  );
}

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent={false} />
     <DrawerHeader title='' showDrawer={navigation} mainExt={styles.drawerStyle} />
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={{ backgroundColor: constant.whiteColor,flex:1}}>
        <View style={{flex:1}}>
      <Text style={styles.text1} onPress={()=>navigation.navigate("CategoryScreen")} >Explore</Text>
      <Text style={styles.text2}>Hire Best furniture Designers for your house! </Text>
      <View style={styles.searchMainView}>
      <TextInput
       placeholder='Search furniture...'
       placeholderTextColor={'#A5A7AC'}
       style={styles.inputStyle}
       selectionColor={constant.blackColor}
      ></TextInput>
      <View style={styles.searchImageView}>
        <FastImage source={images.edit} resizeMode='contain' style={styles.searchImage} />
      </View>
     </View>
     <View style={{height:constant.resW(50)}}>
         { bannerLoader ?
         <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
          <ActivityIndicator color={constant.baseColor} size={'small'} />
          </View>
        :
               <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={constant.resW(100)} 
                    pageIndicatorStyle={{backgroundColor:'#00000052'}} 
                    activePageIndicatorStyle={{backgroundColor:constant.baseColor}} 
                >
                {bannerData.map((item, index) => renderPage(item, index))}
                </Carousel>
}
     </View> 
       {
        loader ?
        <View style={{alignItems:'center',justifyContent:'center',height:constant.resW(70)}}>
        <ActivityIndicator color={constant.baseColor} size={'large'} />
        </View>
        :         
      <View>        
     <View style={styles.categoryMainView}>
     <View style={[styles.profileMainViewTitle,{marginTop:'1%'}]}>
     <Text style={styles.text6}>Popular Categories</Text>
     <Text style={styles.text7}>View All</Text>
     </View>
      <FlatList 
       data={categoryData}
       contentContainerStyle={styles.listContainerStyle}
       columnWrapperStyle={{justifyContent:'space-between'}}
       numColumns={2}
       renderItem={categoryRenderItem}
       ListHeaderComponent={()=>common_fn.listSpace(constant.resW(2))}
       ItemSeparatorComponent={()=>common_fn.listSpace(constant.resW(3.5))}
       ListFooterComponent={()=>common_fn.listSpace(constant.resW(3))}
      />
     </View>
     <Text style={styles.text3}>For Own Design</Text>
     <Pressable style={styles.custumButtinMainView} onPress={()=>navigation.navigate('SuggestionScreen')} >
      <FastImage source={images.customButton} style={styles.custumImage} />
     <View style={styles.custumButtinSubView}>
     <Text style={styles.text4}>For Custom Design</Text>
     <Text style={styles.text5}>Our Professionals will meet you{'\n'}Requierments.</Text>
     </View>
     </Pressable>
     <View style={styles.profileMainViewTitle}>
     <Text style={styles.text6}>Popular Profile</Text>
     <Text style={styles.text7}>View All</Text>
     </View>
     </View>  
} 
<PopularProfile data={profileData} />
     </View>
       </ScrollView>
    
  
     </SafeAreaView>
  )
}
