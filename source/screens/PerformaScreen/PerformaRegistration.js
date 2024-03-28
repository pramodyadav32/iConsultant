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
   const { navigation, regData,performaGeneralMasterData,performaBasicInfo,performaPriceDetail, getTermsInfoAndMove } = props
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
   const [rtoLocation,setRtoLocation] = useState([])
   const [rtoLocationSelected,setRtoLocationSelected] = useState({})
   const [billingLocationValue,setBillingLocationValue] = useState([])
   const [custumerReg,setCustumerReg] = useState(false)
   const [performaListData,setPerformListData] = useState([])
  const [priceTotal,setPricetotal] = useState(0)
  const [addAmt_Total,setAddAmt_Total] = useState(0)
  const [calculationOnData,setCalculationOnData] = useState([])
  const [calculationOnValue,setCalculationOnValue] = useState({})

  
 useEffect(()=>{
  console.log("performaPriceDetail1111 = ", performaPriceDetail)
  console.log("performa",performaBasicInfo?.proformaList)
  // setRegistrationTypeList(regData?.registrationTypeList)
  setSelectMasterList(regData?.selectMasterList)
  setPriceDetails(regData?.priceDetails)
  setPerformListData(performaBasicInfo?.proformaList)

  let newData = []
  console.log("regData",JSON.stringify(regData))
  regData?.registrationTypeList.map((item)=>{
    let totalPre = (regData?.priceDetails?.exShowroomValueBeforeDiscount * Number(item?.dataCalculation?.perVal))/100
    let totalPost = (regData?.priceDetails?.exShowroomValueAfterDiscount * Number(item?.dataCalculation?.perVal))/100
    item["totalPre"] = parseInt(totalPre)
    item["totalPost"] = parseInt(totalPost)
    item["subTotalPre"] = parseInt(totalPre)
    item["subTotalPost"] = parseInt(totalPost)
    item["addAmount"] = ''
    newData.push(item)
  })
  setRegistrationTypeList([...newData])

  let location=[]
  let source = []
  let rtoCal = []
  regData?.selectMasterList.map((item)=>{
    if(item?.group === 'REGN_LOCATION')
    {
      location.push(item)
    }else if(item?.group === 'SOURCE')
    {
      source.push(item)
    }else if(item?.group === 'RTO_CALC_ON'){
      rtoCal.push(item)
    }
  
  })
  setSourceData(source)
  setLoactionData(location)
  setCalculationOnData(rtoCal)

  performaGeneralMasterData?.selectMasterList.map((item)=>{
   if(item?.listType ==='BILLING_LOCATION'){
    setBillingLocationData(item.basicList)
   }
  })

  performaGeneralMasterData?.selectMasterList.map((item)=>{
    if(item?.listType ==='RTO_CODE'){
      setRtoLocation(item.basicList)
    }
   })


 },[regData])


 const reg_Save=()=>{
   let newList = []
   registrationTypeList.map((item,index)=>{
    if(item.select){
     let newObj ={
      "rtoAmtCalcBasis": item?.rtoAmtCalcBasis,
      "regnVersionSr": index,
      "costHeadCode": item?.code,
      "basicAmount": performaPriceDetail?.vehBasicAmount,
      "additionalAmount": item?.addAmount==='' ? 0 : parseInt(item?.addAmount),
      "totalAmount": calculationOnData === "EX_SR_PRE_DISC" ? parseInt(item.totalPre) : parseInt(item.totalPost)
     }
     newList.push(newObj)
    }
   })
  let shouldSave = false

console.log("custumerReg =====", custumerReg)
console.log("newList?.length =====", newList?.length)
if(custumerReg){
  shouldSave = true
}else if(newList?.length > 0){
  shouldSave = true
}
console.log("custumerReg =====", custumerReg)
console.log("sourceValue =====", sourceValue)
console.log("rtoLocationSelected =====", rtoLocationSelected)
console.log("newList[0]?.rtoAmtCalcBasis =====", newList[0]?.rtoAmtCalcBasis)
console.log("calculationOnValue?.code =====", calculationOnValue?.code)
if(shouldSave){
   let param = {
    brandCode: userData?.brandCode,
    countryCode: userData?.countryCode,
    companyId: userData?.companyId,
    "docLocation": performaBasicInfo?.proformaList[0]?.docLocation,
    "docCode": performaBasicInfo?.proformaList[0]?.docCode,
    "docFY": performaBasicInfo?.proformaList[0]?.docFy,
    "docNo": performaBasicInfo?.proformaList[0]?.docNo,
     "regnVersionNo": 0,
     "regnNotReq": custumerReg ? "NONE" : "",
     "regnSource": sourceValue?.code,
     "regnType": "",
     "regnLocation": locationValue.code,
     "regnRtoCode": rtoLocationSelected?.code === undefined ? "" : rtoLocationSelected?.code,
     "rtoCalcType": "CALC",
     "rtoCalcOn": calculationOnValue?.code,
     "rtoCalcMethod": custumerReg ? "" : newList[0]?.rtoAmtCalcBasis,
     "loginUserId":userData?.userId,
     "ipAddress": "1::1",
     "proformaRtoList": custumerReg ? [] : newList
    }
    // console.log("param =====", param)
    tokenApiCall(reg_SaveCallBack, APIName.SaveProformaRegistration, "POST", param);
  }else{
    constant.showMsg("Please select RTO method");
  }
 }


 const reg_SaveCallBack = (res) => {
  console.log("registration", JSON.stringify(res));
  if (res.statusCode === 200) {
    getTermsInfoAndMove()
  } else {
     constant.showMsg(res.message);
  }
}

