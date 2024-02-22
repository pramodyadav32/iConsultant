import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image,ImageBackground, StatusBar, Animated } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './CreatePerformaStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'

const data =[
  {'key':1,"title":'Your Profile','source':images.profile,'screenName':'HomeScreen'},

]

export default function CreatePerforma(props) {
  const { navigation } = props
  const dispatch = useDispatch()
  const tabWidth = constant.resW(49); 
  const [active,setActive] = useState(1)
  const [animatedValue] = useState(new Animated.Value(1));
 
    const interpolateX = animatedValue.interpolate({
        inputRange: [0, 1, 2,3,4], // Adjust based on the number of tabs
        outputRange: [0,constant.resW(3),constant.resW(26),tabWidth,constant.resW(79)],
    });

  const renderItem=()=>{
    return(
             <ImageBackground source={images.listCard} resizeMode='cover' imageStyle={{borderRadius:10}} style={styles.listBgStyle}>
           <Pressable style={styles.driveListMainView} >
            <Pressable style={styles.driveListTopView1}>
               <Text style={styles.text2}>OLM</Text>
               <AntDesign name='close' style={styles.closeIcon} />
            </Pressable>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1,}}>
                <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage} />
               <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={[{flexDirection:'row',justifyContent:'center',flex:1,paddingRight:constant.moderateScale(18)}]}>
                <Text style={styles.listName3}>PID : </Text>
                <Text style={[styles.listName3]}>12443</Text>            
             </View>
             <View style={styles.cardHorLine} />
             </View>
                </View>
                <View style={{flex:1.8}}>
                <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(2)}]}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Prospect Name</Text>
                <Text numberOfLines={2} style={[styles.listName3,{width:'90%'}]}>Mr.Amarjeet Singh</Text>
             </View>
             <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Model</Text>
                <Text style={styles.listName3}>D-MAX</Text>
             </View>
            </View>
            <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Mobile No</Text>
                <Text style={styles.listName3}>1234567898</Text>
             </View>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Closure Date</Text>
                <Text style={styles.listName3}>22-Jan-2024</Text>
             </View>
            </View>
            <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
            <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Rating</Text>
                <Text style={styles.listName3}>HOT</Text>
             </View>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Color</Text>
                <Text style={styles.listName3}>Brilliant Silver</Text>
             </View>
            </View>
                </View>
                </View>
            </Pressable>  
             </ImageBackground>  
    )
  }

  const fn_TabClick=(type)=>{
   setActive(type)
   Animated.timing(animatedValue, {
     toValue: type,
     duration: 800, // Adjust the duration of the animation
     useNativeDriver: false,
   }).start();
 }

 const actionRenderItem=({item,index})=>{
   return(
      <View style={{backgroundColor:'#F9F9F9',borderWidth:1,borderRadius:10,borderColor:constant.whiteColor,marginHorizontal:constant.moderateScale(5),paddingBottom:constant.moderateScale(10),elevation:1}}>
      <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(10)}]}>
        <View style={[styles.driveListDetailSubView,{}]}>
           <Text style={styles.listText2}>Action</Text>
           <Text style={styles.listText3}>Test Drive</Text>
        </View>
        <View style={styles.driveListDetailSubView2}>
           <Text style={styles.listText2}>Due on </Text>
           <Text style={styles.listText3}>14-Feb-2024</Text>
        </View>
       </View>

       <View style={styles.driveListDetailView}>
        <View style={styles.driveListDetailSubView}>
           <Text style={styles.listText2}>Stutus</Text>
           <Text style={styles.listText3}>Active</Text>
        </View>
        <View style={styles.driveListDetailSubView2}>
           <Text style={styles.listText2}>Completed on</Text>
           <Text style={styles.listText3}>-</Text>
        </View>
       </View>

       <View style={styles.driveListDetailView}>
        <View style={styles.driveListDetailSubView}>
           <Text style={styles.listText2}>Remarks</Text>
           <Text style={styles.listText3}>-</Text>
        </View>
        <View style={styles.driveListDetailSubView2}>
           <Text style={styles.listText2}>Projected Closure Data</Text>
           <Text style={styles.listText3}>Standard</Text>
        </View>
       </View>

    

