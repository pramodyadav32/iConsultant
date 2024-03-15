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

const transData=[
   {"code":'PAN_CARD','description':'Pan Card available'},
   {"code":'FORM_60','description':'Pan Card not available'},

]
export default function PerformaBasicInfo(props) {
   const { navigation, performaPriceDetail,performaBasicInfo,cardData,performaGeneralMasterData } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [billingLoactionData,setBillingLocationData] =useState([])
   const [billingLoactionValue,setBillingLocationValue] =useState({})
   const [usageData,setUsageData] = useState([])
   const [usageValue,setUsageValue] = useState({})
   const [salesGroupData,setSalesGroupData] = useState([])
   const [salesGroupValue,setSalesGroupValue] = useState({})
   const [endUseData,setEndUseData] = useState([])
   const [endUseValue,setEndUseValue] = useState([])
   const [tcsStatus,setTcsStatus] = useState(false)
   const [discountValue,setDiscountValue] = useState('')
   const [loyalAmt,setLoayalAmt] = useState('')
   const [trnsBasicValue,setTrnsBasicValue] = useState({})

  

 
   useEffect(()=>{
      performaGeneralMasterData?.selectMasterList.map((item)=>{
         if(item?.listType ==='BILLING_LOCATION'){
          setBillingLocationData(item.basicList)
         }else if(item?.listType ==='USAGE'){
            setUsageData(item.basicList)
           }else if(item?.listType ==='SALE_GROUP'){
            setSalesGroupData(item.basicList)      
           }
           else if(item?.listType ==='END_USE'){
            setEndUseData(item.basicList)      
           }
          
        })
   },[])

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
                        <Text style={styles.listText3}>{cardData?.model}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Varient</Text>
                        <Text style={styles.listText3}>{cardData?.variant}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Style</Text>
                        <Text style={styles.listText3}>STANDARD</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>MY/VY</Text>
                        <Text style={styles.listText3}>{cardData?.prospectFY}</Text>
                     </View>
                  </View>

                  <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Price List</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
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
              <TextInput style={styles.input1} onChangeText={(d)=>setDiscountValue(d)} >{discountValue}</TextInput>

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
                on_Select={(d)=>setSalesGroupValue(d)}
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
              <TextInput style={styles.input1} onChangeText={(d)=>setLoayalAmt(d)} >{loyalAmt}</TextInput>

            </View>

            <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>HSN Code</Text>
                        <Text style={styles.listText3}>New</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Basic Price</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.basicPricePostDiscount}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Discount</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.exShowroomPostDiscount}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Basic Price(Post Discount)</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.basicPricePostDiscount}</Text>
                     </View>
                  </View>
                  </View>
                  <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(0)}}>
            <View style={[styles.costListMainView,{}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>HEAD</Text>
             </View>
             <View style={styles.costListSubView3}>
                <Text style={styles.costListText2}>CGST</Text>
             </View>
             <View style={styles.costListSubView3}>
                <Text style={styles.costListText2}>SGST</Text>
             </View>
             <View style={styles.costListSubView3}>
                <Text style={styles.costListText2}>Total</Text>
             </View>
            </View>

            <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>Tex%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>14.00%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>14.00%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}></Text>
             </View>
             </View>

             <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>Tax Amount</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             </View>
             <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>Surcharge%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0.00%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0.00%</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}></Text>
             </View>
             </View>

             <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>Surcharge Amt</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             </View>

             <View style={[styles. costListMainView,{backgroundColor:'#F0F0F0',borderBottomRightRadius:10,borderBottomLeftRadius:10,paddingVertical:constant.moderateScale(7),paddingHorizontal:10,marginHorizontal:0}]}>
             <View style={[styles.driveListDetailSubView,{}]}>
                <Text style={styles.costListText2}>Total</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             <View style={[styles.costListSubView3,{}]}>
             <Text style={styles.costListText3}>0</Text>
             </View>
             </View>
             
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
                        <Text style={styles.listText3}>{performaPriceDetail?.exShowroomPreDiscount}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Ex-Showroom(Post Discount)</Text>
                        <Text style={styles.listText3}>{performaPriceDetail?.exShowroomPostDiscount}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Booking Amount</Text>
                        <Text style={styles.listText3}>_</Text>
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