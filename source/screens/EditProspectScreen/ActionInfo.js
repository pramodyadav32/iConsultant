import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { userData_Action, emptyLoader_Action, home_Refresh_Action } from '../../redux/actions/AuthAction'
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
import ProspectActionSlotScreen from '../ProspectScreen/ProspectActionSlotScreen';
import UpdateActionModal from '../../components/UpdateActionModal';
import FeedBackModal from '../../components/FeedBackModal';
import ActionTodayScreen from '../ActionTodayScreen/ActionTodayScreen';

export default function ActionInfo(props) {
  const { cardClick, updateClick, data, prospectData, actionType_Data, modelData,perform_Data, fn_Next } = props
  const dispatch = useDispatch()
  const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
  const [actionTypeValue, setActionTypeValue] = useState({})
  const [modelValue, setModelValue] = useState({})
  const [actionCal_Modal, setActionCal_Modal] = useState(false)
  const [actionModelValue, setActionModelValue] = useState({})
  const [actionDate, setActionDate] = useState('')
  const [actionSlotValue, setActionSlotValue] = useState(' ')
  const [actionSlotValue2, setActionSlotValue2] = useState(' ')
  const [vinData, setVinData] = useState('')
  const [vehVariant, setVehVariant] = useState('')
  const [regData, setRegData] = useState('')
  const [comment, setCommentValue] = useState('')
  const [updateModal, setUpdateModal] = useState({ show: false, data: {} })
  const [updateModalData, setUpdateModalData] = useState()
  const [timeSlotModal, setTimeSlotModal] = useState({ show: false, date: '', vehicleList: [], slotList: [], utcDateFormate: '' })
  const [feedBackModal, setFeedBackModal] = useState({ show: false, data: [],selectItem:{} })
  const [consultantList, setConsultantList] = useState()
  const [slotCount, setSlotCount] = useState()
  const [allSlotList, setAllSlotList] = useState()
  
  useEffect(() => {
    fn_GetConsultantNameProspectMaster()
}, [])



  const renderItem = (item, index) => {
   
    return (
      <View>
      <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(5), marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={[styles.driveListDetailSubView, {}]}>
            <Text style={styles.listText3}>Active Action</Text>
            <View style={styles.horizontalLine} />
          </View>

        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={[styles.driveListDetailSubView, {}]}>
            <Text style={styles.listText2}>Pending Action</Text>
            <Text style={styles.listText3}>{item?.actionDescription}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Due on </Text>
            <Text style={styles.listText3}>{moment(item?.dueOn,"DD-MMM-YYYY").format("DD-MMM-YYYY")}</Text>
          </View>
        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={styles.driveListDetailSubView}>
            <Text style={styles.listText2}>Stutus</Text>
            <Text style={styles.listText3}>{item?.statusDesc}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Projected Closure Date</Text>
            <Text style={styles.listText3}>{moment(item?.projectedCloserDate,'DD-MMM-YYYY').format("DD-MMM-YYYY")}</Text>
          </View>
        </View>

        {/* <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={styles.driveListDetailSubView}>
            <Text style={styles.listText2}>Stutus</Text>
            <Text style={styles.listText3}>{item?.statusDesc}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Previous Action Completed on</Text>
            <Text style={styles.listText3}>{item?.performedOn}</Text>
          </View>
        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={styles.driveListDetailSubView}>
            <Text style={styles.listText2}>Remarks</Text>
            <Text style={styles.listText3}>{item?.remark}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Projected Closure Date</Text>
            <Text style={styles.listText3}>{moment(item?.projectedCloserDate,'DD-MMM-YYYY').format("DD-MMM-YYYY")}</Text>
          </View>
        </View> */}

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
          <View style={[styles.buttonView2, { flex: 0.45 }]}>

          </View>
          <View style={[styles.buttonView, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
            <Button title='Update'
              buttonExt={styles.updateButton}
              click_Action={() => fn_UpdateClick(item, index)}
            />
            {item?.actionCode ==='06' ?
            <Pressable style={styles.feedbackButton} disabled={item?.status==="P" ? false : true} onPress={() => fn_FeedBack(item, index)}>
              <FastImage resizeMode='contain' source={images.feedBackIcon} style={styles.updateIcn} />
            </Pressable>
            : 
            <View style={[styles.buttonView2, { flex: 1 }]}>

            </View>
            }
            {/* <Button title='Update'
            buttonExt={styles.updateButton}
            click_Action={()=>feedBackClick(item,index)}
           /> */}
          </View>
        </View>



      </View>
      {index === data?.length-1 ?
       fn_Footer()
       : null  
    }
      </View>
    )
  }

 const fn_UpdateClick=(item,index)=>{
   setUpdateModal({show:true,data:item})
 }

  const fn_CalenderClick = () => {
    if(actionTypeValue.code==='06'){
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model")
    } else {
      setActionCal_Modal(true)
    }}
    else {
      setActionCal_Modal(true)
    }
  }
  const fn_ActionDateSelect = (data) => {
    if(actionTypeValue.code==='06'){
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model")
    } else {
      const originalDate = moment(data.timestamp);
      const utcDate = originalDate.utc();
      const zoneData = utcDate.toISOString()
      console.log("zoneData",zoneData)
      setActionDate(moment(data.timestamp).format("DD-MM-yyyy"))
      setTimeSlotModal(s => { return { ...s, date: data, utcDateFormate: zoneData } })
      fn_GetDemoVehicleList()
    }
  }else{
    const originalDate = moment(data.timestamp);
    const utcDate = originalDate.utc();
    const zoneData = utcDate.toISOString()
    console.log("zoneData",zoneData)
    setActionDate(moment(data.timestamp).format("DD-MM-yyyy"))
    setTimeSlotModal(s => { return { ...s, date: data, utcDateFormate: zoneData } })
    fn_GetDemoVehicleList()
  }
  }

  const fn_GetDemoVehicleList = () => {
    dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "calledBy": "VEHICLE",
      "model": actionTypeValue.code === '06' ?  actionModelValue.code: "",
      "loginUserCompanyId": "ORBIT",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetDemoVehicleListCallBack, APIName.GetDemoVehicleList, "POST", param)
  }

  const GetDemoVehicleListCallBack = async (res) => {
    if (res.statusCode === 200) {
      setActionCal_Modal(false)
      if(res?.result?.demoVehicleList.length>0){
        fn_GetActionSlots(res?.result?.demoVehicleList[0],0)
      }else{
        fn_GetActionSlots({},0)
      }
      setTimeSlotModal(s => { return { ...s, show: true, vehicleList: res?.result?.demoVehicleList } })
      dispatch(emptyLoader_Action(false))

    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_GetActionSlots = (item, index) => {
    dispatch(emptyLoader_Action(true))
    console.log("iiiiiiitem = ")
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchcode": selectedBranch?.branchCode,
      "calledBy": "TIME_SLOTS",
      "actionCode": actionTypeValue?.code,
      "chassisNo": item?.chassisNo=== undefined ? "" :item?.chassisNo ,
      "empCode": userData?.empCode,
      "date": timeSlotModal?.utcDateFormate,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetActionSlotsCallBack, APIName.GetActionSlots, "POST", param)
  }

  const GetActionSlotsCallBack = async (res) => {
    if (res.statusCode === 200) {
      let data = []
      let newList = [...res.result?.actionSlotList]
      await newList.map((item) => {
        item["Select"] = false
        data.push(item)
      })
      setTimeSlotModal(s => { return { ...s, slotList:[...data] } })
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_SlotDone = (selectVeh, slotData) => {
    actionTypeValue?.code === '06' ?  setVinData(selectVeh?.chassisNo) : null
    setVehVariant(selectVeh?.variant)
    actionTypeValue?.code === '06' ?  setRegData(selectVeh?.regn) : null
    setSlotCount(slotData.length)
    setAllSlotList(slotData)
    console.log("slotdata -------", slotData)
    console.log("selectVeh -------", selectVeh)
    const originalTime = slotData[slotData.length - 1].slot;
    const originalMoment = moment(originalTime, 'hh:mm A');
    const updatedMoment = originalMoment.add(30, 'minutes');
    const updatedTime = updatedMoment.format('hh:mm A');
    console.log(updatedTime);
    setActionSlotValue(slotData[0]?.slot)
    setActionSlotValue2(updatedTime)
    setTimeSlotModal(s => { return { ...s, show: false } })

    const timeIntervals = [...slotData];
    console.log("timeslot", timeIntervals)

    let totalMinutes = 0;

    for (let i = 0; i < timeIntervals.length - 1; i++) {
      const startTime = moment(timeIntervals[i].slot, 'h:mm A');
      const endTime = moment(timeIntervals[i + 1].slot, 'h:mm A');

      const duration = moment.duration(endTime.diff(startTime));
      totalMinutes += duration.asMinutes();
      console.log("totoalminute", totalMinutes)
    }

    const minutes = totalMinutes + 30;
    const duration = moment.duration(minutes, 'minutes');

    const hours = duration.hours();
    const totalmin = moment(duration).format("HH:mm:ss A")
    const minutesRemaining = duration.minutes();
    console.log("tottalhoiur" + hours + "  " + minutesRemaining + "  " + totalmin)
  }

  const fn_GetConsultantNameProspectMaster = () => {
    dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchCode": selectedBranch?.branchCode,
      "calledBy": "SALES_CONSULTANT",
      "entityCode": "",
      "title": "",
      "stateCode": "",
      "corpDealCategory": "",
      "dealType": "",
      "purchaseIntension": "",
      "prospectType": "",
      "importance": "",
      "financer": "",
      "drivenBy": "",
      "gender": "",
      "teams": "",
      "empId": "",
      "custType": "",
      "competitionModelSearch": "",
      "loginUserId": userData?.userId,
      "loginUserCompanyId": "ORBIT",
      "ipAddress": "1::1"
    }
    tokenApiCall(GetProspectMasterCallBack, APIName.GetProspectMaster, "POST", param)
  }

  const GetProspectMasterCallBack = async (res) => {
    console.log("search232323-", JSON.stringify(res?.result[0]?.prospectMasterList))
    if (res.statusCode === 200) {
      setConsultantList(res?.result[0]?.prospectMasterList)
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_SetComment=(d)=>{
    console.log("dd",d)
    setCommentValue(d)
  }

  const fn_Footer = () => {
    return (
      <>
      <View style={{
        backgroundColor: '#F9F9F9',
        borderWidth: 2, borderRadius: 10,
        borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(5),
        paddingBottom: constant.moderateScale(10), elevation: 1,
        marginTop: constant.moderateScale(10), marginHorizontal: constant.moderateScale(5)
      }}>
        <View style={styles.detailMainView}>
          <View style={[styles.driveListDetailSubView, {}]}>
            <Text style={styles.listText3}>New Action</Text>
            <View style={styles.horizontalLine} />
          </View>
        </View>
        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
          <SelectDropList
            list={actionType_Data}
            title={actionTypeValue?.description}
            buttonExt={styles.dropList}
            textExt={styles.dropListText}
            on_Select={(d) => setActionTypeValue(d)}
          />
        </View>
      {actionTypeValue?.code==='06' &&
        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
          <SelectDropList
            list={modelData}
            title={actionModelValue?.description}
            buttonExt={styles.dropList}
            textExt={styles.dropListText}
            on_Select={(d) => setActionModelValue(d)}
          />
        </View>
  }

        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Date<Text style={styles.text2}>*</Text></Text>
          <Pressable style={styles.calenderMainView} onPress={() => fn_CalenderClick()}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{actionDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
          </Pressable>
        </View>

        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Time</Text>
          <View style={styles.mobileSubView}>
            <SelectDropList
              list={[]}
              title={actionSlotValue}
              disable={true}
              buttonExt={styles.dropList}
              textExt={styles.timeDropListText}
            />
            <Text> </Text>
            <SelectDropList
              list={[]}
              title={actionSlotValue2}
              buttonExt={styles.dropList}
              textExt={styles.timeDropListText}
            />

          </View>
        </View>
        {actionTypeValue?.code==='06' &&
        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>VIN</Text>
          <TextInput placeholder='Type here' editable={false} style={styles.input1} >{vinData}</TextInput>
        </View>
  }
 {actionTypeValue?.code==='06' &&
        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Regn.<Text style={styles.text2}>*</Text></Text>
          <TextInput placeholder='Type here' editable={false} style={styles.input1} >{regData}</TextInput>
        </View>
  }

        <View style={[styles.detailMainView, { alignItems: 'flex-start' }]}>
          <Text style={[styles.detailText, { marginTop: '3%' }]}>Action Comment</Text>
          <TextInput placeholder='Enter Comment' multiline  onChangeText={fn_SetComment} style={styles.commentInput} >{comment}</TextInput>
        </View>

      </View>
      </>
    )
  }

  const fn_Create = () => {
    if (Object.keys(actionTypeValue).length === 0) {
        constant.showMsg("Please select action Type")
    } else if (actionDate === '') {
        constant.showMsg("Please select Action Date")
    }  else {
      console.log("selectVeh, slotData ---", actionSlotValue, actionSlotValue2)
      console.log("actionModelValue ---", actionModelValue)
      console.log("updateModalData ---", moment(new Date()).format("hh"))
      console.log("data ---", data)
      console.log("prospectData ---", prospectData)
      const slotTime = moment(allSlotList[slotCount-1]?.slot, 'HH:mm:ss A').format('HH:mm')
      console.log("actionDate ---", slotTime?.split(":"))
    const param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "prospectNo": Number(prospectData?.prospectId),
      "fy": prospectData?.prospectFY,//prospect data se
      "actionPerformed": updateModalData?.actionPerformed?.code,
      "actionComment": updateModalData?.actionComment,
      "salesperson": userData?.empCode,
      "currentAction": actionTypeValue?.code,//action type
      "actionDate": moment(actionDate, 'DD-MM-YYYY').format('DD-MMM-YYYY'),//date
      "actionCloseDate": updateModalData?.actionPerformedDate,//performed date from update
      "hour1": Number(moment(new Date()).format("hh")),//first slot hour
      "minutes1": Number(moment(new Date()).format("mm")),
      "hour2": Number(slotTime?.split(":")[0]),
      "minutes2": Number(slotTime?.split(":")[1]),
      "demoVehModel": actionTypeValue?.code ==='06' ? actionModelValue?.code : "",
      "demoVehVariant": actionTypeValue?.code ==='06' ? vehVariant : "",
      "demoVehChassisNo": actionTypeValue?.code ==='06' ? vinData : "",
      "projectDate": moment(prospectData?.projectedCloserDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY'),// project closure date
      "activeRate": prospectData?.prospectRating,// hot etc
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
      "nextRemark": comment,//"Test next Remark",//cmment
      "slotCount": slotCount,// no of slots
      "slotMins": slotTime,//total minutes of all slots in int
      "testDriveZone": "",
      "tagCode": "",
      "serial": 0,
      "orderFY": "",
      "orderNo": 0,//8371,
      "nextActionComment": comment,//"Test next Action Comment",//cmment
      "purchaseProbability": "",
      "branchCode": selectedBranch?.branchCode,
    }
    console.log("param", param)
    tokenApiCall(saveBasicInfoCallBack, APIName.SaveNewAndUpdateAction, "POST", param)

    }

  }

  const saveBasicInfoCallBack = (res) => {
    console.log("res", res)
    if (res.statusCode === 200) {
      dispatch(home_Refresh_Action(true))

      if(res?.result?.resultCode === "Y"){
        fn_Next()
        constant.showMsg("Data Saved Successfully.")
      }else{
        constant.showMsg("Error while data saving.");
      }
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }


  const fn_FeedBack = (item, index) => {
    // console.log("item",item)
    setFeedBackModal(s=>{return{...s,selectItem:item}})
    dispatch(emptyLoader_Action(true))
    const param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "branchCode": selectedBranch?.branchCode,
        "prospectNo": Number(item?.prospectId),
        "serial": 0,
        "loginUserCompanyId": userData?.userCompanyId,
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
    }
    tokenApiCall(GetTestDriveFeedbackDetailsCallBack, APIName.GetTestDriveFeedbackQuestions, "POST", param)

}

const GetTestDriveFeedbackDetailsCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
        let newData = res.result?.feedbackList.map((item) => {
            item["answer"] = {}
            return (item)
        })
        console.log("newDat", newData)
        setFeedBackModal(s=>{return{...s,show:true,data:newData}})
    } else {
        constant.showMsg(res.message)
    }
}

  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={{ flex: 1, backgroundColor: constant.whiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: constant.moderateScale(20) }}>

        <FlatList
          data={data}
          keyboardShouldPersistTaps={'always'}
          
          removeClippedSubviews={false}
          renderItem={({ item, index }) => renderItem(item, index)}
          // ListFooterComponent={() => fn_Footer()}
        />


      </View>
      <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

      {/* </ScrollView> */}
      <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
      />

      <UpdateActionModal
        isVisible={updateModal.show}
        data={updateModal.data}
        actionType_Data={actionType_Data}
        modelData={modelData}
        performData={perform_Data}
        onRequestClose={() => setUpdateModal(s => { return { ...s, show: false } })}
        onRequestSave={(param) => {
          setUpdateModalData(param)
          setUpdateModal(s => { return { ...s, show: false } })
          console.log("param = ", updateModalData)
        }}
      />

      <ProspectActionSlotScreen
        isVisible={timeSlotModal.show}
        onRequestClose={() => setTimeSlotModal(s => { return { ...s, show: false } })}
        date={timeSlotModal.date}
        vehicleList={timeSlotModal.vehicleList}
        slotList={timeSlotModal.slotList}
        VehicleClick={(item, index) => { fn_GetActionSlots(item, index) }}
        done_Click={(selectVeh, slotData) => { 
          console.log("selectVeh, slotData 1112121 -- ", selectVeh, slotData)
          fn_SlotDone(selectVeh, slotData) }}
      />
       <FeedBackModal
          isVisible={feedBackModal.show}
          QuestionList={feedBackModal?.data}
          data={feedBackModal.selectItem}
          consultantList={consultantList}
          onRequestClose={() => setFeedBackModal(s => { return { ...s, show: false } })}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  driveListDetailView: {
    flexDirection: "row",
  },
  driveListDetailSubView: {
    height: constant.moderateScale(30),
    width: '50%'
  },
  driveListDetailSubView2: {
    flex: 1,
    height: constant.moderateScale(30)
  },
  listText2: {
    fontSize: constant.moderateScale(10),
    color: '#434343',
    fontFamily: constant.typeRegular,
  },

  listText3: {
    fontSize: constant.moderateScale(12),
    color: '#434343',
    fontFamily: constant.typeMedium,
  },
  horizontalLine: {
    height: constant.moderateScale(2),
    width: constant.moderateScale(35),
    backgroundColor: constant.red,
    borderRadius: constant.moderateScale(100),
    marginTop: constant.moderateScale(3)
  },
  buttonView: {
    flex: 1,

    //  height:constant.moderateScale(30)

  },
  buttonView2: {
    flex: 0.2,
    //  height:constant.moderateScale(30)

  },
  updateButton: {
    width: constant.moderateScale(130),
    paddingVertical: constant.moderateScale(6)
  },
  feedbackButton: {
    width: constant.moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constant.red,
    // marginHorizontal:'5%',
    paddingTop: constant.moderateScale(6),
    paddingBottom: constant.moderateScale(3),
    borderRadius: 10,
    elevation: 2
  },
  updateIcn: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25)
  },


  detailMainView: {
    // paddingHorizontal:"3%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: constant.moderateScale(5)
  },
  detailText: {
    fontSize: constant.moderateScale(14),
    color: '#424242',
    width: constant.moderateScale(115),
    fontFamily: constant.typeLight
  },
  text2: {
    fontSize: constant.moderateScale(14),
    color: constant.red,
  },
  dropList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
  },
  dropListText: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  timeDropListText: {
    fontSize: constant.moderateScale(13),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  mobileSubView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input1: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(15)
  },
  searchButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchStyle: {
    height: constant.moderateScale(50),
    width: constant.moderateScale(50),
  },
  detailMainView2: {
    paddingHorizontal: "2%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: "2%"
  },
  bottomMainView: {
    backgroundColor: constant.whiteColor,
    marginHorizontal: '1%',
    borderRadius: 10,
    elevation: 1,
    marginTop: '3%',
    paddingBottom: '2%'
  },
  calenderStyle: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    marginRight: '2%'
  },
  calenderMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    paddingLeft: "3%",

  },
  calenderInput: {
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14)
  },
  proceedButton: {
    width: constant.moderateScale(135),
    alignSelf: 'center',
    marginTop: constant.resW(30),
    marginBottom: constant.resW(5)
  },
  proccedButtonText: {

  },
  dropNameList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    borderRadius: 8,
    width: constant.resW(17),
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    paddingHorizontal: 0
  },
  dropNameListText: {
    fontSize: constant.moderateScale(14),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  refInput: {
    height: constant.moderateScale(40),
    flex: 1,
    backgroundColor: constant.whiteColor,
    color: '#4AAA38',
    fontFamily: constant.typeMedium,
    fontSize: constant.moderateScale(15)
  },
  coutMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coutButton: {
    //   backgroundColor:constant.red,
    height: constant.moderateScale(40),
    width: constant.moderateScale(40),
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counttext: {
    fontFamily: constant.typeMedium,
    fontSize: constant.font34,
    color: constant.red,

  },
  countInput: {
    height: constant.moderateScale(35),
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: constant.whiteColor,
    width: constant.moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: constant.moderateScale(10),
    borderColor: constant.red
  },
  countInputText: {
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(15),
  },
  commentInput: {
    borderWidth: 1,
    height: constant.moderateScale(90),
    flex: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(14),
    textAlignVertical: 'top'
  },
  minusStyle: {
    height: constant.moderateScale(20),
    width: constant.moderateScale(20),
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