</View>
   )
 }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#E1E1E1'}}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
     <CommonHeader title='Performa' mainExt={styles.drawerStyle} showInfo={false} onBack={()=>navigation.goBack()} />
   <View>
     <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(5))}
      ItemSeparatorComponent={()=>common_fn.listSpace(constant.moderateScale(7))}
      ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(10))}
            />
            </View>

<View style={styles.cal_SubView}>
<View style={styles.tabMainView}>
        <View style={styles.tabSubView}>
        <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={()=>fn_TabClick(1)} >
            <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Basic Info</Text>
            <View style={styles.horixontalLine} />
        </Pressable>
      
        </View>
        </View>

  <View style={{flex:1,paddingHorizontal:'1%'}}>
    <ScrollView>
        <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(0),alignItems:'center'}]}>
             <View style={[styles.driveListDetailSubView,{flex:0.8}]}>
                <Text style={styles.listText4}>Souce</Text>
             </View>
             <View style={[styles.driveListDetailSubView2,{}]}>
             <SelectDropList 
             list={[]}       
             buttonExt={styles.dropNameList}
             textExt={styles.dropNameListText}
           />
             </View>
            </View>

            <View style={[styles.driveListDetailView,{}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.listText2}>Perfoma Inv. No</Text>
                <Text style={styles.listText3}>New</Text>
             </View>
             <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Dated</Text>
                <Text style={styles.listText3}>-</Text>
             </View>
            </View>

            <View style={styles.driveListDetailView}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Model</Text>
                <Text style={styles.listText3}>SCAB</Text>
             </View>
             <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Variant</Text>
                <Text style={styles.listText3}>DMAX FLATDESK</Text>
             </View>
            </View>

            <View style={styles.driveListDetailView}>
             <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Style</Text>
                <Text style={styles.listText3}>STANDAED</Text>
             </View>
             <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>MY/VY</Text>
                <Text style={styles.listText3}>2024/2024</Text>
             </View>
            </View>
           
           <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(50)}}>
            <View style={[styles.driveListDetailView2,{}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.listText2}>HEAD</Text>
             </View>
             <View style={styles.driveListDetailSubView3}>
                <Text style={styles.listText2}>CGST</Text>
             </View>
             <View style={styles.driveListDetailSubView3}>
                <Text style={styles.listText2}>SGST</Text>
             </View>
             <View style={styles.driveListDetailSubView3}>
                <Text style={styles.listText2}>Total</Text>
             </View>
            </View>

            <View style={[styles.driveListDetailView2,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView2,{}]}>
                <Text style={styles.listText2}>Tex%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>14.00%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>14.00%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}></Text>
             </View>
             </View>

             <View style={[styles.driveListDetailView2,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView2,{}]}>
                <Text style={styles.listText2}>Tax Amount</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             </View>
             <View style={[styles.driveListDetailView2,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView2,{}]}>
                <Text style={styles.listText2}>Surcharge%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0.00%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0.00%</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}></Text>
             </View>
             </View>

             <View style={[styles.driveListDetailView2,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView2,{}]}>
                <Text style={styles.listText2}>Surcharge Amt</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             </View>

             <View style={[styles.driveListDetailView2,{backgroundColor:'#F0F0F0',borderBottomRightRadius:10,borderBottomLeftRadius:0,paddingVertical:constant.moderateScale(7),paddingHorizontal:10,marginHorizontal:0}]}>
             <View style={[styles.driveListDetailSubView2,{}]}>
                <Text style={styles.listText2}>Total</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             <View style={[styles.driveListDetailSubView3,{}]}>
             <Text style={styles.listText3}>0</Text>
             </View>
             </View>
             
             </View>
             </ScrollView>
  </View>
   
    

         
</View>
<Button title='Save' buttonExt={styles.performaButton} />  

     </SafeAreaView>
  )
}
