import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput, StyleSheet } from 'react-native';
import * as constant from '../../utilities/constants'
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';

export default function DownloadPerforma(props) {
   const { } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [active, setActive] = useState(false)
   const [listData,setListData] = useState([])


  
 
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:constant.whiteColor,borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
     
     
       </ScrollView>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
         <Button title='Cancel Proforma' click_Action={() => null} buttonExt={styles.cancelPerformaButton} />
         <Pressable style={styles.printerPerformaButton}>
            <FastImage source={images.notify} style={styles.printerImage} />
         </Pressable>
         <Pressable style={styles.sharePerformaButton}>
            <FastImage source={images.notify} style={styles.printerImage} />
         </Pressable>
         </View>
        </View>
   )
}


 const styles=StyleSheet.create({
    cancelPerformaButton: {
        marginBottom: constant.moderateScale(20),
        marginTop: constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(10),
        paddingVertical: constant.moderateScale(10),
        borderWidth: 0.8,
        borderColor: constant.whiteColor,
        width: constant.moderateScale(150),
        elevation: 1
      },
      printerPerformaButton: {
        marginBottom: constant.moderateScale(20),
        marginTop: constant.moderateScale(10),
        paddingHorizontal: constant.moderateScale(23),
        paddingVertical: constant.moderateScale(10),
        borderWidth: 0.8,
        borderColor: constant.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B3B3B',
        marginHorizontal: constant.moderateScale(4),
        borderRadius: 10,
        elevation: 1
      },
      sharePerformaButton: {
        marginBottom: constant.moderateScale(20),
        marginTop: constant.moderateScale(10),
        paddingHorizontal: constant.moderateScale(23),
        paddingVertical: constant.moderateScale(10),
        borderWidth: 0.8,
        borderColor: constant.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#727272',
        marginLeft: constant.moderateScale(4),
        borderRadius: 10,
        elevation: 1,
        marginRight:constant.moderateScale(15)
      },
      printerImage: {
        height: constant.moderateScale(20),
        width: constant.moderateScale(20)
      },
      
 })
