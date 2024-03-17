import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput, StyleSheet } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './PerformaStyle';
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
import { emptyLoader_Action } from '../../redux/actions/AuthAction';

const transData=[
   {"code":'PAN_CARD','description':'Pan Card available'},
   {"code":'FORM_60','description':'Pan Card not available'},

]

const priceList=[
   {"code":'CURRENT_DATE','description':"Applicable on Current Date"}
]
export default function PerformaBasicInfo(props) {
   const { navigation, performaPriceDetail,performaBasicInfo,texMasterData,cardData,performaGeneralMasterData,SaveInfo,prospect_No,intrestedVehicleList} = props
   const dispatch = useDispatch()
   const { userData,selectedBranch } = useSelector(state => state.AuthReducer)
   const [billingLoactionData,setBillingLocationData] =useState([])
   const [billingLoactionValue,setBillingLocationValue] =useState({})
   const [usageData,setUsageData] = useState([])
   const [usageValue,setUsageValue] = useState({})
   const [salesGroupData,setSalesGroupData] = useState([])
   const [salesGroupValue,setSalesGroupValue] = useState({})
   const [endUseData,setEndUseData] = useState([])
   const [endUseValue,setEndUseValue] = useState([])
   const [tcsStatus,setTcsStatus] = useState(false)
   const [discountValue,setDiscountValue] = useState("0")
   const [loyalAmt,setLoayalAmt] = useState(0)
   const [trnsBasicValue,setTrnsBasicValue] = useState({})
   const [texMaster,setTexMaster] = useState([])
   const [texTotal,setTexTotal] = useState(0)
   const [surchargeData,setSurchargeData] = useState(0)
   const [totalAmount,setTotalAmount] = useState(0)
   const [priceListValue,setPriceListValue] = useState({"code":'CURRENT_DATE','description':"Applicable on Current Date"})

   useEffect(()=>{
      console.log("performaGeneralMasterData = ", performaGeneralMasterData)
      // console.log("performaGeneralMasterData data = ", performperformaPriceDetail)
      console.log("performaGeneralMasterData performaBasicInfo = ", performaBasicInfo)
      console.log("performaGeneralMasterData texMasterData = ", texMasterData)
      console.log("performaGeneralMasterData cardData = ", cardData)
      
      performaGeneralMasterData?.selectMasterList.map((item)=>{
         if(item?.listType ==='BILLING_LOCATION'){
          setBillingLocationData(item.basicList)
         }else if(item?.listType ==='USAGE'){
            setUsageData(item.basicList)
           }else if(item?.listType ==='SALE_GROUP'){
            setSalesGroupData(item.basicList)      
           }
         //   else if(item?.listType ==='END_USE'){
         //    setEndUseData(item.basicList)      
         //   }         
        })
   let newArray = []
   let newTaxTotal = 0
   let newSubCharge = 0
   let newTotal = 0
    texMasterData?.selectedProformaValueCodes.map((item)=>{
       newTaxTotal= newTaxTotal+Number(item.perc)
       newSubCharge = newSubCharge + Number(item.surcharge)
      let newObj = ((performaPriceDetail?.vehBasicAmount - Number(discountValue))* Number(item?.perc))/100
       newTotal = newTotal + Number(newObj)
      item["total"] = newObj
      newArray.push(item)
    })

    setTexMaster([...newArray])
    setTexTotal(newTaxTotal)
    setSurchargeData(newSubCharge)
    setTotalAmount(newTotal)

   },[texMasterData])


   const fn_GetProformaGeneralMasters = (d) => {
      setSalesGroupValue(d)
     dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo": Number(cardData?.prospectId),
         "proformaId": 0,
         "assembly": "",
         "edition": "",
         "model": cardData?.model,
         "subModel": cardData?.variant,
         "style": "",
         "my": 0,
         "vy": 0,
         "exterior": "",
         "interior": "",
         "calledBy": "BILLING_LOCATION,USAGE,SALE_GROUP,END_USE,ITEM_GROUP,RTO_CITY,RTO_CODE,INSU_CITY,INSU_COMPANY,REGN_TYPE,VEH_PRICE",
         "priceListApplicable": moment(new Date()).format('DD-MMM-YYYY'),//"23-APR-2024",
         "billingLocation": "",
         "usage": "",
         "saleGroup": d.code,
         "endUse": "",
         "vehiclePrice": 0,
         "itemGroup": "",
         "regnLocation": "",
         "rtoCode": "",
         "insuLocation": "",
         "insuCode": "",
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
      };
      tokenApiCall(
         GetProformaGeneralMastersCallBack,
         APIName.GetProformaGeneralMast
         ,
         "POST",
         param
      );
   };

   const GetProformaGeneralMastersCallBack = (res) => {
      console.log("GetProformaGeneralMastersCallBack = ", JSON.stringify(res));
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         res.result?.selectMasterList.map((item)=>{
            if(item?.listType ==='END_USE'){
               setEndUseData(item.basicList)      
              } 
         })     
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_Create=()=>{
     dispatch(emptyLoader_Action(true))
      let newParam = []
       texMasterData?.selectedProformaValueCodes.map((item)=>{
         let newValue = item?.taxCode+"0000"+item?.perc+item?.surcharge
         newParam.push(newValue)
       })
       console.log("aaa   ",usageValue)
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo":Number(cardData?.prospectId),
         "coNo": 0,
         "piLocation": cardData?.prospectLocation, //prospect location
         "piDoc": "SRP",
         "piFY": '',  //current date fy
         "piNo": Number(prospect_No),
         "priceListApplicable": "CURRENT_DATE",
         "make": userData?.brandCode,
         "assembly":cardData?.vehAssemblyType,
         "edition": cardData?.vehEditionType,
         "model": cardData?.model,
         "variant": cardData?.variant,
         "exterior": cardData?.colorCode,
         "interior": cardData?.upholsteryCode,
         "piStyle": cardData?.vehVariantStyle,
         "piMY": 0,
         "piVY": 0,
         "priceSerial": 0,
         "basicPrice": performaPriceDetail?.vehBasicAmount,
         "discount": Number(discountValue),
         "itemDiscount": 0,
         "totalTax": parseInt(totalAmount),
         "totalLevy": 0,
         "exShowroomPostDisc": performaPriceDetail?.exShowromPrice,
         "exShowroomPreDisc": performaPriceDetail?.netShowromPrice,
         "bookingAmount": 0,
         "piUsage": usageValue?.code,
         "piBillingLocation": billingLoactionValue?.code,
         "corporateAmt": 0,
         "tcsAppicable": tcsStatus ? "Y" : "N",
         "tcsRate": 0,
         "tcsAmt": 0,
         "trxnBasic": trnsBasicValue?.code,
         "userId": userData?.userId,
         "createIP": "1::1",
         "gstList": (newParam.join(",")).toString(),    //textcodeeeee
         "calledBy": "PROSPECT",
         "endUse": endUseData?.code,
         "insuCode": "",
         "insuLocation": "",
         "itemGroup": "",
         "loginUserId": userData?.userId,
         "proformaId": 0,
         "regnLocation": "",
         "rtoCode": "",
         "saleGroup": salesGroupValue.code,
         "subModel": cardData?.variant,
         "vehiclePrice": 0,
       }
       tokenApiCall(SaveProformaBasicInfoCallBack, APIName.SaveProformaBasicInfo, "POST", param)

   }


   const SaveProformaBasicInfoCallBack = (res) => {
      console.log("GetSave = ", JSON.stringify(res));
      if (res.statusCode === 200) {
        if(res?.result?.resultCode==='Y'){
         SaveInfo()
        }else{
         constant.showMsg("Somethings wents wrong")
        }
       
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_HeaderList=()=>{
      return(
         <View style={[styles.costListMainView,{}]}>
         <View style={[styles.driveListDetailSubView,{}]}>
            <Text style={styles.costListText2}>HEAD</Text>
         </View>
         <View style={styles.costListSubView3}>
            <Text style={styles.costListText2}>Tax%</Text>
         </View>
         <View style={styles.costListSubView3}>
            <Text style={styles.costListText2}>surcharge%</Text>
         </View>
         <View style={styles.costListSubView3}>
            <Text style={styles.costListText2}>Total</Text>
         </View>
        </View>
      )
   }

   const texListRender=({item,index})=>{
      return(
         <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
         <View style={[styles.driveListDetailSubView,{}]}>
            <Text style={styles.costListText2}>{item?.taxType}</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{(item?.perc).toFixed(2)}%</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{(item?.surcharge).toFixed(2)}%</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{item.total}</Text>
         </View>
         </View>
      )
   }


  

  const fn_FooterList=()=>{
      return(
         <View style={[styles. costListMainView,{backgroundColor:'#F0F0F0',borderBottomRightRadius:10,borderBottomLeftRadius:10,paddingVertical:constant.moderateScale(7),paddingHorizontal:10,marginHorizontal:0}]}>
         <View style={[styles.driveListDetailSubView,{}]}>
            <Text style={styles.costListText2}>Total</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{(texTotal).toFixed(2)}</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{(surchargeData).toFixed(2)}</Text>
         </View>
         <View style={[styles.costListSubView3,{}]}>
         <Text style={styles.costListText3}>{(totalAmount).toFixed(2)}</Text>
         </View>
         </View>
      )
   }

   const fn_GetDiscount=(d)=>{
      setDiscountValue(d)
      let newArray = []
      let newTotal = 0
      texMasterData.selectedProformaValueCodes.map((item)=>{
        let newObj = ((performaPriceDetail?.vehBasicAmount - Number(d))* Number(item?.perc))/100
         item["total"] = newObj
         newTotal = newTotal + Number(newObj)
        newArray.push(item)
      })
  
      setTexMaster([...newArray])
      setTotalAmount(newTotal)
   }

   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
 <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={mainStyle.cal_SubView2}>
          
               <View style={{ flex: 1,  }}>
                  {/* <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Source</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View> */}

                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15)}]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Proforma Inv no</Text>
                        <Text style={styles.listText3}>New</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Dated</Text>
                        <Text style={styles.listText3}>{moment(new Date).format("DD-MMM-YYYY")}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Model</Text>
                        <Text style={styles.listText3}>{intrestedVehicleList?.model}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Variant</Text>
                        <Text style={styles.listText3}>{intrestedVehicleList?.vehVariantDesc}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Style</Text>
                        <Text style={styles.listText3}>{intrestedVehicleList?.vehVariantStyle}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>MY/VY</Text>
                        <Text style={styles.listText3}>{intrestedVehicleList?.modelYear}-{intrestedVehicleList?.vinYear}</Text>
                     </View>
                  </View>

                  <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Price List</Text>
              <SelectDropList
                list={priceList}
                title={priceListValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setPriceListValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Billing Location</Text>
              <SelectDropList
                list={billingLoactionData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setBillingLocationValue(d)}
              />
            </View>
            <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(10)}}>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Discount</Text>
              <TextInput style={styles.input1} keyboardType='numeric' onChangeText={(d)=>fn_GetDiscount(d)} >{discountValue}</TextInput>

            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Usage</Text>
              <SelectDropList
                list={usageData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setUsageValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Sale Group</Text>
              <SelectDropList
                list={salesGroupData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=> fn_GetProformaGeneralMasters(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>End Use</Text>
              <SelectDropList
                list={endUseData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setEndUseValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Loyalty Disc Amt</Text>
              <TextInput style={styles.input1} editable={false} onChangeText={(d)=>setLoayalAmt(d)} >{loyalAmt}</TextInput>

            </View>

            <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>HSN Code</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.hsnCode}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Basic Price</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.vehBasicAmount}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Discount</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.discountAmt}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Basic Price(Post Discount)</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.vehBasicAmount}</Text>
                     </View>
                  </View>
                  </View>
                  <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(0)}}>
            <FlatList 
             data={texMaster}
             ListHeaderComponent={()=>fn_HeaderList()}
             renderItem={texListRender}
             ListFooterComponent={()=>fn_FooterList()}
            />
            </View>
             <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(20)}}>

             <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Trnx Basic</Text>
              <SelectDropList
                list={transData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d)=>setTrnsBasicValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>TCS</Text>
             <Pressable style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={()=>setTcsStatus(!tcsStatus)}>
               <FastImage source={tcsStatus ? images?.checkIcon : images?.unCheckIcon} resizeMode='contain' style={mainStyle.tcsCheckBox} />
              <Text style={mainStyle.tcsText}>0</Text>
             </Pressable>
            </View>

            <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Ex-Showroom(Pre-Discount)</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.exShowromPrice}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Ex-Showroom(Post Discount)</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.exShowromPrice}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Booking Amount</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.bookingAmt}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        {/* <Text style={styles.listText2}>MY/VY</Text>
                        <Text style={styles.listText3}>2024/2024</Text> */}
                     </View>
                  </View>
            </View>
           
             </View>
            
         
        
          
         </View>
         <Button title='Create Proforma' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />
     </ScrollView>
      </View>
   )
}

const mainStyle= StyleSheet.create({
    cal_SubView2:{
       flex:1,
       backgroundColor:constant.whiteColor,
       marginBottom:constant.moderateScale(6),
       borderBottomLeftRadius:10,
       borderBottomRightRadius:10
      },
      tcsCheckBox:{
         height:constant.moderateScale(26),
         width:constant.moderateScale(26)
      },
      tcsText:{
         fontFamily:constant.typeMedium,
         fontSize:constant.moderateScale(16),
         marginLeft:constant.moderateScale(8),
         color:constant.blackColor,
      }
 })