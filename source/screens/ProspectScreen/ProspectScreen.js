import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  StatusBar,
} from "react-native";
import * as constant from "../../utilities/constants";
import styles from "./ProspectStyle";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader";
import FastImage from "react-native-fast-image";
import images from "../../utilities/images";
import * as common_fn from "../../utilities/common_fn";
import { APIName, imageUrl, tokenApiCall } from "../../utilities/apiCaller";
import CommonHeader from "../../components/CommonHeader";
import SelectDropList from "../../components/SelectDropList";
import Button from "../../components/Button";
import CalenderModal from "../../components/CalenderModal";
import ProspectActionSlotScreen from "./ProspectActionSlotScreen";
import {
  emptyLoader_Action,
  home_Refresh_Action,
} from "../../redux/actions/AuthAction";
import moment from "moment";
import CustumerSearch from "../../components/CustumerSearch";

const data = [
  {
    key: 1,
    title: "Your Profile",
    source: images.profile,
    screenName: "HomeScreen",
  },
  {
    key: 2,
    title: "Help Center",
    source: images.info,
    screenName: "HomeScreen",
  },
  {
    key: 3,
    title: "Privacy Policy",
    source: images.lock,
    screenName: "HomeScreen",
  },
  { key: 4, title: "Logout", source: images.logout, screenName: "HomeScreen" },
];

