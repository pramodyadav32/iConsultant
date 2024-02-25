import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Animated, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar, ImageBackground } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './EmiCalculatorStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import EmiCalculatorHeader from './EmiCalculatorHeader';
import SelectDropList from '../../components/SelectDropList';
import Slider from '@react-native-community/slider';
import { CommonActions } from '@react-navigation/native';

const data = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
    { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

export default function ActiveOfferScreen(props) {
    const { navigation } = props
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const renderItem = ({item,index}) => {
        return (
           <ImageBackground source={images.listImage2} resizeMode='contain' style={styles.listImage} >
           <View style={styles.listImageMainView}>
            <FastImage style={styles.listSubImage} resizeMode='contain' source={require('../../assets/dummy/car.png')} />
            <Text style={styles.listText}>Isusz V - Cross</Text>
            </View>
           </ImageBackground>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
            <StatusBar translucent={false} />
            <EmiCalculatorHeader
             title='Emi Calculator'
              mainExt={styles.drawerStyle}
               showDrawer={navigation}
               rightClick={()=> props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'HomeScreen' }],
                }),
              )}
               />
            <View style={{ flex: 1,paddingTop:constant.moderateScale(5), backgroundColor: '#F9F9F9', margin: constant.moderateScale(5), borderRadius: 10 }}>
             <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <FlatList
                    data={data}
                    horizontal
                    renderItem={renderItem}
                   showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}
                    ItemSeparatorComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}
                    ListFooterComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}
                />
                </View>
                <View>
                <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>State</Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>City</Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

                </View>
                <View style={styles.middleMainView}>
                <View style={[styles.driveListDetailView, {}]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText4}>Ex-Showroom Price</Text>
                        <Text style={styles.list3}>Rs. 9,94,970</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText4}>Road Tax</Text>
                        <Text style={styles.list3}>Rs. 1,59,196</Text>
                     </View>
                  </View>

                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10)}]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText4}>Insurance</Text>
                        <Text style={styles.list3}>Rs. 0</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText4}>On-Road Price</Text>
                        <Text style={styles.list3}>Rs. 11,54,165</Text>
                     </View>
                  </View>
                  
                  </View>
<View>
<View style={styles.bottomMainView}>
 <View style={styles.bottomSubView}>
   <Text style={styles.text5}>Please Input Down Payment Amount :</Text>
 </View>
 <View style={styles.bottomSubView2}>
   <TextInput keyboardType='numeric' style={styles.input}></TextInput>
 </View>

</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10)}]}>
 <View >
   <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>Rs. 1,00,000</Text>
 </View>
 <View >
 <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>Rs. 1,00,000</Text>
 </View>
</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10),paddingHorizontal:0}]}>
<Slider
  style={{width:constant.resW(98), height:15}}
  minimumValue={0}
  maximumValue={100000}
  minimumTrackTintColor="#FE0F17"
  maximumTrackTintColor='#FE0F1750'
  thumbTintColor ='#FE0F17'
  onValueChange={(e)=>{
   console.log("ed",e)
  }}
/>
</View>
</View>

<View style={{marginTop:constant.moderateScale(10)}}>
<View style={styles.bottomMainView}>
 <View style={styles.bottomSubView}>
   <Text style={styles.text5}>Please Input Interest Rate :</Text>
 </View>
 <View style={styles.bottomSubView2}>
   <TextInput keyboardType='numeric' style={styles.input}></TextInput>
 </View>

</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10)}]}>
 <View >
   <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>8%</Text>
 </View>
 <View >
 <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>13%</Text>
 </View>
</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10),paddingHorizontal:0}]}>
<Slider
  style={{width:constant.resW(98), height:15}}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#FE0F17"
  maximumTrackTintColor='#FE0F1750'
  thumbTintColor ='#FE0F17'
/>
</View>
</View>

<View style={{marginTop:constant.moderateScale(10)}}>
<View style={styles.bottomMainView}>
 <View style={styles.bottomSubView}>
   <Text style={styles.text5}>Please Input Tenure (Months) :</Text>
 </View>
 <View style={styles.bottomSubView2}>
   <TextInput keyboardType='numeric' style={styles.input}></TextInput>
 </View>

</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10)}]}>
 <View >
   <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>12 Months</Text>
 </View>
 <View >
 <Text style={styles.text6}>Minimum</Text>
   <Text style={styles.text7}>84 Months</Text>
 </View>
</View>

<View style={[styles.bottomMainView,{marginTop:constant.moderateScale(10),paddingHorizontal:0}]}>
<Slider
  style={{width:constant.resW(98), height:15}}
  minimumValue={0}
  maximumValue={1}
  minimumTrackTintColor="#FE0F17"
  maximumTrackTintColor='#FE0F1750'
  thumbTintColor ='#FE0F17'
/>
</View>

</View>

<Pressable style={styles.emiButtonStyle}>
   <Text style={styles.emiButtonText}>EMI</Text>
   <Text style={styles.emiButtonText}>Rs.25,000</Text>

</Pressable>

</ScrollView>
                </View>
        </SafeAreaView>
    )
}
