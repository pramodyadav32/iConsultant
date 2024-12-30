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
  apiFormDataCall,
  imageUrl
} from "../../utilities/apiCaller";
import * as common_fn from "../../utilities/common_fn";
import SelectDropList from "../../components/SelectDropList";
import CalenderModalNew from "../../components/CalenderModalNew";
import moment from "moment";

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

export default function PlanEditScreen(props) {
  const { fn_Next, tradeData, tradeMasterData, fuelData, cardData } = props;
  const dispatch = useDispatch();
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const [modelData, setModelData] = useState([]);
  const [modelValue, setModelValue] = useState({});
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
    fn_Variant(modelValue)
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
      } else if (item?.listType === "MONTH") {
        setRegMonthData(item?.basicList);
        item?.basicList?.map((item) => {
          item?.code === tradeData?.vehRegnMonth
            ? setRegMonthValue(item)
            : null;
        });
      } else if (item?.listType === "OWNER_SERIAL") {
        setOwnerData(item?.basicList);
        item?.basicList?.map((item) => {
          item?.code === tradeData?.vehOwnerSerial ? setOwnerValue(item) : null;
        });
      } else if (item?.listType === "BRAND") {
        setBrandData(item?.basicList);
        item?.basicList?.map((item) => {
          if (item?.code === tradeData?.vehBrandCode) {
            setBrandValue(item);
            fn_Model(item);
          }
        });
      } else if (item?.listType === "TRANSMISSION") {
        setTransData(item?.basicList);
        item?.basicList?.map((item) => {
          console.log("aaaaaaa", item?.code, tradeData?.vehTransmission);
          item?.code === tradeData?.vehTransmission
            ? setTransValue(item)
            : null;
        });
      } else if (item?.listType === "INSU_COMPANY") {
        setInsuCompData(item?.basicList);
        item?.basicList?.map((item) => {
          item?.code === tradeData?.insuCompanyCode
            ? setInsuCompValue(item)
            : null;
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

  const fn_ResetOtherDropdown = () => {
    setModelValue({});
    setModelData([]);
    setVariantValue({});
    setFuelValue({});
    setTransValue({});
    setRegMonthValue({});
    setRegYearValue({});
    setOwnerValue({});
    setTradeCompValue({});
  };

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

  const fn_Variant = (d) => {
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      userId: userData?.userId,
      ipAddress: "1::1",
      calledby: "VARIANT",
      leadsourcecode: "",
      leadtype: "",
      vehmake: brandValue?.code,
      vehmodel: d?.code,
      vehvariant: "",
      manufactureyear: "",
      fueltype: "",
      title: "",
      statecode: "",
      citycode: "",
      ownerserial: "",
      extcolor: "",
      seatingcapacity: "",
      accedentalstatus: "",
      ownermanual: "",
      hypothecationcode: "",
      ncbPerc: "",
      monthvalue: "",
      insucompanycode: "",
      odType: "",
      transmissioncode: "",
      insutype: "",
      aggregator: "",
      vehCategory: "",
      rtoCode: "",
      refFrom: "",
      sourcecode: "",
      rating: "",
      usagecode: "",
      customerbudget: "",
      vehage: "",
      vehkmRange: "",
      odometertype: "",
      segmentCode: "",
    };
    tokenApiCall(
      VariantCallBack,
      APIName.GetUsedCarGeneralMaster,
      "POST",
      param
    );
  };

  const VariantCallBack = (res) => {
    console.log("aaaaaaa VariantCallBack", JSON.stringify(res));
    if (res.statusCode === 200) {
      res?.result?.selectMasterList?.map((item) => {
        if (item?.listType === "VARIANT") {
          setVarientData(item?.basicList);
          item?.basicList?.map((item) => {
            item?.code === tradeData?.vehVariantCode
              ? setVariantValue(item)
              : null;
          });
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


  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      <View style={{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:constant.whiteColor,
        paddingHorizontal:constant.moderateScale(10)
        }}>
        <Pressable style={{
          backgroundColor:constant.baseColor,
          height:constant.moderateScale(35),
          paddingHorizontal:constant.moderateScale(35),
          borderRadius:5,
          marginTop:constant.moderateScale(3),
          alignItems:'center',
          justifyContent:'center',
          borderWidth:1,
          borderColor:constant.whiteColor,
          elevation:2
        }} >
          <Text style={{
            fontFamily:constant.typeRegular,
            fontSize:constant.font15,
            color:constant.whiteColor,
          }}>Route1</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor:constant.baseColor,
          height:constant.moderateScale(35),
          paddingHorizontal:constant.moderateScale(10),
          borderRadius:5,
          marginTop:constant.moderateScale(3),
           alignItems:'center',
          justifyContent:'center',
          marginLeft:constant.moderateScale(5),
          borderWidth:1,
          borderColor:constant.whiteColor,
          elevation:2
        }} >
         <FastImage source={images.add} tintColor={constant.whiteColor} resizeMode="contain" style={{
          height:constant.moderateScale(20),
          width:constant.moderateScale(20)
         }} />
        </Pressable>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: constant.whiteColor,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingBottom: constant.moderateScale(20),
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: constant.whiteColor,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: constant.whiteColor,
              paddingHorizontal: constant.moderateScale(5),
              paddingBottom: constant.moderateScale(10),
              marginTop: constant.moderateScale(10),
              marginHorizontal: constant.moderateScale(5),
            }}
            >
          


<View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Route Name</Text>
                <TextInput
                  placeholder="Enter here"
                  onChangeText={(d) => setOdoMeter(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {odoMeter}
                </TextInput>
              </View>
            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Location from</Text>
              <SelectDropList
                list={brandData}
                title={brandValue?.description}
                buttonExt={styles.dropList}
                disable={active === 1 ? true : false}
                textExt={styles.dropListText}
                on_Select={(d) => {
                  setBrandValue(d);
                  fn_ResetOtherDropdown();
                  fn_Model(d);
                }}
              />
            </View>

           
              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}></Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>
            

            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Location to</Text>
              <SelectDropList
                list={modelData}
                disable={active === 1 ? true : false}
                title={modelValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => {
                  setModelValue(d);
                  fn_Variant(d);
                }}
              />
            </View>
            <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}></Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Distance per trip</Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Trips/Day</Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Monthly Run (Kms)</Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Payload – Onward</Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Payload – Return</Text>
                <TextInput
                  placeholder="Please Enter"
                  maxLength={17}
                  onChangeText={(d) => setChassisNo(d)}
                  editable={active === 1 ? false : true}
                  style={styles.input1}
                >
                  {chassisNo}
                </TextInput>
              </View>


            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Trip Start Time</Text>
              <Pressable
                style={styles.calenderMainView}
                onPress={() => setCalenderModalShow(true)}
              >
                <TextInput
                  placeholder="Please Select"
                  editable={false}
                  style={styles.calenderInput}
                >
                  {insuExpiryDate}
                </TextInput>
                <FastImage
                  source={images.calender}
                  resizeMode="contain"
                  style={styles.calenderStyle}
                />
              </Pressable>
            </View>

            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Trip End Time</Text>
              <Pressable
                style={styles.calenderMainView}
                onPress={() => setCalenderModalShow(true)}
              >
                <TextInput
                  placeholder="Please Select"
                  editable={false}
                  style={styles.calenderInput}
                >
                  {insuExpiryDate}
                </TextInput>
                <FastImage
                  source={images.calender}
                  resizeMode="contain"
                  style={styles.calenderStyle}
                />
              </Pressable>
            </View>

          
              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Vol. Capacity Utilized</Text>
                <TextInput
                  placeholder="Enter here"
                  onChangeText={(d) => {
                    setDeviationPriceValue(Number(expectedPriceValue) - Number(d))
                    setActualPriceValue(d)
                  }}
                  editable={active === 1 ? false : true}
                  keyboardType="numeric"
                  style={styles.input1}
                >
                  {actualPriceValue}
                </TextInput>
              </View>
      
            
              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Fuel Type</Text>
                <TextInput
                  placeholder="Enter here"
                  onChangeText={(d) => {
                    setDeviationPriceValue(Number(d) - Number(actualPriceValue))
                    setExpectedPriceValue(d)
                  }}
                  editable={active === 1 ? false : true}
                  keyboardType="numeric"
                  style={styles.input1}
                >
                  {expectedPriceValue}
                </TextInput>
              </View>
          

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Avg Range</Text>
                <TextInput
                  placeholder="Please Enter"
                  onChangeText={(d) => setDeviationPriceValue(d)}
                  editable={false}
                  style={styles.input1}
                >
                  {/* {deviationPriceValue} */}
                </TextInput>
              </View>
          
              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Veh Parking Location</Text>
                <TextInput
                  placeholder="Please Enter"
                  onChangeText={(d) => setDeviationPriceValue(d)}
                  editable={false}
                  style={styles.input1}
                >
                  {/* {deviationPriceValue} */}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Mntnc. Cost (Rs./km)</Text>
                <TextInput
                  placeholder="Please Enter"
                  onChangeText={(d) => setDeviationPriceValue(d)}
                  // editable={false}
                  style={styles.input1}
                >
                  {/* {deviationPriceValue} */}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { opacity: active === 1 ? 0.4 : 1 },
                ]}
              >
                <Text style={styles.detailText}>Working days in month</Text>
                <TextInput
                  placeholder="Please Enter"
                  onChangeText={(d) => setDeviationPriceValue(d)}
                  // editable={false}
                  style={styles.input1}
                >
                  {/* {deviationPriceValue} */}
                </TextInput>
              </View>
<View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Segment</Text>
              <SelectDropList
                list={completeStatusData}
                disable={active === 1 ? true : false}
                title={tradeCompValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setTradeCompValue(d)}
              />
            </View>

            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Application</Text>
              <SelectDropList
                list={completeStatusData}
                disable={active === 1 ? true : false}
                title={tradeCompValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setTradeCompValue(d)}
              />
            </View>

            <View
              style={[
                styles.detailMainView,
                { opacity: active === 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.detailText}>Client</Text>
              <SelectDropList
                list={completeStatusData}
                disable={active === 1 ? true : false}
                title={tradeCompValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setTradeCompValue(d)}
              />
            </View>

            
          </View>
        </View>
        <Button
          title="Save"
          click_Action={() => fn_Validation()}
          buttonExt={styles.performaButton}
        />
      </ScrollView>
      <CalenderModalNew
        isVisible={calenderModalShow}
        onRequestClose={() => setCalenderModalShow(false)}
        onDateClick={(data) => fn_DateSelect(data)}
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
    width: "50%",
  },
  driveListDetailSubView2: {
    flex: 1,
    height: constant.moderateScale(30),
  },
  listText2: {
    fontSize: constant.moderateScale(10),
    color: "#434343",
    fontFamily: constant.typeRegular,
  },

  listText3: {
    fontSize: constant.moderateScale(12),
    color: "#434343",
    fontFamily: constant.typeMedium,
  },
  horizontalLine: {
    height: constant.moderateScale(2),
    width: constant.moderateScale(35),
    backgroundColor: constant.baseColor,
    borderRadius: constant.moderateScale(100),
    marginTop: constant.moderateScale(3),
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
    paddingVertical: constant.moderateScale(6),
  },
  feedbackButton: {
    width: constant.moderateScale(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constant.baseColor,
    // marginHorizontal:'5%',
    paddingTop: constant.moderateScale(6),
    paddingBottom: constant.moderateScale(3),
    borderRadius: 10,
    elevation: 2,
  },
  updateIcn: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
  },

  detailMainView: {
    // paddingHorizontal:"3%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: constant.moderateScale(5),
  },
  detailText: {
    fontSize: constant.moderateScale(14),
    color: "#424242",
    width: constant.moderateScale(115),
    fontFamily: constant.typeLight,
  },
  text2: {
    fontSize: constant.moderateScale(14),
    color: constant.red,
  },
  dropList: {
    borderBottomWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    // borderRadius: 10,
    // borderColor: constant.baseColor,
    // backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingLeft: "2%",
    paddingRight: "0.5%",
    borderWidth:1,
    borderColor:constant.textColor
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
    flexDirection: "row",
    alignItems: "center",
  },
  input1: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: constant.textColor,
    backgroundColor: "transparent",
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(15),
  },
  searchButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchStyle: {
    height: constant.moderateScale(50),
    width: constant.moderateScale(50),
  },
  detailMainView2: {
    paddingHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  bottomMainView: {
    backgroundColor: constant.whiteColor,
    marginHorizontal: "1%",
    borderRadius: 10,
    elevation: 1,
    marginTop: "3%",
    paddingBottom: "2%",
  },
  calenderStyle: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    marginRight: "2%",
  },
  proceedButton: {
    width: constant.moderateScale(135),
    alignSelf: "center",
    marginTop: constant.resW(30),
    marginBottom: constant.resW(5),
  },
  proccedButtonText: {},
  dropNameList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    borderRadius: 8,
    width: constant.resW(17),
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    paddingHorizontal: 0,
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
    color: "#4AAA38",
    fontFamily: constant.typeMedium,
    fontSize: constant.moderateScale(15),
  },
  coutMainView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  coutButton: {
    //   backgroundColor:constant.red,
    height: constant.moderateScale(40),
    width: constant.moderateScale(40),
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: constant.moderateScale(10),
    borderColor: constant.red,
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
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(14),
    textAlignVertical: "top",
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
  topButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal:constant.moderateScale(10),
    marginTop: constant.moderateScale(10),
  },
  topButton: {
    flex: 0.31,
    backgroundColor: constant.baseColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: constant.moderateScale(8),
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: constant.baseColor,
  },
  topButton2: {
    flex: 0.31,
    backgroundColor: constant.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: constant.moderateScale(8),
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: constant.baseColor,
  },
  topButtonStyle: {
    fontSize: constant.moderateScale(15),
    color: constant.whiteColor,
    fontFamily: constant.typeLight,
    textAlign: "center",
  },
  topButtonStyle2: {
    fontSize: constant.moderateScale(15),
    color: constant.baseColor,
    fontFamily: constant.typeLight,
    textAlign: "center",
  },
  calenderMainView: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    flexDirection: "row",
    borderColor: constant.textColor,
    backgroundColor: "transparent",
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(15),
    borderRadius:10,
    alignItems:'center'
  },
  calenderMainView2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  calenderInput: {
    height: constant.moderateScale(40),
    flex: 1,
    // borderRadius: 10,
    borderColor: constant.baseColor,
    backgroundColor: "transparent",
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
  },
  calenderInput2: {
    height: constant.moderateScale(40),
    flex: 1,
    backgroundColor: "transparent",
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
  },

  uploadFileStyle: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    marginRight: "2%",
  },
  uploadFileMainView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#1D539426",
    paddingLeft: "3%",
    elevation: 3,
    shadowColor: "#1D539426",
    backgroundColor: constant.whiteColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  uploadFileMainView2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    // borderRadius:10,
    borderBottomColor: constant.baseColor,
    paddingLeft: "3%",
    // elevation:3,
    // shadowColor:'#1D539426',
    // backgroundColor:constant.whiteColor,
    // shadowOffset: { width: 3, height: 3 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  uploadFileInput: {
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    // borderColor:'#ABABAB',
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
  },
  uploadFileInput2: {
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    // borderColor:'#ABABAB',
    // backgroundColor:constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
  },
});
