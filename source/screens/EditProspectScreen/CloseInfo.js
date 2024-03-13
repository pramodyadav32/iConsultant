import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
// import styles from './EditProspectStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName, tokenApiCall } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CalenderModal from '../../components/CalenderModal';
import moment from 'moment';

export default function CloseInfo(props) {
    const {actionType_Data,modelData ,data, perform_Data } = props
    const dispatch = useDispatch()
    const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
    const [actionTypeData,setActionTypeData] = useState([])
    const [actionTypeValue,setActionTypeValue] = useState({})
    // const [modelData,setModelData] = useState([])
    const [modelValue,setModelValue] = useState({})
    const [performData,setPerformData] = useState(perform_Data)
    const [performValue,setPerformValue] = useState({})
    const [performDate,setPerformdate] = useState('')
    const [comment,setcomment] = useState('')
    const [closureDate,setClosureDate] = useState('')
    const [closureData,setClosureData] = useState([])
    const [closureValue,setClosureValue] = useState({})
    const [remark,setRemark] = useState('')

    const [actionCal_Modal, setActionCal_Modal] = useState(false)
    const [closureCal_Modal, setclosureCal_Modal] = useState(false)

    useEffect(() => {
      fn_GetClosureMaster()
    }, [])


    const fn_GetClosureMaster = () => {
      dispatch(emptyLoader_Action(true))
      let param = 
      {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "code": "",
        "loginUserCompanyId": userData?.companyId,
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
      }
      tokenApiCall(GetClosureMasterCallBack, APIName.GetClosureMasters, "POST", param)
    }
  
    const GetClosureMasterCallBack = async (res) => {
      console.log("search232323-", JSON.stringify(res?.result[0]?.prospectMasterList))
      if (res.statusCode === 200) {
        setClosureData(res?.result?.closureList)
        dispatch(emptyLoader_Action(false))
      } else {
        dispatch(emptyLoader_Action(false))
        constant.showMsg(res.message)
      }
    }
  

      console.log('data',data)
    const fn_ActionDateSelect = (data) => {
        setPerformdate(moment(data.timestamp).format("DD-MMM-yyyy"))
           setActionCal_Modal(false)
      }

     const fn_ClosureDateSelect=(data)=>{
        setClosureDate(moment(data.timestamp).format("DD-MMM-yyyy"))
        setclosureCal_Modal(false)
     } 

     const fn_Create = () => {
        // if (Object.keys(sourceValue).length === 0) {
        //     constant.showMsg("Please select source")
        // } else if (Object.keys(dealCategoryValue).length === 0) {
        //     constant.showMsg("Please select Deal Category")
        // } else if (Object.keys(dealTypeValue).length === 0) {
        //     constant.showMsg("Please select Deal Type")
        // } else if (Object.keys(companyValue).length === 0) {
        //     constant.showMsg("Please select Company")
        // } else {
          const param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "branchCode":selectedBranch?.branchCode,
            "prospectNo": Number(data?.prospectID),
            "loginUserId": userData?.userId,
            
            "ipAddress": "1:1",
            "makeOrder": "string",//closer type if A then send "Y" else "N"
            "make": "string",//base on close type
            "model": "string",//base on close type
            "subModel": "string",//base on close type variant
            "dealerCode": "string",//base on close type if from other dealer
            "comment": "string",
            "closeType": "string",
            "ruleSubCategory": "string",
            "status": "string",
            "closeDate": "string",
            "ordDate": "string",
            "prospectDisLikeList": "string",
            "closureProductList": [
              {
                "serial": 0,
                "model": "string",
                "variant": "string",
                "exterior": "string",
                "interior": "string",
                "qty": 0,
                "expectedDelvDate": "2024-03-13T13:33:49.626Z",
                "proformaLocation": "string",
                "proformaDoc": "string",
                "proformaFY": "string",
                "proformaNo": 0
              }
            ],
            "reOpenDay": "string",
            "reOpenMonth": "string",
            "reOpenYear": "string"
          }
        // }
        console.log("param", param)
        // tokenApiCall(saveBasicInfoCallBack, APIName.SaveProspectClosure, "POST", param)
    
        // }
    
      }
    
      const saveBasicInfoCallBack = (res) => {
        console.log("res", res)
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

      <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={actionType_Data}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setActionTypeValue(d)}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={modelData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setModelValue(d)}

           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed</Text>
           <SelectDropList 
             list={performData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=> setPerformValue(d)}

           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed Date<Text style={styles.text2}>*</Text></Text>
         <Pressable style={styles.calenderMainView} onPress={()=>setActionCal_Modal(true)}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{performDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>

        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Action Comment</Text>
                <TextInput placeholder='Enter Comment' onChangeText={(d)=>setcomment(d)} style={styles.commentInput} >{comment}</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Date</Text>
         <Pressable style={styles.calenderMainView} onPress={()=>setclosureCal_Modal(true)}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{closureDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>
       
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Type</Text>
           <SelectDropList 
             list={closureData}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setClosureValue(d)}

           />
        </View>

        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Remarks</Text>
                <TextInput placeholder='Enter Remarks' onChangeText={(d)=>setRemark(d)} style={styles.commentInput} >{remark}</TextInput>
        </View>
    </View>
    <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

     </ScrollView>

     <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
      />

<CalenderModal
        isVisible={closureCal_Modal}
        onRequestClose={() => setclosureCal_Modal(false)}
        onDateClick={(data) => fn_ClosureDateSelect(data)}
      />
        </View>
    );
}

const styles = StyleSheet.create({
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
     
     
       
       
        
         
        
          commentInput:{
            borderWidth:1,
            height:constant.moderateScale(90),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            paddingHorizontal:"3%",
            fontSize:constant.moderateScale(14),
            textAlignVertical:'top'
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