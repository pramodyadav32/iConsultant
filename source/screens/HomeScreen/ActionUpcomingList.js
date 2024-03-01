import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action,emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import styles from './HomeScreenStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import { set_UserData } from '../../utilities/AsyncStorage';
import * as common_fn from '../../utilities/common_fn'


export default function ActionUpcomingList(props) {
    const {data, filterData,cardClick} =  props
    const dispatch = useDispatch()
    const [activeIndex,setActiveIndex] = useState(-1)

    const renderItem=({item,index})=>{
        return(
            <View>
                <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>setActiveIndex(index)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>{item}</Text>
                 <FastImage source={ activeIndex === index ? images.downArrow : images.rightArrow} style={ activeIndex === index ? styles.upRightArrow : styles.upRightArrow2} />
                 </Pressable>
                 </ImageBackground>
                 {activeIndex=== index &&
                   filterData[item].map((item,index)=>{
                    return(
                     <ImageBackground source={images.listCard} resizeMode='stretch' imageStyle={{borderRadius:10}} style={styles.listBgStyle}>
                     <Pressable style={styles.driveListMainView} onPress={()=> cardClick(item,index)} >
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
                      <Text style={styles.listText3}>{item.prospectId}</Text>
                   </View>
                   <View style={styles.driveListDetailSubView2}>
                      <Text style={styles.listText2}>Next Action</Text>
                      <Text style={styles.listText3}>{item?.action}</Text>
                   </View>
                  </View>
                  <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
                   <View style={styles.driveListDetailSubView}>
                      <Text style={styles.listText2}>Mobile No</Text>
                      <Text style={styles.listText3}>{item?.custMobile}</Text>
                   </View>
                   <View style={styles.driveListDetailSubView}>
                      <Text style={styles.listText2}>Day Since</Text>
                      <Text style={styles.listText3}>{item?.prospectAge}</Text>
                   </View>
                  </View>
                  <View style={[styles.driveListDetailView,{marginTop:constant.moderateScale(8)}]}>
                  <View style={styles.driveListDetailSubView}>
                      <Text style={styles.listText2}>Rating</Text>
                      <Text style={styles.listText3}>{item?.prospectRating}</Text>
                   </View>
                   <View style={styles.driveListDetailSubView}>
                      <Text style={styles.listText2}>Closure</Text>
                      <Text style={styles.listText3}>{item?.projectedCloserDate}</Text>
                   </View>
                  </View>
                      </View>
                      </View>
                  </Pressable>  
                   </ImageBackground>
                    )
                   })
                
                 }
                 </View>         
        )
      }
    
  
    return (
        <View style={{flex:1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(5))}
      ItemSeparatorComponent={()=>common_fn.listSpace(constant.moderateScale(0))}
      ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(10))}
            />         
         </View>
    );
}
