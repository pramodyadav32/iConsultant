import React,{useState,useEffect} from "react"
import { View, Modal, StyleSheet,Text,Pressable,TextInput} from "react-native"
import * as constant from '../utilities/constants'
import { useSelector,useDispatch } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectDropList from "./SelectDropList"
import FastImage from "react-native-fast-image"
import images from "../utilities/images"
import Button from "./Button"
import CalenderModal from "./CalenderModal"
import moment from "moment"
import { APIName, tokenApiCall } from "../utilities/apiCaller"
const UpdateActionModal = (props) => {
    const {isVisible,onRequestClose,data,modelData,actionType_Data} = props
    console.log("data",actionType_Data)
    const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
    const [actionCal_Modal, setActionCal_Modal] = useState(false)
    const [actionDate,setActionDate] = useState('')
    const [actionTypeValue,setActionTypeValue] = useState({})
    const [modelValue,setModelValue] = useState({})
    const [performData,setPerformData] = useState([])
    const [performValue,setPerformValue] = useState({})
    const [comment,setComment] = useState('')

  useEffect(()=>{
    actionType_Data.map((item)=>{
          item.code===data?.actionCode ? setActionTypeValue(item) : null
    })
  },[actionType_Data])

    const fn_ActionDateSelect = (data) => {  
        setActionDate(moment(data.timestamp).format("DD-MMM-yyyy"))
        setActionCal_Modal(false)
      }

      const fn_Create = () => {
        if (Object.keys(actionTypeValue).length === 0) {
            constant.showMsg("Please select action type")
        } else if (Object.keys(modelValue).length === 0) {
            constant.showMsg("Please select Model")
        } else if (Object.keys(performValue).length === 0) {
            constant.showMsg("Please select Performed")
        } else if (performData==='') {
            constant.showMsg("Please select Performed Date")
        } else {
        const param = {
          "brandCode": userData?.brandCode,
          "countryCode": userData?.countryCode,
          "companyId": userData?.companyId,
          // "prospectLocation": selectedBranch.brandCode,
          "prospectNo": Number(data?.prospectId),   
          "fy": "2023-2024",
          "actionPerformed": "Test",
          "actionComment": comment,
          "salesperson": "string",
          "currentAction": "string",
          "actionDate": "09-Mar-2024",
          "actionCloseDate":actionDate,
          "hour1": 1,
          "minutes1": 30,
          "hour2": 1,
          "minutes2": 2,
          "demoVehModel": "string",
          "demoVehVariant": "string",
          "demoVehChassisNo": "string",
          "projectDate": "09-Mar-2024",
          "activeRate": "",
          "loginUserId": userData?.userId,
          "ipAddress": "1::1",
          "nextRemark": "Test next Remark",
          "slotCount": 2,
          "slotMins": "01:00:00",
          "testDriveZone": "",
          "tagCode": "",
          "serial": 0,
          "orderFY": "2023-2024",
          "orderNo": 8371,
          "nextActionComment": "Test next Action Comment",
          "purchaseProbability": "",
          "branchCode": selectedBranch?.branchCode,
    
        }
        console.log("param", param)
        tokenApiCall(saveBasicInfoCallBack, APIName.SaveProspectBasicInfo, "POST", param)
    
        }
    
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
        <Modal
            transparent={true}
            visible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
              <View style={styles.modalSubView}>
              <AntDesign name='close' style={styles.closeIcon} onPress={()=>onRequestClose()} />
              <View style={styles.innerView}>
              <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={actionType_Data}
             title={actionTypeValue?.description}
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
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>


        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed Date<Text style={styles.text2}>*</Text></Text>
         <Pressable style={styles.calenderMainView} onPress={()=>setActionCal_Modal(true)}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{actionDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>


        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Action Comment</Text>
                <TextInput placeholder='Enter Comment' onChangeText={(d)=>setComment(d)} style={styles.commentInput} >{comment}</TextInput>
        </View>
        <View style={[styles.detailMainView,{alignItems:'center',justifyContent:'center',marginTop:constant.moderateScale(20)}]}>
           <Button title='Save'
            buttonExt={styles.SaveButton}
            click_Action={()=>fn_Create()}
           />
        </View>
              </View>
              </View>
              <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
      />
            </View>
        </Modal>
    )
}

UpdateActionModal.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default UpdateActionModal;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: constant.whiteColor,
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
    closeIcon:{
        fontSize:constant.moderateScale(20),
        color:constant.red,
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(5),
        alignSelf:'flex-end',
        paddingRight:constant.moderateScale(5),
        paddingLeft:constant.moderateScale(10),
        paddingBottom:constant.moderateScale(2),
        paddingTop:constant.moderateScale(10)
      },
      modalSubView:{
     width:constant.resW(96)
      },
      innerView:{
      backgroundColor:constant.whiteColor,
      paddingVertical:constant.moderateScale(13),
      paddingHorizontal:constant.moderateScale(15),
      borderRadius:15,
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
        timeDropListText:{
            fontSize:constant.moderateScale(13),
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
            width:constant.resW(17),
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
           paddingHorizontal:0
          },
          dropNameListText:{
              fontSize:constant.moderateScale(14),
              color:constant.textColor,
              fontFamily:constant.typeLight,
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
        SaveButton:{
            width:constant.moderateScale(150)
        }
})