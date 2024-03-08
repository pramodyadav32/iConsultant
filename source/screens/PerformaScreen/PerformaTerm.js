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

const data2 = [
    { 'key': 1, "title": 'Your Profile',  },
    { 'key': 2, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 4, "title": 'Your Profile', },
    { 'key': 5, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },

 
 ]

export default function PerformaTerm(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(false)
   const [animatedValue] = useState(new Animated.Value(1));
   const [detailModal,setDetailModal] = useState(false)
   const [packageModel,setPackageModel] = useState(false)
   const [addListModel,setAddListModel] = useState(false)

   const accessoriesList=({item,index})=>{
    return(
       <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
       <View style={[styles.driveListDetailSubView,{}]}>
       <FastImage source={active ?images.checkIcon : images.unCheckIcon} style={styles.checkbox} />
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>The above Prices are Inclusive of Excise Duty, Local Sales Tax, and are Ex-Showroom Madurai, and are effective 01.04.2014</Text>
       </View>
       
       </View>
    )
   }
 
  
 
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
      <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>
              
                 <FlatList 
                  data={data2}
                  renderItem={accessoriesList}
                  ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(10))}

                  ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(20))}
                 />
          
  
         </View>
         <Button title='Next' click_Action={() => null} buttonExt={styles.performaButton} />
       </ScrollView>
        </View>
   )
}


 const styles=StyleSheet.create({
    cal_SubView2:{
        flex:1,
        backgroundColor:constant.whiteColor,
        marginBottom:constant.moderateScale(6),
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingHorizontal:constant.moderateScale(5)
       },
    costListMainView:{
        flexDirection:"row",
        marginHorizontal:constant.moderateScale(5),
        marginTop:constant.moderateScale(10),
    
    },
    driveListDetailSubView:{
        flex:0.13,
        },

    costListText2:{
      fontSize:constant.moderateScale(13),
      color:'#424242',
      fontFamily:constant.typeMedium,
  },
  costListText3:{
      fontSize:constant.moderateScale(12),
      color:'#434343',
      fontFamily:constant.typeLight,
      includeFontPadding:false
  },
  costListSubView3:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    },
  
     
    performaButton:{
        marginBottom:constant.moderateScale(30),
        marginTop:constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(70),
        paddingVertical:constant.moderateScale(10),
        borderWidth:1,
        borderColor:constant.whiteColor,
       },
       checkbox:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25),
       },
      
 })
