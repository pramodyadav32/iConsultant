import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import images from "../../utilities/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  userData_Action,
  emptyLoader_Action,
  home_Refresh_Action,
} from "../../redux/actions/AuthAction";
import { CommonActions } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
// import styles from './EditProspectStyle'
import Button from "../../components/Button";
import * as constant from "../../utilities/constants";
import * as common from "../../utilities/common_fn";
import {
  apiCall,
  APIName,
  tokenApiCall,
  businessOwnerCode,
  apiFormDataCall
} from "../../utilities/apiCaller";
import * as common_fn from "../../utilities/common_fn";
import SelectDropList from "../../components/SelectDropList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CalenderModal from "../../components/CalenderModal";
import CalenderModalNew from "../../components/CalenderModalNew";
import moment from "moment";
import ProspectActionSlotScreen from "../ProspectScreen/ProspectActionSlotScreen";
import UpdateActionModal from "../../components/UpdateActionModal";
import FeedBackModal from "../../components/FeedBackModal";
import ActionTodayScreen from "../ActionTodayScreen/ActionTodayScreen";
import DeviceInfo from "react-native-device-info";
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from "react-native-permissions";

const completeStatusData = [
  { code: "Y", title: "Yes", description: "Yes" },
  { code: "N", title: "No", description: "No" },
];