export default function ProspectScreen(props) {
  const { navigation } = props;
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [count, setCount] = useState(1);
  const [calenderModalShow, setCalenderModalShow] = useState(false);
  const [actionCal_Modal, setActionCal_Modal] = useState(false);
  const [timeSlotModal, setTimeSlotModal] = useState({
    show: false,
    date: "",
    vehicleList: [],
    slotList: [],
    utcDateFormate: "",
  });
  const [stateData, setStateData] = useState([]);
  const [stateValue, setStateValue] = useState({});
  const [cityData, setCityData] = useState([]);
  const [cityValue, setCityValue] = useState({});
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState({});
  const [referenceData, setReferenceData] = useState([]);
  const [referenceValue, setReferenceValue] = useState({});
  const [sourceData, setSourceData] = useState([]);
  const [sourceValue, setSourceValue] = useState({});
  const [ratingData, setRatingData] = useState([]);
  const [ratingValue, setRatingValue] = useState({});
  const [usageData, setUsageData] = useState([]);
  const [usageValue, setUsageValue] = useState({});
  const [entityData, setEntityData] = useState([]);
  const [entityValue, setEntityValue] = useState({});
  const [mobileno, setMobileNo] = useState('7339506778')
  // const [mobileno, setMobileNo] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [generlCloserdata, setGeneralClosureData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const [modelData, setModalData] = useState([]);
  const [modelValue, setModelValue] = useState({});
  const [editionData, setEditionData] = useState([]);
  const [editionValue, setEditionValue] = useState({});
  const [assemblyData, setAssemblyData] = useState([]);
  const [assemblyValue, setAssemblyValue] = useState({});
  const [varientData, setvarientData] = useState([]);
  const [varientValue, setVarientValue] = useState({});
  const [styleData, setStyleData] = useState([]);
  const [styleValue, setStyleValue] = useState({});
  const [exteriorData, setExteriorData] = useState([]);
  const [exteriorValue, setExteriorValue] = useState({});
  const [inteiorData, setInteriorData] = useState([]);
  const [interiorValue, setInteriorValue] = useState({});
  const [my_Data, setMyData] = useState([]);
  const [my_DataValue, setMyDataValue] = useState({});
  const [vy_Data, setVyData] = useState([]);
  const [vy_DataValue, setVyDataValue] = useState({});

  const [actionData, setActionData] = useState("");
  const [custumerSearchModal, setCustumerSearchModal] = useState({
    show: false,
    data: [],
  });
  const [SaveDataObj, setSaveDataObj] = useState({});

  const [actionTypeData, SetActionTypeData] = useState([])
  const [actionTypeValue, setActionTypeValue] = useState({})
  const [actionModelData, setActionModelData] = useState([])
  const [actionModelValue, setActionModelValue] = useState({})
  const [actionDate, setActionDate] = useState('')
  const [actionSlotValue, setActionSlotValue] = useState(' ')
  const [actionSlotValue2, setActionSlotValue2] = useState(' ')
  const [vinData, setVinData] = useState('')
  const [regData, setRegData] = useState('')
  const [comment, setComment] = useState('')
  const [actionSlotLength,setActionSlotLength] = useState([])
  const [priceAvailable, setPriceAvailable] = useState("")
  const [eventSourceData, setEventSourceData] = useState();
  const [eventSourceList, setEventSourceList] = useState([]);

  // const [generlActive,setGeneralActive] =useState(false)
  const [vehicleActive,setVehicleActive] = useState(false)
  const [actionActive,setActionActive] = useState(false)

  useEffect(() => {
    console.log("selectBranchh", selectedBranch);
    fn_GetProspectMaster();
    // priceStatus()
    // fn_GetVehicleMasterModel()
    fn_GetEventSource()
  }, []);

  const fn_GetEventSource = () => {
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      sourceCode: "07",
      refCode: "07",
      campaign: "",
      prospectOpenedOn:  moment(new Date()).format("DD-MMM-YYYY"),
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      getEventSourceCallBack,
      APIName.GetCampaignsMaster,
      "POST",
      param
    );
  };

  const getEventSourceCallBack = (res) => {
    console.log("res GetCampaignsMaster =", res);
    if (res.statusCode === 200) {
      setEventSourceList(res?.result?.campaignsMaster);
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_GetProspectTagList = () => {
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      type: "E",
      value: "",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetProspectTagListCallBack,
      APIName.ProspectTagList,
      "POST",
      param
    );
  };

  const GetProspectTagListCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_GetProspectMaster = () => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      branchCode: selectedBranch?.branchCode,
      calledBy:
        "INTERNATIONAL_CALLING_CODE,ENTITY,TITLE,STATE,CITY,REFERENCE,SOURCE,RATING,USAGE,DEALCATEGORY,DEALTYPE,CORPORATE,PURCHASE_INTENTION,PROSPECT_CATEGORY,IMPORTANCE,FINANCER,DRIVEN_BY,GENDER,SALES_CONSULTANT,CUST_TYPE,COMPETITION_MODELS,CORRESPONDENCE_ADDRESS",
      entityCode: "",
      title: "",
      stateCode: "",
      corpDealCategory: "",
      dealType: "",
      purchaseIntension: "",
      prospectType: "",
      importance: "",
      financer: "",
      drivenBy: "",
      gender: "",
      teams: "",
      empId: "",
      custType: "",
      competitionModelSearch: "",
      loginUserId: userData?.userId,
      loginUserCompanyId: userData?.companyId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetProspectMasterCallBack,
      APIName.GetProspectMaster,
      "POST",
      param
    );
  };

  const GetProspectMasterCallBack = async (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      await res.result.map((item) => {
        if (item.listType === "ENTITY") {
          setEntityData(item.prospectMasterList);
        } else if (item.listType === "STATE") {
          setStateData(item.prospectMasterList);
        } else if (item.listType === "CITY") {
          // setCityData(item.prospectMasterList)
        } else if (item.listType === "REFERENCE") {
          setReferenceData(item.prospectMasterList);
        } else if (item.listType === "SOURCE") {
          setSourceData(item.prospectMasterList);
        } else if (item.listType === "RATING") {
          setRatingData(item.prospectMasterList);
        } else if (item.listType === "USAGE") {
          setUsageData(item.prospectMasterList);
        }
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_GetActionMasterList = () => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      calledBy: "FUP_TYPE",
      loginUserCompanyId: userData?.companyId,
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetActionMasterListCallBack,
      APIName.GetActionMaster,
      "POST",
      param
    );
  };

  const GetActionMasterListCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
      SetActionTypeData(res?.result[0]?.actionMasterList);
      setActive(3);
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_GetSearchCust = () => {
    if (mobileno === "") {
      constant.showMsg("Please enter mobile no");
    } else if (mobileno.length != 10) {
      constant.showMsg("Please enter valid mobile no");
    } else {
      dispatch(emptyLoader_Action(true));
      let param = {
        brandCode: userData?.brandCode,
        countryCode: userData?.countryCode,
        companyId: userData?.companyId,
        type: "M",
        value: mobileno,
        loginUserId: userData?.userId,
        ipAddress: "1::1",
      };
      tokenApiCall(
        getSearchCustCallBack,
        APIName.GetCustomerSearchResults,
        "POST",
        param
      );
    }
  };

  const getSearchCustCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
      if (res?.result?.pospectTagList.length > 0) {
        setCalenderModalShow({ show: true, data: res?.result?.pospectTagList });
      } else {
        constant.showMsg("Opps, Record not found");
      }
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_General_Validation = () => {
    if (mobileno === "") {
      constant.showMsg("Please enter mobile number");
    } else if (mobileno?.trim().length != 10) {
      constant.showMsg("Please enter valid mobile number");
    } else if (Object.keys(entityValue).length === 0) {
      constant.showMsg("Please Select Entity");
    } else if (entityValue?.code === "B" && contactPerson === "") {
      constant.showMsg("Please enter contact Person name");
    } else if (Object.keys(titleValue).length === 0) {
      constant.showMsg("Please select name title");
    } else if (name === "") {
      constant.showMsg("Please enter name");
    } else if (email === "") {
      constant.showMsg("Please enter email");
    } else if (!common_fn.validEmail(email?.trim())) {
      constant.showMsg("Please enter valid email");
    } else if (Object.keys(stateValue).length === 0) {
      constant.showMsg("Please select State");
    } else if (Object.keys(cityValue).length === 0) {
      constant.showMsg("Please select City");
    } else if (pinCode === "") {
      constant.showMsg("Please enter pin code");
    }else if (pinCode?.trim().length != 6) {
        constant.showMsg("Please enter valid pin code");
    } else if (Object.keys(sourceValue).length === 0) {
      constant.showMsg("Please select Source");
    } else if (Object.keys(referenceValue).length === 0) {
      constant.showMsg("Please select Reference");
    } else if (Object.keys(usageValue).length === 0) {
      constant.showMsg("Please select Usage");
    } else if (generlCloserdata === "") {
      constant.showMsg("Please select Closure Data");
    } else if (Object.keys(ratingValue).length === 0) {
      constant.showMsg("Please select Rating");
    } else {
      let newObj = {
        "title": titleValue.code,
        "entity": entityValue.code,
        "firstName": name,
        "middleName": "",
        "lastName": "",
        "suffix":"",
        "pincode": pinCode,
        "email": email,
       "contactName" : contactPerson,
        "mobile": mobileno,
        "source": sourceValue.code,
        "usage": usageValue.code,
        "activeRate": ratingValue.code,
        "regnState": stateValue.code,
        "regnCity": cityValue.code,
        "projectedClosureDate": generlCloserdata,
        "refFrom": referenceValue.code,
      }
      setSaveDataObj(newObj)
      setVehicleActive(true)
      fn_GetVehicleMasterModel()
    }
  };

  const fn_CreateProspect = () => {
    if (Object.keys(actionTypeValue).length === 0) {
      constant.showMsg("Please select Action Type");
    } else if (actionDate === "") {
      constant.showMsg("Please select Action Date");
    } else if (actionSlotValue === "") {
      constant.showMsg("Please select Action Slot");
    } else {
      dispatch(emptyLoader_Action(true));
      const timeIntervals = [...actionSlotLength];
      let totalTimeSlot = "";
      let totalMinutes = 0;
      let totalhours = "";
      for (let i = 0; i < timeIntervals.length - 1; i++) {
        const startTime = moment(timeIntervals[i].slot, "h:mm A");
        const endTime = moment(timeIntervals[i + 1].slot, "h:mm A");
        const duration = moment.duration(endTime.diff(startTime));
        totalMinutes += duration.asMinutes();
      }
      const minutes = totalMinutes + 30;
      const duration = moment.duration(minutes, "minutes");
      const hours =
        duration.hours() > 10 ? duration.hours() : "0" + duration.hours();
      const minutesRemaining =
        duration.minutes() > 10 ? duration.minutes() : "0" + duration.minutes();
      totalTimeSlot = hours + ":" + minutesRemaining + ":" + "00";

      const originalMoment = moment(actionSlotValue, "hh:mm A");
      totalhours = originalMoment.format("hh:mm:ss A");

      let param = {
        brandCode: userData?.brandCode,
        countryCode: userData?.countryCode,
        companyId: userData?.companyId,
        branchCode: selectedBranch?.branchCode,
        prospectLocation: selectedBranch?.branchCode,
        firstAction: actionTypeValue.code,
        actionDate: actionDate,
        actionComment: comment,
        campaign: eventSourceData === undefined ? 0 : Number(eventSourceData?.serial),
        dealerCompanyDocket: "",
        corporateFlag: "N",
        dealType: "",
        approveFlag: "",
        corporateComment: "",
        salesperson: userData?.empCode,
        hour: totalhours,
        demoVehModel: "",
        demoVehVariant: "",
        demoVehChassisNo: "",
        make: "",
        loginUserId: userData?.userId,
        ipAddress: "1::1",
        slotMins: totalTimeSlot,
        slotCount: actionSlotLength.length,
       
      };

      let newObj = Object.assign({}, SaveDataObj, param);
      fn_SaveNewProspect(newObj);
    }
  };

  const fn_SaveNewProspect = (newObj) => {
    console.log("newObj", JSON.stringify(newObj));

    tokenApiCall(
      SaveNewProspectCallBack,
      APIName.SaveNewProspect,
      "POST",
      newObj
    );
  };

  const SaveNewProspectCallBack = (res) => {
    console.log("saveProspect", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
      if (res.result?.resultCode === "Y") {
        dispatch(home_Refresh_Action(true));
        navigation.goBack();
      } else {
        constant.showMsg("Opps. Somethings wents wrong.");
      }
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_GetVehicleMasterModel = () => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      calledBy: "EDITION,ASSEMBLY,MODEL",
      edition: "",
      assembly: "",
      subModel: "",
      model: "",
      code: "",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetVehicleMasterModelCallBack,
      APIName.GetVehicleMaster,
      "POST",
      param
    );
  };

  const GetVehicleMasterModelCallBack = async (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      await res.result.map((item) => {
        if (item.listType === "MODEL") {
          setModalData(item.vehicleMaster);
        }
      });
      setActive(2);
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_TabClick = (type) => {
    if(type===1){
      setActive(type)
    }else if(type === 2) {
      vehicleActive ? setActive(type) : null
    }else if(type===3){
      actionActive ? setActive(type) : null

    }
    // setActive(type)
    // fn_GetActionMasterList()
  };

  const fn_VehicleValidation = () => {
    if (Object.keys(modelValue).length === 0) {
      constant.showMsg("Please Select Model");
    } else if (Object.keys(editionValue).length === 0) {
      constant.showMsg("Please Select Edition");
    } else if (Object.keys(varientValue).length === 0) {
      constant.showMsg("Please Select Variant");
    } else if (Object.keys(styleValue).length === 0) {
      constant.showMsg("Please Select Style");
    } else if (Object.keys(exteriorValue).length === 0) {
      constant.showMsg("Please Select Exterior");
    } else if (Object.keys(interiorValue).length === 0) {
      constant.showMsg("Please Select Interior");
    } else if (Object.keys(my_DataValue).length === 0) {
      constant.showMsg("Please Select My");
    } else if (Object.keys(vy_DataValue).length === 0) {
      constant.showMsg("Please Select VY");
    } else if (Object.keys(assemblyValue).length === 0) {
      constant.showMsg("Please Select Assembly");
    } else if (count <= 0) {
      constant.showMsg("Count must be greater than 0");
    } else {
      let newObj = {
        "my": Number(my_DataValue.code),
        "vy": Number(vy_DataValue.code),
        "model": modelValue.code,
        "qty": count,
        "color": exteriorValue.code,
        "interiorColor": interiorValue.code,
        "style": styleValue.code,
        "assembly": assemblyValue.code,
        "edition": editionValue.code,
        "subModel": varientValue?.code,
      }
      setSaveDataObj(Object.assign({}, SaveDataObj, newObj))
      setActionActive(true)
      fn_GetActionMasterList()
    }
  };

  const fn_DateSelect = (data) => {
    setRatingValue({})
    dispatch(emptyLoader_Action(true));
    setTimeout(() => {
      dispatch(emptyLoader_Action(false));
      setCalenderModalShow(false);
      setGeneralClosureData(moment(data.timestamp).format("DD-MMM-yyyy"));
    }, 1000);

    const date1 = moment(new Date()).format("YYYY-MM-DD");
    const date2 = moment(data.timestamp).format("YYYY-MM-DD")
   console.log("ratingData",ratingData)
    const differenceInDays = moment(date2).diff(moment(date1), 'days');
    if(differenceInDays<=10){
     setRatingValue( {"code": "HOT", "description": "Hot"})
    }else if(differenceInDays>10 && differenceInDays<30){
     setRatingValue({"code": "WARM", "description": "Warm"})
    }else{
     setRatingValue({"code": "NORMAL", "description": "Normal"})
    }
  };

  const fn_ActionDateSelect = (data) => {
    if(actionTypeValue==="06"){
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model");
    } else {
      const originalDate = moment(data.timestamp);
      const utcDate = originalDate.utc();
      const zoneData = utcDate.toISOString();
      setActionDate(moment(data.timestamp).format("DD-MMM-yyyy"));
      setTimeSlotModal((s) => {
        return { ...s, date: data, utcDateFormate: zoneData };
      });
      fn_GetDemoVehicleList();
    }
  }else{
    const originalDate = moment(data.timestamp);
    const utcDate = originalDate.utc();
    const zoneData = utcDate.toISOString();
    setActionDate(moment(data.timestamp).format("DD-MMM-yyyy"));
    setTimeSlotModal((s) => {
      return { ...s, date: data, utcDateFormate: zoneData };
    });
    fn_GetDemoVehicleList();
  }
  };

  const fn_GetDemoVehicleList = () => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      calledBy: "VEHICLE",
      model: actionModelValue.code!= undefined ? actionModelValue.code : "",
      loginUserCompanyId: userData?.companyId,
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetDemoVehicleListCallBack,
      APIName.GetDemoVehicleList,
      "POST",
      param
    );
  };

  const GetDemoVehicleListCallBack = async (res) => {
    console.log("searchvehi", JSON.stringify(res));
    if (res.statusCode === 200) {
      setActionCal_Modal(false);
      setTimeSlotModal((s) => {
        return { ...s, show: true, vehicleList: res?.result?.demoVehicleList };
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_GetActionSlots = (item, index) => {
    dispatch(emptyLoader_Action(true));
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchcode": selectedBranch?.branchCode,
      "calledBy": "TIME_SLOTS",
      "actionCode": "",
      "chassisNo": item?.chassisNo,
      "empCode": userData?.empCode,
      "date": timeSlotModal?.utcDateFormate,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetActionSlotsCallBack, APIName.GetActionSlots, "POST", param)
  }

  const GetActionSlotsCallBack = async (res) => {
    console.log("searchvehi", JSON.stringify(res));
    if (res.statusCode === 200) {
      let data = [];
      await res.result?.actionSlotList.map((item) => {
        item["Select"] = false;
        data.push(item);
      });
      setTimeSlotModal((s) => {
        return { ...s, slotList: data };
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_ModelSelect = (d) => {
    setModelValue(d);
    setEditionValue({})
    setVarientValue({})
    setStyleValue({})
    setExteriorValue({})
    setInteriorValue({})
    setMyDataValue({})
    setVyDataValue({})
    setAssemblyValue({})
    fn_GetVehicleModel(d);
  };

  const fn_GetVehicleModel = (d) => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      calledBy: "EDITION,ASSEMBLY,VARIANT,STYLE,MY,VY,EXT_COLOR,INT_COLOR",
      edition: "",
      assembly: "",
      subModel: "",
      model: d.code,
      code: "",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetVehicleMasterCallBack,
      APIName.GetVehicleMaster,
      "POST",
      param
    );
  };

  const GetVehicleMasterCallBack = async (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      await res.result.map((item) => {
        if (item.listType === "EDITION") {
          setEditionData(item.vehicleMaster);
        }  else if (item.listType === "VARIANT") {
          setvarientData(item.vehicleMaster);
        } 
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_CalenderClick = () => {
   if(actionTypeValue?.code ==="06"){
    if (Object.keys(actionModelValue).length === 0) {
      constant.showMsg("Please select Model");
    } else {
      setActionCal_Modal(true);
    }
  }else{
    setActionCal_Modal(true);
  }
  };

  const fn_SlotDone = (selectVeh, slotData) => {
   actionTypeValue?.code==='06' ? setVinData(selectVeh?.chassisNo): null;
  actionTypeValue?.code==='06' ? setRegData(selectVeh?.regn) : null;
    const originalTime = slotData[slotData.length - 1].slot;
    const originalMoment = moment(originalTime, "hh:mm A");
    const updatedMoment = originalMoment.add(30, "minutes");
    const updatedTime = updatedMoment.format("hh:mm A");
    console.log(updatedTime);
    setActionSlotLength(slotData);
    setActionSlotValue(slotData[0]?.slot);
    setActionSlotValue2(updatedTime);
    setTimeSlotModal((s) => {
      return { ...s, show: false };
    });
  };

  const priceStatus = () => {
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      prospectNo: 0,
      proformaId: 0,
      assembly: assemblyValue.code,
      edition: editionValue.code,
      model: modelValue.code,
      subModel: varientValue?.code,
      style: styleValue.code,
      my: Number(my_DataValue.code),
      vy: Number(vy_DataValue.code),
      exterior: exteriorValue.code,
      interior: interiorValue.code,
      calledBy: "VEH_PRICE",
      priceListApplicable: moment(new Date()).format("DD-MMM-YYYY"), //"23-APR-2024",
      billingLocation: selectedBranch?.branchCode,
      usage: "",
      saleGroup: "",
      endUse: "",
      vehiclePrice: 0,
      itemGroup: "",
      regnLocation: "",
      rtoCode: "",
      insuLocation: "",
      insuCode: "",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      priceStatusCallBack,
      APIName.GetProformaGeneralMast,
      "POST",
      param
    );
  };

  const priceStatusCallBack = (res) => {
    console.log("res123123123", res);
    if (res.statusCode === 200) {
      setPriceAvailable(res?.result?.priceAvailableTag);
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_State = (d) => {
    setStateValue(d)
    setCityValue({})
    dispatch(emptyLoader_Action(true))
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      branchCode: selectedBranch.branchCode,
      calledBy: "CITY,",
      entityCode: "",
      title: "",
      stateCode: d.code,
      corpDealCategory: "",
      dealType: "",
      purchaseIntension: "",
      prospectType: "",
      importance: "",
      financer: "",
      drivenBy: "",
      gender: "",
      teams: "",
      empId: "",
      custType: "",
      competitionModelSearch: "",
      loginUserId: userData?.userId,
      loginUserCompanyId: userData?.companyId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetStateProspectCallBack,
      APIName.GetProspectMaster,
      "POST",
      param
    );
  };

  const GetStateProspectCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      dispatch(emptyLoader_Action(false));
      setCityData(res?.result[0]?.prospectMasterList);
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_EntityClick=(d)=>{
    setEntityValue(d)
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      branchCode: selectedBranch?.branchCode,
      calledBy:
        "INTERNATIONAL_CALLING_CODE,ENTITY,TITLE,STATE,CITY,REFERENCE,SOURCE,RATING,USAGE,DEALCATEGORY,DEALTYPE,CORPORATE,PURCHASE_INTENTION,PROSPECT_CATEGORY,IMPORTANCE,FINANCER,DRIVEN_BY,GENDER,SALES_CONSULTANT,CUST_TYPE,COMPETITION_MODELS,CORRESPONDENCE_ADDRESS",
      entityCode:d.code,
      title: "",
      stateCode: "",
      corpDealCategory: "",
      dealType: "",
      purchaseIntension: "",
      prospectType: "",
      importance: "",
      financer: "",
      drivenBy: "",
      gender: "",
      teams: "",
      empId: "",
      custType: "",
      competitionModelSearch: "",
      loginUserId: userData?.userId,
      loginUserCompanyId: userData?.companyId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      EntityClickCallBack,
      APIName.GetProspectMaster,
      "POST",
      param
    );
  }


  const EntityClickCallBack = async (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      await res.result.map((item) => {
         if (item.listType === "TITLE") {
          setTitle(item.prospectMasterList);
        }
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };


  const fn_VarientSelect = (d) => {
    setVarientValue(d);
    setStyleValue({})
    setExteriorValue({})
    setInteriorValue({})
    setMyDataValue({})
    setVyDataValue({})
    setAssemblyValue({})
    fn_GetVehicleVarient(d);
  };

  const fn_GetVehicleVarient = (d) => {
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      calledBy: "EDITION,ASSEMBLY,VARIANT,STYLE,MY,VY,EXT_COLOR,INT_COLOR",
      edition: "",
      assembly: "",
      subModel: d?.code,
      model: modelValue?.code,
      code: "",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      GetVehicleVarientCallBack,
      APIName.GetVehicleMaster,
      "POST",
      param
    );
  };

  const GetVehicleVarientCallBack = async (res) => {
    console.log("search", JSON.stringify(res));
    if (res.statusCode === 200) {
      await res.result.map((item) => {
         if (item.listType === "VARIANT") {
          setvarientData(item.vehicleMaster);
        } else if (item.listType === "STYLE") {
          setStyleData(item.vehicleMaster);
        } else if (item.listType === "EXT_COLOR") {
          setExteriorData(item.vehicleMaster);
        } else if (item.listType === "INT_COLOR") {
          setInteriorData(item.vehicleMaster);
        } else if (item.listType === "VY") {
          setVyData(item.vehicleMaster);
        } else if (item.listType === "MY") {
          setMyData(item.vehicleMaster);
        }
      });
      dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1E1E1" }}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
      <CommonHeader
        title="Create Prospect"
        mainExt={styles.drawerStyle}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.mainTopView}>
        <View style={styles.tabMainView}>
          <View style={styles.tabSubView}>
            <Pressable
              style={active === 1 ? styles.tabButton : styles.tabButton2}
              onPress={() => fn_TabClick(1)}
            >
              <Text
                style={
                  active === 1 ? styles.tabButtonText : styles.tabButtonText2
                }
              >
                General
              </Text>
              {active === 1 && <View style={styles.horixontalLine} />}
            </Pressable>
            <Pressable
              style={active === 2 ? styles.tabButton : styles.tabButton2}
              onPress={() => fn_TabClick(2)}
            >
              <Text
                style={
                  active === 2 ? styles.tabButtonText : styles.tabButtonText2
                }
              >
                Vehicle
              </Text>
              {active === 2 && <View style={styles.horixontalLine} />}
            </Pressable>
            <Pressable
              style={
                active === 3
                  ? [styles.tabButton, { flex: 0.6 }]
                  : [styles.tabButton2, { flex: 0.6 }]
              }
              onPress={() => fn_TabClick(3)}
            >
              <Text
                style={
                  active === 3 ? styles.tabButtonText : styles.tabButtonText2
                }
              >
                Actions
              </Text>
              {active === 3 && <View style={styles.horixontalLine} />}
            </Pressable>
          </View>
        </View>
        {active === 1 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Mobile No.<Text style={styles.text2}>*</Text>
              </Text>
              <View style={styles.mobileSubView}>
                <TextInput style={styles.input1} maxLength={10} onChangeText={(d) => setMobileNo(d)} keyboardType='numeric'>{mobileno}</TextInput>
                <Pressable style={styles.searchButtonStyle} onPress={() => fn_GetSearchCust()}>
                  <FastImage source={images.search} resizeMode='contain' style={styles.searchStyle} />
                </Pressable>
              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Entity<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={entityData}
                title={entityValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => fn_EntityClick(d)}
              />
              {/* <TextInput style={styles.input1} keyboardType='numeric'>+91 8470068493</TextInput> */}
            </View>

            {entityValue?.code === "B" ? (
              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>
                  Contact Person<Text style={styles.text2}>*</Text>
                </Text>

                <TextInput
                  style={styles.input1}
                  onChangeText={(d) => setContactPerson(d)}
                >
                  {contactPerson}
                </TextInput>
              </View>
            ) : null}
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Name<Text style={styles.text2}>*</Text>
              </Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={title}
                  title={titleValue?.description=== undefined ? ' ' : titleValue?.description}
                  buttonExt={styles.dropNameList2}
                  textExt={styles.dropNameListText}
                  on_Select={(d) => setTitleValue(d)}
                />
                <TextInput
                  onChangeText={(d) => setName(d)}
                  style={[styles.input1, { marginLeft: "2%" }]}
                >
                  {name}
                </TextInput>
              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Email ID<Text style={styles.text2}>*</Text></Text>
              <TextInput
                onChangeText={(d) => setEmail(d)}
                style={styles.input1}
              >
                {email}
              </TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                State<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={stateData}
                title={stateValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => {
                  fn_State(d)
                  
                }}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                City<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={cityData}
                title={cityValue?.description}
                refType={Object.keys(cityValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setCityValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>PIN<Text style={styles.text2}>*</Text></Text>
              <TextInput
                style={styles.input1}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(d) => setPinCode(d)}
              >
                {pinCode}
              </TextInput>
            </View>

            <View style={styles.bottomMainView}>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Inquiry Type</Text>
                <SelectDropList
                  list={sourceData}
                  title= {sourceValue?.description}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => {
                    if(sourceValue?.code !== "07")  setEventSourceData(undefined)
                    setSourceValue(d)
                  }}
                />
              </View>
              {sourceValue?.code === "07" ? (
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}></Text>
                <SelectDropList
                  list={eventSourceList}
                  title="Select Campaign"
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setEventSourceData(d)}
                />
              </View>
              ) : null}

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Source</Text>
                <SelectDropList
                  list={referenceData}
                  title={referenceValue?.description}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setReferenceValue(d)}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Usage</Text>
                <SelectDropList
                  list={usageData}
                  title={usageValue?.description}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setUsageValue(d)}
                />
              </View>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Proj. Closure Date</Text>
                <Pressable
                  style={styles.calenderMainView}
                  onPress={() => setCalenderModalShow(true)}
                >
                  <TextInput
                    placeholder="Please Select"
                    editable={false}
                    style={styles.calenderInput}
                  >
                    {generlCloserdata}
                  </TextInput>
                  <FastImage
                    source={images.calender}
                    resizeMode="contain"
                    style={styles.calenderStyle}
                  />
                </Pressable>
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Rating</Text>
                <SelectDropList
                  list={ratingData}
                  title={ratingValue?.description}
                  buttonExt={styles.dropList}
                  disable={true}
                  refType={Object.keys(ratingValue).length===0 ?false : true}
                  textExt={styles.dropListText}
                  on_Select={(d) => setRatingValue(d)}
                />
              </View>
            </View>
            <Button
              title="Proceed"
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
              click_Action={() => fn_General_Validation()}
            />
          </ScrollView>
        )}

        {active === 2 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
              Demo Vehicle<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={modelData}
                title={modelValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => fn_ModelSelect(d)}
              />
            </View>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Edition<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={editionData}
                title={editionValue?.description}
                refType={Object.keys(editionValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setEditionValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Variant<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={varientData}
                title={varientValue?.description}
                refType={Object.keys(varientValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => fn_VarientSelect(d)}
              />
              {/* <TextInput style={styles.input1} >a.r@gmail.com</TextInput> */}
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Style<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={styleData}
                title={styleValue?.description}
                refType={Object.keys(styleValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setStyleValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Exterior<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={exteriorData}
                title={exteriorValue?.description}
                refType={Object.keys(exteriorValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setExteriorValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Internal<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={inteiorData}
                title={interiorValue?.description}
                refType={Object.keys(interiorValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setInteriorValue(d)}
              />
              {/* <TextInput style={styles.input1} >a.r@gmail.com</TextInput> */}
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>MY/VY<Text style={styles.text2}>*</Text></Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={my_Data}
                  title={my_DataValue?.description}
                  refType={Object.keys(my_DataValue).length===0 ?false : true}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setMyDataValue(d)}
                />
                <Text> </Text>
                <SelectDropList
                  list={vy_Data}
                  title={vy_DataValue?.description}
                  refType={Object.keys(vy_DataValue).length===0 ?false : true}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setVyDataValue(d)}
                />
              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Assembly Type<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={assemblyData}
                title={assemblyValue?.description}
                refType={Object.keys(assemblyValue).length===0 ?false : true}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => {
                  priceStatus();
                  setAssemblyValue(d);
                }}
              />
            </View>

            <View style={styles.bottomMainView}>
              {/* <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Fuel</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View> */}

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Price</Text>
                <TextInput style={styles.refInput} editable={false}>
                  {priceAvailable}
                </TextInput>
              </View>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Count</Text>
                <View style={styles.coutMainView}>
                  {/* <Pressable
                    style={styles.coutButton}
                    onPress={() => (count <= 1 ? null : setCount(count - 1))}
                  >
                    <FastImage
                      source={images.minussign}
                      tintColor={constant.red}
                      resizeMode="contain"
                      style={styles.minusStyle}
                    />
                  </Pressable> */}
                  <View style={styles.countInput}>
                    <Text style={styles.countInputText}>{count}</Text>
                  </View>

                  {/* <Pressable
                    style={styles.coutButton}
                    onPress={() => setCount(count + 1)}
                  > */}
                    {/* <FastImage
                      source={images.add}
                      tintColor={constant.red}
                      resizeMode="contain"
                      style={styles.minusStyle}
                    />
                  </Pressable> */}
                </View>
              </View>
            </View>
            <Button
              title="Proceed"
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
              click_Action={() => fn_VehicleValidation()}
            />
          </ScrollView>
        )}

        {active === 3 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Action Type<Text style={styles.text2}>*</Text>
              </Text>
              <SelectDropList
                list={actionTypeData}
                title={actionTypeValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setActionTypeValue(d)}
              />
            </View>

           { actionTypeValue?.code ==="06" &&  <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
              Demo vehicle<Text style={styles.text2}>*</Text>
              </Text>
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
              <Text style={styles.detailText}>
                Date<Text style={styles.text2}>*</Text>
              </Text>
              <Pressable
                style={styles.calenderMainView}
                onPress={() => fn_CalenderClick()}
              >
                <TextInput
                  placeholder="Please Select"
                  editable={false}
                  style={styles.calenderInput}
                >
                  {actionDate}
                </TextInput>
                <FastImage
                  source={images.calender}
                  resizeMode="contain"
                  style={styles.calenderStyle}
                />
              </Pressable>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Time</Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={[]}
                  disable={true}
                  title={actionSlotValue}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
                <Text> </Text>
                <SelectDropList
                  list={[]}
                  disable={true}
                  title={actionSlotValue2}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View>
            </View>

            { actionTypeValue?.code ==="06" && <View style={styles.detailMainView}>
              <Text style={styles.detailText}>VIN</Text>
              <TextInput
                placeholder="Type here"
                editable={false}
                style={styles.input1}
              >
                {vinData}
              </TextInput>
            </View>
}
{ actionTypeValue?.code ==="06" && 
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>
                Regn.<Text style={styles.text2}>*</Text>
              </Text>
              <TextInput
                placeholder="Type here"
                editable={false}
                style={styles.input1}
              >
                {regData}
              </TextInput>
            </View>
}

            <View style={[styles.detailMainView, { alignItems: "flex-start" }]}>
              <Text style={[styles.detailText, { marginTop: "3%" }]}>
                Action Comment
              </Text>
              <TextInput
                placeholder="Enter Comment"
                style={styles.commentInput}
              >
                {comment}
              </TextInput>
            </View>

            <Button
              title="Create Prospect"
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
              click_Action={() => fn_CreateProspect()}
            />
          </ScrollView>
        )}
      </View>

      <CalenderModal
        isVisible={calenderModalShow}
        onRequestClose={() => setCalenderModalShow(false)}
        onDateClick={(data) => fn_DateSelect(data)}
      />

      <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
      />

      <ProspectActionSlotScreen
        isVisible={timeSlotModal.show}
        onRequestClose={() =>
          setTimeSlotModal((s) => {
            return { ...s, show: false };
          })
        }
        date={timeSlotModal.date}
        vehicleList={timeSlotModal.vehicleList}
        slotList={timeSlotModal.slotList}
        VehicleClick={(item, index) => {
          fn_GetActionSlots(item, index);
        }}
        done_Click={(selectVeh, slotData) => {
          fn_SlotDone(selectVeh, slotData);
        }}
      />

      <CustumerSearch
        isVisible={calenderModalShow.show}
        onRequestClose={() =>
          setCalenderModalShow((s) => {
            return { ...s, show: false };
          })
        }
        data={calenderModalShow.data}
        mobile_Data={mobileno}
      />
    </SafeAreaView>
  );
}
