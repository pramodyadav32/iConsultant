import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName, tokenApiCall } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CalenderModal from '../../components/CalenderModal';
import moment from 'moment';

let data1 =[
    {"code":1,'description':1},
    {"code":2,'description':2},
    {"code":3,'description':3},
    {"code":4,'description':4},
    {"code":5,'description':5},

]

export default function CustumerInfo(props) {
    const { data,prospectMaster, prospectDetail,profile_Data, existing_Vehicle} = props
    const dispatch = useDispatch()
    const { userData, selectedBranch } = useSelector((state) => state.AuthReducer);
    const [active, setActive] = useState(1) 
    const [occupationList,setOccupationList] = useState([])
    const [occupationValue,setOccupationValue] = useState({})
    const [usageData,setUsageData] = useState([])
    const [usageValue,setUsageValue] = useState({})
    const [bodyTypeData,setBodyTypeData] = useState([])
    const [bodyTypeValue,setBodyTypeValue] = useState({})
    const [brandData,setBrandData] = useState([])
    const [brandValue,setBrandValue] = useState({})
    const [modelData,setModelData] = useState([])
    const [modelValue,setModelValue] = useState({})
    const [varientData,setVarientData] = useState([])
    const [varientValue,setVarientValue] = useState({})
    const [yearPurchaseData,setYearPurchaseData]= useState([])
    const [yearPurchaseValue,setYearPurchaseValue]= useState({})
    const [qtyData,setQtyData] = useState([])
    const [qtyValue,setQtyValue] = useState({})

   useEffect(()=>{

    profile_Data.map((item)=>{
        if(item?.listType === "USAGE"){
          setUsageData(item?.existingVehicleMasterList)
          item?.existingVehicleMasterList.map((item)=>{
            if(item?.code === existing_Vehicle[0]?.usageCode){
                setUsageValue(item)
            }
          })
        }else if(item?.listType === "OCCUPATION"){
            setOccupationList(item?.existingVehicleMasterList)
            item?.existingVehicleMasterList.map((item)=>{
                if(item?.code === existing_Vehicle[0]?.ownerShip){
                    setOccupationValue(item)
                }
              })
          }else if(item?.listType === "BRAND"){
            item?.existingVehicleMasterList.map((item)=>{
                if(item?.code === existing_Vehicle[0]?.make){
                    setBodyTypeValue(item)
                }
              })
            setBrandData(item?.existingVehicleMasterList)
          }else if(item?.listType === "BODY_TYPE"){
            setBodyTypeData(item?.existingVehicleMasterList)
          }else if(item?.listType === "MODEL"){
            setModelData(item?.existingVehicleMasterList)
            item?.existingVehicleMasterList.map((item)=>{
                if(item?.code === existing_Vehicle[0]?.modelCode){
                    setModelValue(item)
                }
              })
          }else if(item?.listType === "VARIANT"){
            setVarientData(item?.existingVehicleMasterList)
            item?.existingVehicleMasterList.map((item)=>{
                if(item?.code === existing_Vehicle[0]?.variantCode){
                    setVarientValue(item)
                }
              })
          }else if(item?.listType === "YEAR_OF_PURCHASE"){
            setYearPurchaseData(item?.existingVehicleMasterList)
            item?.existingVehicleMasterList.map((item)=>{
                if(Number(item?.code) === existing_Vehicle[0]?.yearOfPurchase){
                    setYearPurchaseValue(item)
                }
              })
          }
     })
     setQtyData(data)
     data1.map((item)=>{
        if(item.code === existing_Vehicle[0]?.quantity){
            setQtyValue(item)
        }
     })

   },[profile_Data,existing_Vehicle])

   const validation=()=>{
    if (Object.keys(occupationValue).length === 0) {
        constant.showMsg("Please Select Occupation")
      } else if (Object.keys(usageValue).length === 0) {
        constant.showMsg("Please Select Usage")
      } else if (Object.keys(bodyTypeValue).length === 0) {
        constant.showMsg("Please Select Body Type")
      } else if (Object.keys(brandValue).length === 0) {
        constant.showMsg("Please Select Brand")
      } else if (Object.keys(modelValue).length === 0) {
        constant.showMsg("Please Select Model")
      } else if (Object.keys(varientValue).length === 0) {
        constant.showMsg("Please Select Varient")
      } else if (Object.keys(yearPurchaseValue).length === 0) {
        constant.showMsg("Please Select Year of Purchase")
      } else if (Object.keys(qtyValue).length === 0) {
        constant.showMsg("Please Select QTY")
      }  else {
        fn_Create()
      }
   }

    const fn_Create=()=>{
        let param = {        
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "prospectNo": Number(data?.prospectID),
            "branchCode": selectedBranch?.branchCode,
            "competitorBrand": "",
            "fy": data?.prospectFY,
            "prospectLocation":data?.prospectLocation,
            "make": "",
            "model": modelValue?.code,
            "subModel": varientValue?.code,
            "owner": "",
            "financer": "",
            "yearofPurchase": yearPurchaseValue?.code,
            "qty": Number(qtyValue?.code),
            "comment": "string",
            "usage": usageValue?.code,
            "brandType": brandValue?.code,
            "serial": 0,
            "loginUserId": userData?.userId,
            "ipAddress": "1::1",
            "actionType": "",
            "deleteFlag": "",
            "occupation": occupationValue?.code,
            "productSerial": 0
           
        }

        tokenApiCall(saveProfileCallBack, APIName.SaveCustomerProfile, "POST", param)

    }

    const saveProfileCallBack = async (res) => {
        console.log("savecustumer", JSON.stringify(res))
        dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
          
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

 

    return (
        <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={{flex:1,backgroundColor:constant.whiteColor,borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingBottom:constant.moderateScale(20)}}>

   <View>
    <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Occupation<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={occupationList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setOccupationValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={usageData}
             title={usageValue?.description}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setUsageValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Body Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={bodyTypeData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setBodyTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={brandData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setBrandValue(d)}
           />
            </View>
        </View>

 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={modelData}
             title={modelValue?.description}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setModelValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={varientData}
             title={varientValue?.code}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setVarientValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Year of Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={yearPurchaseData}
             title={yearPurchaseValue?.description}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setYearPurchaseValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Qty</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={qtyData}
             title={qtyValue?.description}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setQtyValue(d)}
           />
            </View>
        </View> 

        </View>



</View>
<Button title='Save' click_Action={() => validation()} buttonExt={styles.performaButton} />

     </ScrollView>

   
        </View>
    );
}

const styles = StyleSheet.create({
    headerImageStyle:{
        height:undefined,
        width:undefined,
        marginHorizontal:constant.moderateScale(8),
       marginBottom:constant.moderateScale(2),
       elevation:1
  
      },
      up_ListText:{
        fontSize:constant.moderateScale(13),
        color:'#3B3B3B',
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(18)
      },
      upRightArrow:{
        height:constant.moderateScale(16),
        width:constant.moderateScale(16),
        marginRight:constant.moderateScale(10)
      },
      upRightArrow2:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25),
        marginRight:constant.moderateScale(10)
      },

      detailMainView:{
        paddingHorizontal:"3%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5)
        },
        detailText:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            width:constant.moderateScale(115),
            fontFamily:constant.typeLight
        },
        text2:{
            fontSize:constant.moderateScale(14),
            color:constant.red,  
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
        mobileSubView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
        },
        input1:{
            borderWidth:1,
            height:constant.moderateScale(40),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            paddingHorizontal:"3%",
            fontSize:constant.moderateScale(15)
        },
        searchButtonStyle:{
        alignItems:'center',
        justifyContent:'center',
        },
        searchStyle:{
            height:constant.moderateScale(50),
            width:constant.moderateScale(50),
        },
        detailMainView2:{
            paddingHorizontal:"2%",
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:"2%"
            },
        bottomMainView:{
        backgroundColor:constant.whiteColor,
        marginHorizontal:'1%',
        borderRadius:10,
        elevation:1,
        marginTop:'3%',
        paddingBottom:'2%'
        },
        calenderStyle:{
            height:constant.moderateScale(25),
            width:constant.moderateScale(25),
            marginRight:'2%'
        },
        calenderMainView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ABABAB',
        paddingLeft:"3%",
    
        },
        calenderInput:{
            height:constant.moderateScale(40),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            fontSize:constant.moderateScale(14)
        },
        proceedButton:{
         width:constant.moderateScale(135),
         alignSelf:'center',
         marginTop:constant.resW(30),
         marginBottom:constant.resW(5)
        },
        proccedButtonText:{
    
        },
        dropNameList:{
            borderWidth:1,
            height:constant.moderateScale(40),
            borderRadius:8,
            width:constant.resW(19),
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
        //    paddingHorizontal:0
          },
          dropNameListText:{
              fontSize:constant.moderateScale(14),
              color:constant.textColor,
              fontFamily:constant.typeLight,
          },
          refInput:{
            height:constant.moderateScale(40),
            flex:1,
            backgroundColor:constant.whiteColor,
            color:'#4AAA38',
            fontFamily:constant.typeMedium,
            fontSize:constant.moderateScale(15)
          },
          coutMainView:{
           flex:1,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'center'
          },
        
           
           
            calenderStyle:{
                height:constant.moderateScale(25),
                width:constant.moderateScale(25),
                marginRight:'2%'
            },
            calenderMainView:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            borderWidth:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            paddingLeft:"3%",
        
            },
            calenderInput:{
                height:constant.moderateScale(40),
                flex:1,
                borderRadius:10,
                borderColor:'#ABABAB',
                backgroundColor:constant.whiteColor,
                color:constant.blackColor,
                fontFamily:constant.typeLight,
                fontSize:constant.moderateScale(14)
            },
            materialText:{
                color:'#000000',
                fontFamily:constant.typeRegular,
                fontSize:constant.moderateScale(13),
                marginLeft:constant.moderateScale(7)
            },
            radioButton:{
            flexDirection:'row',
            alignItems:'center',
            flex:1,
            paddingVertical:constant.moderateScale(5)
            },
            readioIcon:{
             fontSize:constant.moderateScale(25),
             color:'#BEBEBE',

            },
            readioIcon2:{
                fontSize:constant.moderateScale(25),
                color:constant.red,
                
               },
               performaButton: {
                marginBottom: constant.moderateScale(30),
                marginTop: constant.moderateScale(10),
                marginHorizontal: constant.moderateScale(70),
                paddingVertical: constant.moderateScale(10),
                borderWidth: 1,
                borderColor: constant.whiteColor,
            },
})