const fn_SetAllItemUncheck=()=>{
  let newArr = []
  registrationTypeList?.map((item, index) => {
    item.select = false
    newArr.push(item)
  })
  setRegistrationTypeList([...newArr])
  
    // console.log("newArr = ", newArr)
 }

 const fn_selectReg=(item,index)=>{
  let newArr = registrationTypeList
    if(item.select){
      item.select = false
      item.addAmount = ""
      item.totalPre = (isNaN(Number(item?.subTotalPre)+Number(0)) ? 0 :Number(item?.subTotalPre)+Number(0)) 
      item.totalPost = (isNaN(Number(item?.subTotalPost)+Number(0)) ? 0 :Number(item?.subTotalPost)+Number(0))
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
      item.addAmount = Number(d)
      item.totalPre =  isNaN(Number(item?.subTotalPre)+Number(d)) ? 0 :Number(item?.subTotalPre)+Number(d)
      item.totalPost =  isNaN(Number(item?.subTotalPost)+Number(d)) ? 0 :Number(item?.subTotalPost)+Number(d) 
      newArray.push(item)
    }else{
      newArray.push(item)
    }
  
   })
   setRegistrationTypeList([...newArray])
 }

const fn_Footer=()=>{
  return(
  <View>
  <View style={{flex:1,flexDirection:'row'}}>
</View>

<View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5),backgroundColor:'#00000029',paddingVertical:constant.moderateScale(10),borderBottomLeftRadius:10,borderBottomRightRadius:10}]}>
<View style={[styles.callHeaderSubView,{alignItems:'center'}]}>
<Text style={styles.text8}>Total</Text>
</View>
<View style={styles.callHeaderSubView2}>
<Text style={styles.text8}>{fn_PriceTotalCal()}</Text>
</View>
<View style={styles.callHeaderSubView3}>
{/* <Text style={styles.text8}>0</Text> */}
</View>
<View style={styles.callHeaderSubView2}>
<Text style={styles.text8}>{fn_AddAmtTotalCal()}</Text>
</View>
</View >
 </View>
  )
}

const fn_PriceTotalCal=()=>{
  let add1 = 0
  registrationTypeList.map((item,index)=>{
    if(item?.select){
   add1 = add1+ (calculationOnValue?.code === "EX_SR_PRE_DISC" ? Number(item?.subTotalPre) : Number(item?.subTotalPost)) 
    }
  })
  return(add1)
}

const fn_AddAmtTotalCal=()=>{
  let add2 = 0
  registrationTypeList.map((item,index)=>{
    if(item?.select){
   add2 = add2 +  (calculationOnValue?.code === "EX_SR_PRE_DISC" ? Number(item?.totalPre) : Number(item?.totalPost))
    }
  })
  return(add2)
}

   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
 <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>

         <View style={{flex:1,backgroundColor:'#F9F9F9',borderWidth:1,borderColor:constant.whiteColor,borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>District</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Charges Applicable On</Text>
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
                list={rtoLocation}
                disable={false}
                // title={locationValue.code==='' ? ' ' : locationValue?.code }
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setRtoLocationSelected(d)}
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

            {/* <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Billing Location</Text>
              <SelectDropList
                list={billingLocationData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setBillingLocationValue(d)}
              />
            </View> */}

<View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Calculate On</Text>
              <SelectDropList
                list={calculationOnData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setCalculationOnValue(d)}
              />
            </View>

            </View>
            <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingTop:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
          
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
            <Pressable style={[styles. bottomMainView,{}]} onPress={()=>{
              !custumerReg ? fn_SetAllItemUncheck() : null
              setCustumerReg(!custumerReg)
              }}>
                <FastImage source={custumerReg ? images?.checkIcon : images.unCheckIcon} resizeMode='contain' style={styles.checkboxStyle} />
              <Text style={styles.text4}>Registration to be done by Customer</Text>
            </Pressable> 
            
            </View>

           <FlatList 
            data={registrationTypeList}
            ListFooterComponent={()=>fn_Footer()}
            renderItem={({item,index})=>{
              console.log("item",JSON.stringify(item))
            return(
              <View>
                 <View style={{flex:1,flexDirection:'row'}}>
            <Pressable style={[styles. bottomMainView,{}]} onPress={()=> {custumerReg ? null : fn_selectReg(item,index)}}>
                <FastImage source={ item?.select ? images?.checkIcon :images.unCheckIcon} resizeMode='contain' style={styles.checkboxStyle} />
              <Text style={styles.text4}>{item?.description}</Text>
            </Pressable> 
            
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                title={item?.dataCalculation?.perVal+"%"+" "+item?.dataCalculation?.amountVal}
                disable={true}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>{item?.select ? (calculationOnValue?.code === "EX_SR_PRE_DISC" ? item?.subTotalPre : item?.subTotalPost) : 0}</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput keyboardType='numeric' onChangeText={(d)=>fn_AddAmount(d,index)} editable={item?.select ? true : false} style={styles.dropList3} >{item?.addAmount}</TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>{item?.select ? (calculationOnValue?.code === "EX_SR_PRE_DISC" ? item?.totalPre : item?.totalPost) : 0}</Text>
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
                flex:1,
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