export default function LoadedTrialEditScreen(props) {
  const { fn_Next, tradeData, tradeMasterData, fuelData, cardData } = props;
  const dispatch = useDispatch();
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const [modelData, setModelData] = useState([]);
  const [modelValue, setModelValue] = useState({});

  const [actionCal_Modal, setActionCal_Modal] = useState(false)
  const [actionModelValue, setActionModelValue] = useState({})
  const [regData, setRegData] = useState('')
  const [actionDate, setActionDate] = useState('')
  const [timeSlotModal, setTimeSlotModal] = useState({ show: false, date: '', vehicleList: [], slotList: [], utcDateFormate: '' })


  const [brandData, setBrandData] = useState([]);
  const [brandValue, setBrandValue] = useState({});
  const [varientData, setVarientData] = useState([]);
  const [variantValue, setVariantValue] = useState({});
  const [fuel_Data, setFuel_Data] = useState([]);
  const [fuelValue, setFuelValue] = useState({});
  const [transData, setTransData] = useState([]);
  const [transValue, setTransValue] = useState({});
  const [regMonthData, setRegMonthData] = useState([]);
  const [regMonthValue, setRegMonthValue] = useState({});
  const [regYearData, setRegYearData] = useState([]);
  const [regYearValue, setRegYearValue] = useState({});
  const [ownerData, setOwnerData] = useState([]);
  const [ownerValue, setOwnerValue] = useState({});
  const [tradeCompData, setTradeCompData] = useState([]);
  const [tradeCompValue, setTradeCompValue] = useState({});
  //  const [insuCompData,setInsuCompData]= useState([])
  //  const [insuCompValue,setInsuCompValue] = useState({})
  const [chassisNo, setChassisNo] = useState("");
  const [engNo, setEngNo] = useState("");
  const [odoMeter, setOdoMeter] = useState("");
  const [regNo1, setRegNo1] = useState("");
  const [regNo2, setRegNo2] = useState("");
  const [active, setActive] = useState(3);
  const [insuExpiryDate, setInsuExpiryDate] = useState("");
  const [insuCompData, setInsuCompData] = useState([]);
  const [insuCompValue, setInsuCompValue] = useState({});
  const [fileName, setFileName] = useState("");
  const [calenderModalShow, setCalenderModalShow] = useState(false);
  const [fetchedPic, setFetchedPic] = useState({});

  const [actualPriceValue, setActualPriceValue] = useState("");
  const [expectedPriceValue, setExpectedPriceValue] = useState("");
  const [deviationPriceValue, setDeviationPriceValue] = useState("");

  useEffect(() => {
    // fn_Variant(modelValue)
  },[modelValue])

  useEffect(() => {
    setFuel_Data(fuelData);
    fuelData?.map((item) => {
      item?.code === tradeData?.vehFuelCode ? setFuelValue(item) : null;
    });
    tradeMasterData?.map((item) => {
      if (item?.listType === "MF_YEAR") {
        setRegYearData(item?.basicList);
        item?.basicList?.map((item) => {
          item?.code === tradeData?.vehRegnYear ? setRegYearValue(item) : null;
        });
      }
    });

    // if (tradeData?.carType === "A") {
    //   setActive(2);
    // } else if (tradeData?.carType === "R") {
    //   setActive(3);
    // } else {
    //   setActive(1);
    // }

    completeStatusData?.map((item) => {
      item?.code === tradeData?.tradeInCompletedYn
        ? setTradeCompValue(item)
        : null;
    });

    setChassisNo(tradeData?.chassisNo);
    setEngNo(tradeData?.engineNo);
    setRegNo1(tradeData?.vehRegn1);
    setRegNo2(tradeData?.vehRegn2);
    setOdoMeter(tradeData?.vehOdometer);
    setInsuExpiryDate(
      moment(tradeData?.insuExpiryDate, "DD-MMM-YYYY, hh:mm:ss A").format(
        "DD-MMM-YYYY"
      )
    );
    setActualPriceValue(tradeData?.recommendedPrice)
    setExpectedPriceValue(tradeData?.demandPrice)
    setDeviationPriceValue(Number(tradeData?.demandPrice) - Number(tradeData?.recommendedPrice))
  }, [tradeMasterData, tradeData]);


  const fn_Model = (d) => {
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      userId: userData?.userId,
      ipAddress: "1::1",
      CarBrandCode: d?.code,
      VehModel: "ALL",
    };
    tokenApiCall(ModelCallBack, APIName.GetModelList, "POST", param);
  };

  const ModelCallBack = (res) => {
    console.log("ModelCall", JSON.stringify(res?.result?.data))
    if (res.statusCode === 200) {
      setModelData(res?.result?.data);
      res?.result?.data?.map((item) => {
        if (item?.code === tradeData?.vehModelCode) {
          fn_Variant(item);
          setModelValue(item);
        }
      });
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_shouldBlankDataPass = () => {
    // if (active === 2 || active === 3) {
    //   return false;
    // } else {
      return false;
    // }
  };
  const fn_Validation = () => {
    // if (tradeData?.carType === "A" || tradeData?.carType === "R") {
      if (Object.keys(brandValue).length === 0) {
        constant.showMsg("Please select brand");
      // } else if (chassisNo === "") {
      //   constant.showMsg("Please enter chassisNo");
      } else if (Object.keys(modelValue).length === 0) {
        constant.showMsg("Please select Model");
      // } else if (Object.keys(variantValue).length === 0) {
      //   constant.showMsg("Please select variant");
      // } else if (engNo === "") {
      //   constant.showMsg("Please enter Engine No");
      // } else if (Object.keys(fuelValue).length === 0) {
      //   constant.showMsg("Please select Fuel");
      // } else if (Object.keys(transValue).length === 0) {
      //   constant.showMsg("Please select transmission");
      // } else if (engNo === "") {
      //   constant.showMsg("Please enter engine no");
      // } else if (Object.keys(regMonthValue).length === 0) {
      //   constant.showMsg("Please select Reg. Month");
      // } else if (Object.keys(regYearValue).length === 0) {
      //   constant.showMsg("Please select Reg. Year");
      // } else if (Object.keys(ownerValue).length === 0) {
      //   constant.showMsg("Please select Owner");
      // } else if (Object.keys(tradeCompValue).length === 0) {
      //   constant.showMsg("Please select Trade in Completed");
      } else {
        fn_Create();
      }
    // } else {
    //   fn_Create();
    // }
  };

  const fn_Create = () => {
    // console.log("aaaaaaaaaa ", variantValue, ownerValue);
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      userId: userData?.userId,
      ipAddress: "1::1",
      userCompanyId: userData?.userCompanyId,
      branchCode: selectedBranch?.branchCode,
      prospectID: Number(cardData?.prospectId),
      source: "",
      brand: fn_shouldBlankDataPass() ? "" : brandValue?.code,
      chassis: fn_shouldBlankDataPass() ? "" : chassisNo,
      model: fn_shouldBlankDataPass() ? "" : modelValue?.code,
      variantCode: fn_shouldBlankDataPass() ? "" : (Object.keys(variantValue).length === 0 ? "" : variantValue?.code),
      variantDesc: fn_shouldBlankDataPass() ? "" : (Object.keys(variantValue).length === 0 ? "" : variantValue?.description),
      engine: fn_shouldBlankDataPass() ? "" : engNo,
      vehRegn1: fn_shouldBlankDataPass() ? "" : regNo1,
      vehRegn2: fn_shouldBlankDataPass() ? 0 : Number(regNo2),
      fuel: fn_shouldBlankDataPass() ? "" : fuelValue?.code,
      transmission: fn_shouldBlankDataPass() ? "" : (Object.keys(transValue).length === 0 ? "" : transValue?.code),
      odometer: fn_shouldBlankDataPass() ? 0 : Number(odoMeter),
      mfdYear: fn_shouldBlankDataPass() ? 0 : 0,
      mfdMonth: fn_shouldBlankDataPass() ? 0 : 0,
      regnYear: fn_shouldBlankDataPass() ? 0 : Object.keys(regYearValue).length === 0 ? 0 : Number(regYearValue?.code),
      regnMonth: fn_shouldBlankDataPass() ? 0 : Object.keys(regMonthValue).length === 0 ? 0 : Number(regMonthValue?.code),
      ownerSerial: fn_shouldBlankDataPass() ? 0 : (Object.keys(variantValue).length === 0 ? 0 : Number(ownerValue?.code)),
      regnState: "",
      regnCity: "",
      evaluationDone: fn_shouldBlankDataPass() ? "N" : "Y",
      priceOffered: fn_shouldBlankDataPass() ? "N" : "N",
      tradeInCompleted: fn_shouldBlankDataPass() ? "" : tradeCompValue?.code,
      carType: active === 1 ? "F" : active === 2 ? "A" : "R",
      demandPrice: isNaN(Number(expectedPriceValue)) ? 0 : Number(expectedPriceValue),//expected price
      recommendedPrice: isNaN(Number(actualPriceValue)) ? 0 : Number(actualPriceValue),//deviation price
      insuCompanyCode: fn_shouldBlankDataPass() ? "" : insuCompValue?.code,
      insuExpiryDate: fn_shouldBlankDataPass() ? "" : insuExpiryDate === "Invalid date" ? "" : insuExpiryDate,
    };
    // console.log("param", param);
    tokenApiCall(
      saveBasicInfoCallBack,
      APIName.SaveProspectTradeIn,
      "POST",
      param
    );
  };

  const saveBasicInfoCallBack = (res) => {
    console.log("res", res);
    if (res.statusCode === 200) {
      if (res?.result?.resultCode === "Y") {
        if (tradeData?.carType === "R" && Object.keys(fetchedPic).length !== 0) {
          fn_uploadDocSave(fetchedPic, res?.result?.uniueSerial);
        } else {
          fn_Next();
          constant.showMsg("Data Saved Successfully.");
        }
      } else {
        constant.showMsg("Error while data saving.");
      }
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_uploadDocSave = async (pic, uniquesNumber) => {
    dispatch(emptyLoader_Action(true));
    let newPic = {
      name: "MyImage_" + uniquesNumber + ".jpg",
      type: pic.mime,
      size: pic.size,
      uri: Platform.OS === "ios" ? pic?.path.replace("file://", "") : pic?.path,
    };

    try {
      var formdata = new FormData();
      formdata.append("businessOwnerCode", businessOwnerCode);
      formdata.append("brandCode", userData.brandCode);
      formdata.append("countryCode", userData.countryCode);
      formdata.append("companyId", userData.companyId);
      formdata.append("docLocation", selectedBranch?.branchCode);
      formdata.append("docModuleCode", "UC");
      formdata.append("docSubModuleCode", "VEH_DOC");
      formdata.append("docGroup", "INSURANCE");
      formdata.append("docCode", "INSURANCE");
      formdata.append("docKeyType", "UC_UNIQUE_SERIAL");
      formdata.append("docKeyValue", uniquesNumber);
      formdata.append("fileExtn", ".png"); //pic.size
      formdata.append("fileTitle", "MyImage_" + uniquesNumber + ".jpg");
      formdata.append("fileText", "MyImage_" + uniquesNumber + ".jpg");
      formdata.append("fileGroup", "Y");
      formdata.append("fileSize", pic.size);
      formdata.append("fileName", "MyImage_" + uniquesNumber + ".jpg");
      formdata.append("userId", userData?.userId);
      formdata.append("ipAddress", "1::1");
      formdata.append("fileExtensionAllowed", "Y");
      formdata.append("fileSizeLimitKb", 50000);
      formdata.append("environmentType", "DEMO");
      formdata.append("image1", newPic);
    } catch (error) {
      console.error("Error:", error);
      dispatch(emptyLoader_Action(false));
    }
    apiFormDataCall(
      wacsSave_Callback,
      APIName.UploadVehDocument,
      "POST",
      formdata,
      pic.size
    );
  };

  const wacsSave_Callback = (res) => {
    console.log(JSON.stringify(res));

    if (res.statusCode === 200) {
      if (res?.result?.status === "Y") {
        fn_Next();
        constant.showMsg("Data Saved Successfully.");
      } else {
        dispatch(emptyLoader_Action(false));
      }
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg("Somethings wents wrong");
    }
  };

  const fn_ActiveButton = (type, data) => {
    setActive(type);
  };

  const fn_DateSelect = (data) => {
    dispatch(emptyLoader_Action(true));
    setTimeout(() => {
      dispatch(emptyLoader_Action(false));
      setCalenderModalShow(false);
      setInsuExpiryDate(moment(data.timestamp).format("DD-MMM-yyyy"));
    }, 1000);
  };

  const fn_GetActionSlots = (item, index) => {
    dispatch(emptyLoader_Action(true))
    console.log("iiiiiiitem = ")
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchcode": selectedBranch?.branchCode,
      "calledBy": "TIME_SLOTS",
      // "actionCode": actionTypeValue?.code,
      "chassisNo": item?.chassisNo === undefined ? "" : item?.chassisNo,
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
      setTimeSlotModal(s => { return { ...s, slotList: [...data] } })
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      // constant.showMsg(res.message)
    }
  }

  const fn_SlotDone = (selectVeh, slotData) => {
    // actionTypeValue?.code === '06' ? setVinData(selectVeh?.chassisNo) : null
    // setVehVariant(selectVeh?.variant)
    // actionTypeValue?.code === '06' ? setRegData(selectVeh?.regn) : null
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

  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={[{ flex: 1, backgroundColor: constant.whiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: constant.moderateScale(20) }, styles.shadowPropCard]}>

      <View style={{
          backgroundColor: '#F9F9F9',
          borderWidth: 2, borderRadius: 10,
          borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(5),
          paddingBottom: constant.moderateScale(10), elevation: 1,
          marginTop: constant.moderateScale(10), marginHorizontal: constant.moderateScale(5)
        }}>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={modelData}
              title={modelValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setModelValue(d)}
            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Regn.<Text style={styles.text2}>*</Text></Text>
            <TextInput placeholder='Type here' editable={false} style={[styles.input1, styles.shadowProp2]} >{regData}</TextInput>
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Size of Load body<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={modelData}
              title={modelValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setModelValue(d)}
            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Start Date<Text style={styles.text2}>*</Text></Text>
            <Pressable style={[styles.calenderMainView, styles.shadowProp2]} onPress={() => fn_CalenderClick()}>
              <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{actionDate}</TextInput>
              <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
            </Pressable>
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>End Date<Text style={styles.text2}>*</Text></Text>
            <Pressable style={[styles.calenderMainView, styles.shadowProp2]} onPress={() => fn_CalenderClick()}>
              <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{actionDate}</TextInput>
              <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
            </Pressable>
          </View>

        </View>

      </View>
      <Button title='Save' click_Action={() => fn_Create()} buttonExt={[styles.performaButton, styles.shadowPropButton]} />

      {/* </ScrollView> */}
      <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
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
          fn_SlotDone(selectVeh, slotData)
        }}
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
    backgroundColor: constant.whiteColor,
    // paddingLeft: "3%",

  },
  calenderInput: {
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
    paddingLeft: constant.moderateScale(15)
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
  shadowPropCard: {
    shadowColor: '#000000',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5
  },
  shadowProp2: {
    shadowColor: '#ABABAB',
    borderRadius: 10,
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.8,
    elevation: 5
  },
  shadowPropButton: {
    shadowColor: constant.red,
    borderRadius: 10,
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.8,
    elevation: 5
  }
});
