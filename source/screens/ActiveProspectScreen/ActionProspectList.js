import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action,emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './ActionProspectStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import { set_UserData } from '../../utilities/AsyncStorage';
import * as common_fn from '../../utilities/common_fn'

export default function ActionProspectList(props) {
   const {data} = props
    const dispatch = useDispatch()

    const renderItem=({item,index})=>{
        return(
                 <ImageBackground source={images.listCard} resizeMode='stretch' imageStyle={{borderRadius:10}} style={styles.listBgStyle}>
                   <View style={styles.driveListMainView}>
                <View style={styles.driveListTopView}>
                    <View>
                    <Text style={styles.driveText1}>{item?.title} {item?.firstName} {item?.lastName}</Text>
                    <View style={styles.horizontalLine} />
                    </View>
                    <FastImage source={images.graph} resizeMode='contain' style={styles.listDriveIcon} />
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,}}>
                    <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage} />
                    <View style={[{flexDirection:'row',justifyContent:'space-between',flex:1,paddingRight:constant.moderateScale(18)}]}>
                    <Text style={styles.ModelText3}>{item?.model}</Text>
                    <Text style={styles.fuelText2}>{item?.fuelDesc}</Text>
                 </View>
                    </View>
                    <View style={{flex:1.7}}>
                    <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(2)}]}>
                 <View style={styles.driveListDetailSubView}>
                    <Text style={styles.listText2}>Prospect ID</Text>
                    <Text style={styles.listText3}>{item?.prospectId}</Text>
                 </View>
                 <View style={styles.driveListDetailSubView2}>
                    <Text style={styles.listText2}>Next Action</Text>
                    <Text style={styles.listText3}>{item?.action}</Text>
                 </View>
                </View>
                <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
                 <View style={styles.driveListDetailSubView}>
                    <Text style={styles.listText2}>Mobile No</Text>
                    <Text style={styles.listText3}>1234567898</Text>
                 </View>
                 <View style={styles.driveListDetailSubView}>
                    <Text style={styles.listText2}>Day Since</Text>
                    <Text style={styles.listText3}>423</Text>
                 </View>
                </View>
                <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
                <View style={styles.driveListDetailSubView}>
                    <Text style={styles.listText2}>Rating</Text>
                    <Text style={styles.listText3}>{item?.prospectRating}</Text>
                 </View>
                 <View style={styles.driveListDetailSubView}>
                    <Text style={styles.listText2}>Closure</Text>
                    <Text style={styles.listText3}>10-Feb-2024 4:00 PM</Text>
                 </View>
                </View>
                    </View>
                    </View>
                </View>  
                 </ImageBackground>         
        )
      }
    
  
    return (
        <View style={{flex:1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(5))}
      ItemSeparatorComponent={()=>common_fn.listSpace(constant.moderateScale(7))}
      ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(10))}
            />
          
         </View>
    );
}
