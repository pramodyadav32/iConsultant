import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
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
import ProspectActionSlotScreen from '../ProspectScreen/ProspectActionSlotScreen';
import UpdateActionModal from '../../components/UpdateActionModal';
import FeedBackModal from '../../components/FeedBackModal';
import ActionTodayScreen from '../ActionTodayScreen/ActionTodayScreen';

export default function ActionInfo(props) {
  const { cardClick, updateClick, data, actionType_Data, modelData,perform_Data } = props
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
  const [regData, setRegData] = useState('')
  const [comment, setComment] = useState('')
  const [updateModal, setUpdateModal] = useState({ show: false, data: {} })
  const [timeSlotModal, setTimeSlotModal] = useState({ show: false, date: '', vehicleList: [], slotList: [], utcDateFormate: '' })
  const [feedBackModal, setFeedBackModal] = useState({ show: false, data: [],selectItem:{} })

 

  const renderItem = (item, index) => {
    return (
      <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(5), marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={[styles.driveListDetailSubView, {}]}>
            <Text style={styles.listText3}>Active Action</Text>
            <View style={styles.horizontalLine} />
          </View>

        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={[styles.driveListDetailSubView, {}]}>
            <Text style={styles.listText2}>Action</Text>
            <Text style={styles.listText3}>{item?.actionDescription}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Due on </Text>
            <Text style={styles.listText3}>{item?.dueOn}</Text>
          </View>
        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={styles.driveListDetailSubView}>
            <Text style={styles.listText2}>Stutus</Text>
            <Text style={styles.listText3}>{item?.statusDesc}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Completed on</Text>
            <Text style={styles.listText3}>{item?.performedOn}</Text>
          </View>
        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
          <View style={styles.driveListDetailSubView}>
            <Text style={styles.listText2}>Remarks</Text>
            <Text style={styles.listText3}>{item?.remark}</Text>
          </View>
          <View style={styles.driveListDetailSubView2}>
            <Text style={styles.listText2}>Projected Closure Data</Text>
            <Text style={styles.listText3}>{item?.projectedCloserDate}</Text>
          </View>
        </View>

        <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
          <View style={[styles.buttonView2, { flex: 0.45 }]}>

          </View>
          <View style={[styles.buttonView, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
            <Button title='Update'
              buttonExt={styles.updateButton}
              click_Action={() => fn_UpdateClick(item, index)}
            />
            <Pressable style={styles.feedbackButton} onPress={() => fn_FeedBack(item, index)}>
              <FastImage resizeMode='contain' source={images.feedBackIcon} style={styles.updateIcn} />
            </Pressable>
            {/* <Button title='Update'
            buttonExt={styles.updateButton}
            click_Action={()=>feedBackClick(item,index)}
           /> */}
          </View>
        </View>



      </View>
    )
  }

 const fn_UpdateClick=(item,index)=>{
   setUpdateModal({show:true,data:item})
 }

  const fn_CalenderClick = () => {
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model")
    } else {
      setActionCal_Modal(true)
    }
  }
  const fn_ActionDateSelect = (data) => {
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model")
    } else {
      const originalDate = moment(data.timestamp);
      const utcDate = originalDate.utc();
      const zoneData = utcDate.toISOString()
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
      "model": actionModelValue.code,
      "loginUserCompanyId": "ORBIT",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetDemoVehicleListCallBack, APIName.GetDemoVehicleList, "POST", param)
  }

  const GetDemoVehicleListCallBack = async (res) => {
    console.log("searchvehi", JSON.stringify(res))
    if (res.statusCode === 200) {
      setActionCal_Modal(false)
      // if(res?.result?.demoVehicleList.length>0){
      //   fn_GetActionSlots(res?.result?.demoVehicleList[0],0)
      // }
      setTimeSlotModal(s => { return { ...s, show: true, vehicleList: res?.result?.demoVehicleList } })
      dispatch(emptyLoader_Action(false))

    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_GetActionSlots = (item, index) => {
    dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchcode": selectedBranch?.branchCode,
      "calledBy": "TIME_SLOTS",
      "actionCode": "",
      "chassisNo": item.chassisNo,
      "empCode": "",
      "date": timeSlotModal?.utcDateFormate,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    console.log("aabb",param)
    tokenApiCall(GetActionSlotsCallBack, APIName.GetActionSlots, "POST", param)
  }

  const GetActionSlotsCallBack = async (res) => {
    console.log("searchvehi", JSON.stringify(res))
    if (res.statusCode === 200) {
      let data = []
      await res.result?.actionSlotList.map((item) => {
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
    setVinData(selectVeh?.chassisNo)
    setRegData(selectVeh?.regn)
    console.log("slotdata", slotData)
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

  const fn_Footer = () => {
    return (
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

        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>VIN</Text>
          <TextInput placeholder='Type here' editable={false} style={styles.input1} >{vinData}</TextInput>
        </View>

        <View style={styles.detailMainView}>
          <Text style={styles.detailText}>Regn.<Text style={styles.text2}>*</Text></Text>
          <TextInput placeholder='Type here' editable={false} style={styles.input1} >{regData}</TextInput>
        </View>

        <View style={[styles.detailMainView, { alignItems: 'flex-start' }]}>
          <Text style={[styles.detailText, { marginTop: '3%' }]}>Action Comment</Text>
          <TextInput placeholder='Enter Comment' onChangeText={(d) => setComment(d)} style={styles.commentInput} >{comment}</TextInput>
        </View>

      </View>
    )
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
      // "prospectLocation": selectedBranch.brandCode,
      "prospectNo": Number(data?.prospectID),

      "fy": "2023-2024",
      "actionPerformed": "Test",
      "actionComment": "action Comment",
      "salesperson": "string",
      "currentAction": "string",
      "actionDate": "09-Mar-2024",
      "actionCloseDate": "25-Mar-2024",
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
          keyboardShouldPersistTaps={'handled'}
          renderItem={({ item, index }) => renderItem(item, index)}
          ListFooterComponent={() => fn_Footer()}
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
      />

      <ProspectActionSlotScreen
        isVisible={timeSlotModal.show}
        onRequestClose={() => setTimeSlotModal(s => { return { ...s, show: false } })}
        date={timeSlotModal.date}
        vehicleList={timeSlotModal.vehicleList}
        slotList={timeSlotModal.slotList}
        VehicleClick={(item, index) => { fn_GetActionSlots(item, index) }}
        done_Click={(selectVeh, slotData) => { fn_SlotDone(selectVeh, slotData) }}
      />
       <FeedBackModal
                isVisible={feedBackModal.show}
                QuestionList={feedBackModal?.data}
                data={feedBackModal.selectItem}
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