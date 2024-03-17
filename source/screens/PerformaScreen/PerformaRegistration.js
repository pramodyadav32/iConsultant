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
import moment from 'moment';

const data2 = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
 
 ]

export default function PerformaRegistration(props) {
   const { navigation, regData,performaGeneralMasterData,performaBasicInfo,performaPriceDetail } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [selectState,setSelectState] = useState(false)
   const [registrationTypeList, setRegistrationTypeList] = useState([])
   const [selectMasterList, setSelectMasterList] = useState([])
   const [priceDetails, setPriceDetails] = useState({})
   const [locationData,setLoactionData] = useState([])
   const [locationValue,setLoactionValue] = useState({})
   const [sourceData,setSourceData] = useState([])
   const [sourceValue,setSourceValue] = useState({})
   const [codeData,setcodeData] = useState([])
   const [codeValue,setcodeValue] = useState([])
   const [billingLocationData,setBillingLocationData] = useState([])
   const [billingLocationValue,setBillingLocationValue] = useState([])
   const [custumerReg,setCustumerReg] = useState(false)
   const [performaListData,setPerformListData] = useState([])

  
 useEffect(()=>{
  // setRegistrationTypeList(regData?.registrationTypeList)
  setSelectMasterList(regData?.selectMasterList)
  setPriceDetails(regData?.priceDetails)
  setPerformListData(performaBasicInfo?.proformaList)

  let newData = []
  regData?.registrationTypeList.map((item)=>{
    let total = (performaPriceDetail?.vehBasicAmount * Number(item?.dataCalculation?.perVal))/100
    item["total"] = parseInt(total)
    item["subTotal"] = parseInt(total)
    item["addAmount"] = ''
    newData.push(item)
  })
  setRegistrationTypeList([...newData])

  let location=[]
  let source = []
  regData?.selectMasterList.map((item)=>{
    if(item?.group === 'REGN_LOCATION')
    {
      location.push(item)
    }else if(item?.group === 'SOURCE')
    {
      source.push(item)
    }
  
  })
  setSourceData(source)
  setLoactionData(location)

  performaGeneralMasterData?.selectMasterList.map((item)=>{
   if(item?.listType ==='BILLING_LOCATION'){
    setBillingLocationData(item.basicList)
   }
  })


 },[regData])


 const reg_Save=()=>{
   let newList = []
   registrationTypeList.map((item,index)=>{
     let newObj ={
      "regnVersionSr": index,
     "costHeadCode": item?.code,
     "basicAmount": performaPriceDetail?.vehBasicAmount,
     "additionalAmount": item?.addAmount==='' ? 0 : parseInt(item?.addAmount),
     "totalAmount": parseInt(item.total)
     }
     newList.push(newObj)
   })
  

   let param = {
    brandCode: userData?.brandCode,
    countryCode: userData?.countryCode,
    companyId: userData?.companyId,
    "docLocation": performaBasicInfo?.proformaList[0]?.docLocation,
    "docCode": performaBasicInfo?.proformaList[0]?.docCode,
    "docFY": performaBasicInfo?.proformaList[0]?.docFy,
    "docNo": performaBasicInfo?.proformaList[0]?.docNo,
     "regnVersionNo": 0,
     "regnNotReq": "string",
     "regnSource": sourceValue?.code,
     "regnType": "string",
     "regnLocation": locationValue.code,
     "regnRtoCode": "string",
     "rtoCalcType": "string",
     "rtoCalcOn": "string",
     "rtoCalcMethod": "string",
     "loginUserId":userData?.userId,
     "ipAddress": "1::1",
     "proformaRtoList": newList
    }
    tokenApiCall(reg_SaveCallBack, APIName.SaveProformaRegistration, "POST", param);

 }


 const reg_SaveCallBack = (res) => {
  console.log("registration", JSON.stringify(res));
  if (res.statusCode === 200) {
    
  } else {
     constant.showMsg(res.message);
  }
}
  
 const fn_selectReg=(item,index)=>{
  let newArr = registrationTypeList
    if(item.select){
      item.select = false
      newArr.splice(index,1,item)
      setRegistrationTypeList([...newArr])
    }else{
      item["select"] = true
      newArr.splice(index,1,item)
      setRegistrationTypeList([...newArr])
    }
 }

 const fn_AddAmount=(d,selectInx)=>{
   let newArray = []
   registrationTypeList.map((item,index)=>{
    if(index=== selectInx){
      item.total = Number(item?.subTotal)+Number(d)
      newArray.push(item)
    }else{
      newArray.push(item)
    }
   
   })
   setRegistrationTypeList([...newArray])
 }

   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
 <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>

         <View style={{flex:1,backgroundColor:'#F9F9F9',borderWidth:1,borderColor:constant.whiteColor,borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Distict</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Chatges Applicable On</Text>
              <Text style={styles.text6}>{moment(new Date).format("DD-MMM-YYYY")}</Text>
            </View> 
            </View>

            {/* <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>SubZone</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Chatges Applicable On</Text>
              <Text style={styles.text6}>Current Date</Text>
            </View> 
            </View> */}

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Regn Location</Text>
              <SelectDropList
                list={locationData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setLoactionValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Regn Code</Text>
              <SelectDropList
                list={[]}
                disable={true}
                title={locationValue.code==='' ? ' ' : locationValue?.code }
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <FlatList 
             data={performaListData}
             renderItem={({item,index})=>{
              return(
              index===0 &&  <View style={{flex:1,flexDirection:'row'}}>
                <View style={[styles. bottomMainView2,{}]}>
                <Text style={styles.text5}>Style</Text>
                  <Text style={styles.text6}>{item?.vehExteriorColor}</Text>
                </View> 
                <View style={[styles. bottomMainView2,{}]}>
                <Text style={styles.text5}>MV/VY</Text>
                  <Text style={styles.text6}>{item?.docFy}</Text>
                </View> 
                </View>
              
              )
             }}
            
            />

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Source</Text>
              <SelectDropList
                list={sourceData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setSourceValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Billing Location</Text>
              <SelectDropList
                list={billingLocationData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setBillingLocationValue(d)}
              />
            </View>

            </View>
            <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
          
          <View style={[styles.callHeaderMainView,{paddingHorizontal:constant.moderateScale(3)}]}>
           <View style={styles.callHeaderSubView}>
            <Text style={styles.text8}>Version</Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>Price</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <Text style={styles.text8}>Add on Amnt</Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>Total</Text>
           </View>
          </View >

          <View style={{flex:1,flexDirection:'row'}}>
            <Pressable style={[styles. bottomMainView,{}]} onPress={()=>setCustumerReg(!custumerReg)}>
                <FastImage source={custumerReg ? images?.checkIcon : images.unCheckIcon} resizeMode='contain' style={styles.checkboxStyle} />
              <Text style={styles.text4}>Registration to be done by Customer</Text>
            </Pressable> 
            
            </View>

           <FlatList 
            data={registrationTypeList}
            renderItem={({item,index})=>{
            return(
              <View>
                 <View style={{flex:1,flexDirection:'row'}}>
            <Pressable style={[styles. bottomMainView,{}]} onPress={()=>fn_selectReg(item,index)}>
                <FastImage source={ item?.select ? images?.checkIcon :images.unCheckIcon} resizeMode='contain' style={styles.checkboxStyle} />
              <Text style={styles.text4}>{item?.description}</Text>
            </Pressable> 
            
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                title={item?.dataCalculation?.perVal+"%"}
                disable={true}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>{item?.subTotal}</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput onChangeText={(d)=>fn_AddAmount(d,index)} editable={item?.select ? true : false} style={styles.dropList3} >{item?.addAmount}</TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>{item?.total}</Text>
           </View>
          </View >
                </View>
            )
            }}
            
           />
         

           </View>
      

            
                    
         </View>
         <Button title='Next' click_Action={() => reg_Save()} buttonExt={styles.performaButton} />
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
                height:constant.moderateScale(20),
                width:constant.moderateScale(20)
            },
            text4:{
                fontSize:constant.moderateScale(14),
                color:constant.textColor,
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(8)
            },
            text5:{
                fontSize:constant.moderateScale(12),
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
                },
                text8:{
                    fontSize:constant.moderateScale(14),
                    color:'#000',
                    fontFamily:constant.typeRegular,
                    marginLeft:constant.moderateScale(10)  
                },
                callHeaderMainView:{
                flexDirection:'row',
                paddingBottom:constant.moderateScale(10),
                paddingHorizontal:constant.moderateScale(10)


                },
                callHeaderMainView2:{
                    flexDirection:'row',
                    // paddingBottom:constant.moderateScale(10),
                    paddingHorizontal:constant.moderateScale(3),
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
    
                    },
                callHeaderSubView:{
                flex:0.7,
                justifyContent:'center',
                },
                callHeaderSubView2:{
                    flex:0.5,
                    alignItems:'flex-end',
                        justifyContent:'center',
                    paddingRight:constant.moderateScale(10)
                    },
                    callHeaderSubView3:{
                        flex:0.7,
                        alignItems:'center',
                        justifyContent:'center',
                        },
                        dropList2:{
                            borderWidth:1,
                            height:constant.moderateScale(40),
                            width:'80%',
                            borderRadius:10,
                            borderColor:'#ABABAB',
                            backgroundColor:constant.whiteColor,
                          },
                          dropListText2:{
                              fontSize:constant.moderateScale(15),
                              color:constant.textColor,
                              fontFamily:constant.typeLight,
                          },
                          dropList3:{
                            borderWidth:1,
                            height:constant.moderateScale(40),
                            width:'80%',
                            borderRadius:10,
                            borderColor:'#ABABAB',
                            backgroundColor:constant.whiteColor,
                            fontSize:constant.moderateScale(15),
                            color:constant.textColor,
                            fontFamily:constant.typeLight,
                            textAlign:'right',
                            paddingHorizontal:constant.moderateScale(5)
                          },
                         

 })