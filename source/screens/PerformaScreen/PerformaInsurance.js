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
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
 
 ]

export default function PerformaInsurance(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [selectState,setSelectState] = useState(false)
  
   const fn_SaveInsurance=()=>{
    let param ={
       "brandCode": userData?.brandCode,
       "countryCode": userData?.countryCode,
       "companyId": userData?.companyId,
       "docLocation": "string",
       "docCode": "string",
       "docFY": "string",
       "docNo": 0,
       "insuranceYN": "string",
       "insuLocation": "string",
       "insuCompanyCode": "string",
       "insuBasicPreAmount": 0,
       "insuGSTAmount": 0,
       "loginUserId": userData?.userId,
       "ipAddress": "1::1",
   }    
   tokenApiCall(SaveInsuranceCallBack, APIName.SaveProformaInsurance, "POST", param)
  }

  const SaveInsuranceCallBack = (res) => {
    console.log("savePackage", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }
 
  
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
 <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>

         <View style={[styles.selectMainView]}>
              <Text style={styles.detailText}>Select</Text>
             <FastImage source={selectState ? images.checkIcon : images.unCheckIcon} style={styles.selectCheckIcon} />
            </View>
         <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Source</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Type</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Location</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Company</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Calc On</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>IDV%</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Rate</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>NIL Dep.</Text>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <FastImage source={images.unCheckIcon} style={[styles.checkboxStyle,{marginRight:constant.moderateScale(10)}]} />
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
              </View>
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Discount on Dep.</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.selectMainView]}>
              <Text style={styles.detailText}>Select</Text>
              <Text style={styles.detailText}>-</Text>
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>NCB</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Discount Rule</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Rate</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

             <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10)}}>
           <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>THIRD PARTY</Text>
            </View> 
            <View style={[styles. bottomMainView,{}]}>
            <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>OWNER/DRIVER</Text>
            </View> 
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>PAID DRIVER</Text>
            </View> 
            <View style={[styles. bottomMainView,{}]}>
            <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>1-PASSANGER</Text>
            </View> 
            </View>
            </View>

            <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Value</Text>
              <Text style={styles.text6}>907,444</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>IDV Value</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Premium Amt</Text>
              <Text style={styles.text6}>0 <Text style={styles.text7}>(Before NCP)</Text></Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Dep. Amt</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Discount on Dep Amt</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Premium Amt</Text>
              <Text style={styles.text6}>0 <Text style={styles.text7}>(Before NCB)</Text></Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Premium Amt</Text>
              <Text style={styles.text6}>0 <Text style={styles.text7}>(After NCB)</Text></Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Net Premium Amt</Text>
              <Text style={styles.text6}>0 <Text style={styles.text7}>(After Discount)</Text></Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Loading Amt</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Gross Premium Amt</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>GST</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Total Premium Payable</Text>
              <Text style={styles.text6}>0</Text>
            </View> 
            </View>

            </View>

            {/* <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text2}>0</Text>
            </View> */}

            {/* <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10)}}>
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(0)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text3}>0</Text>
            </View> 
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text3}>0</Text>
            </View> 
            </View> */}
                    
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
        borderBottomRightRadius:10
       },
    performaButton:{
        marginBottom:constant.moderateScale(30),
        marginTop:constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(70),
        paddingVertical:constant.moderateScale(10),
        borderWidth:1,
        borderColor:constant.whiteColor,
       },
       detailMainView:{
        paddingHorizontal:constant.moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5)
        },
        detailText:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            width:constant.moderateScale(150),
            fontFamily:constant.typeLight
        },
      
        dropList:{
          borderWidth:1,
          height:constant.moderateScale(40),
          flex:1,
          borderRadius:10,
          borderColor:'#ABABAB',
          backgroundColor:constant.whiteColor,
        },
        dropListText:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
        },
        selectMainView:{
            paddingHorizontal:constant.moderateScale(10),
            flexDirection:'row',
            alignItems:'center',
            // justifyContent:'space-between',
            marginTop:constant.moderateScale(8)
        },
        selectCheckIcon:{
            height:constant.moderateScale(25),
            width:constant.moderateScale(25)
        },
        middleMainView:{
            paddingHorizontal:constant.moderateScale(10),
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:constant.moderateScale(8)
        },
        text2:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
            marginRight:constant.moderateScale(15)
        },
        text3:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
            marginRight:constant.moderateScale(11)
        },
        bottomMainView:{
            paddingHorizontal:constant.moderateScale(8),
            flexDirection:'row',
            alignItems:'center',
            flex:1,
            paddingVertical:constant.moderateScale(5)
            },
            checkboxStyle:{
                height:constant.moderateScale(25),
                width:constant.moderateScale(25)
            },
            text4:{
                fontSize:constant.moderateScale(14),
                color:constant.textColor,
                fontFamily:constant.typeMedium,
                marginLeft:constant.moderateScale(11)
            },
            text5:{
                fontSize:constant.moderateScale(13),
                color:'#00000042',
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(11)
            },
            text6:{
                fontSize:constant.moderateScale(14),
                color:'#000',
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(11),
                marginTop:constant.moderateScale(2)
            },
            bottomMainView2:{
                // paddingHorizontal:constant.moderateScale(8),
                // flexDirection:'row',
                // alignItems:'center',
                flex:1,
                paddingVertical:constant.moderateScale(5)
                },
                text7:{
                    fontSize:constant.moderateScale(14),
                    color:'#000',
                    fontFamily:constant.typeLight,
                    marginLeft:constant.moderateScale(11)  
                }

 })