import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Animated,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import * as constant from "../../utilities/constants";
import styles from "./PerformaStyle";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader";
import FastImage from "react-native-fast-image";
import images from "../../utilities/images";
import * as common_fn from "../../utilities/common_fn";
import { APIName, imageUrl, tokenApiCall } from "../../utilities/apiCaller";
import CommonHeader from "../../components/CommonHeader";
import SelectDropList from "../../components/SelectDropList";
import Button from "../../components/Button";
import moment from "moment";
import { emptyLoader_Action } from "../../redux/actions/AuthAction";

const transData1 = [
  { code: "PAN_CARD", description: "Pan Card available" },
  { code: "FORM_60", description: "Pan Card not available" },
];

const priceList = [
  { code: "CURRENT_DATE", description: "Applicable on Current Date" },
];
export default function PerformaBasicInfo(props) {
  const {
    navigation,
    performaPriceDetail,
    performaBasicInfo,
    texMasterData,
    cardData,
    performaGeneralMasterData,
    SaveInfo,
    prospect_No,
    intrestedVehicleList,
    proformaId
  } = props;
  const dispatch = useDispatch();
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const [billingLoactionData, setBillingLocationData] = useState([]);
  const [billingLoactionValue, setBillingLocationValue] = useState({});
  const [usageData, setUsageData] = useState([]);
  const [usageValue, setUsageValue] = useState({});
  const [salesGroupData, setSalesGroupData] = useState([]);
  const [salesGroupValue, setSalesGroupValue] = useState({});
  const [endUseData, setEndUseData] = useState([]);
  const [endUseValue, setEndUseValue] = useState([]);
  const [tcsStatus, setTcsStatus] = useState(false);
  const [discountValue, setDiscountValue] = useState("0");
  const [loyalAmt, setLoayalAmt] = useState(0);
  const [trnsBasicValue, setTrnsBasicValue] = useState({});
  const [texMaster, setTexMaster] = useState([]);
  const [texTotal, setTexTotal] = useState(0);
  const [surchargeData, setSurchargeData] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceListValue, setPriceListValue] = useState({
    code: "CURRENT_DATE",
    description: "Applicable on Current Date",
  });
  const [tcsPercentageValue, setTcsPercentageValue] = useState("");

  const [basicPriceDiscount, setBasicPriceDiscount] = useState(0);
  const [exShowRoomPostPrice, setExShowRoomPostPrice] = useState(0);
  const [exShowRoomPrePrice, setExShowRoomPrePrice] = useState(0);
  const [discountPerTex, setDiscountPerTex] = useState(0);
  const [tcsValue, setTcsValue] = useState("0");
  const [texData,settexData]=useState({})
  const [transData,setTransData] = useState(transData1)
  const [priceDetail,setPriceDetail] = useState({})

  useEffect(() => {
    // console.log("performaGeneralMasterData = ", JSON.stringify(performaGeneralMasterData));
    console.log("performaPriceDetail data = ", performaPriceDetail);
    // console.log(
    //   "performaGeneralMasterData performaBasicInfo = ",
    //   performaBasicInfo
    // );
    // console.log("performaGeneralMasterData texMasterData = ", texMasterData);
    // console.log("performaGeneralMasterData cardData = ", performaBasicInfo);

    performaGeneralMasterData?.selectMasterList.map((item) => {
      if (item?.listType === "BILLING_LOCATION") {
        setBillingLocationData(item.basicList);
        item.basicList.map((item)=>{item?.isSelected==='Y' ? setBillingLocationValue(item) : null })
      } else if (item?.listType === "USAGE") {
        setUsageData(item.basicList);
        item.basicList.map((item,index)=>{item?.isSelected==='Y' ? setUsageValue(item) : null })

      } else if (item?.listType === "SALE_GROUP") {
        item.basicList.map((item,index)=>{
          if(item?.isSelected==='Y'){
           setSalesGroupValue(item) 
           fn_GetProformaGeneralMasters(item,1)
          }
          })

        setSalesGroupData(item.basicList);
      }
      //   else if(item?.listType ==='END_USE'){
      //    setEndUseData(item.basicList)
      //   }
    });
    let newArray = [];
    let newTaxTotal = 0;
    let newSubCharge = 0;
    let newTotal = 0;
    texMasterData?.selectedProformaValueCodes.map((item) => {
      newTaxTotal = newTaxTotal + Number(item.perc);
      newSubCharge = newSubCharge + Number(item.surcharge);
      let newObj =
        ((performaPriceDetail?.vehBasicAmount - Number(discountValue)) *
          Number(item?.perc)) /
        100;
      newTotal = newTotal + Number(newObj);
      item["total"] = newObj;
      newArray.push(item);
    });

    //  setTexMaster([...newArray])
    setTexTotal(newTaxTotal);
    //  setSurchargeData(newSubCharge)
    //  setTotalAmount(newTotal)
  }, [texMasterData, performaPriceDetail]);

  useEffect(() => {
    setExShowRoomPrePrice(performaPriceDetail?.exShowromPrice);
  }, [performaPriceDetail, texMasterData]);



  const fn_createDiscountCal = async (d, taxValue) => {
    let basicPrice = priceDetail?.vehBasicAmount;
    setDiscountValue(d);
    let dis = Number(d);
    let tax = isNaN(taxValue) ? 0 : taxValue;
    let discount_Tax = isNaN(Math.round((dis * 100) / (tax + 100), 0))
      ? 0
      : Math.round((dis * 100) / (tax + 100), 0);
    let basicDiscount = isNaN(basicPrice - discount_Tax)
      ? 0
      : basicPrice - discount_Tax;
    setDiscountPerTex(discount_Tax);
    setBasicPriceDiscount(basicDiscount);

    let newArray = [];
    let newTaxTotal = 0;
    let newSubCharge = 0;
    let newTotal = 0;
    texData?.selectedProformaValueCodes.map((item) => {
      newTaxTotal = newTaxTotal + Number(item?.perc);
      newSubCharge = newSubCharge + Number(item?.surcharge);
      let newCal = Math.round(
        (Number(basicDiscount) * Number(item.perc)) / 100,
        0
      );
      newTotal = newTotal + newCal;
      item["total"] = newCal;
      newArray.push(item);
    });

    setTexMaster([...newArray]);
    setTexTotal(isNaN(newTaxTotal) ? 0 : newTaxTotal);
    setSurchargeData(isNaN(newSubCharge) ? 0 : newSubCharge);
    setTotalAmount(isNaN(newTotal) ? 0 : newTotal);

    console.log(
      "texMasterData?.tcsDetail[0]?.tcsApplicable =  ",
      texMasterData?.tcsDetail[0]?.tcsApplicable
    );
    setExShowRoomPostPrice(newTotal + basicDiscount);

    if(Object.keys(trnsBasicValue).length===0){
      if(texData?.vehPriceDetail?.transactionBasis===''){
        transData1.map((item)=>{
      item?.code===texData?.tcsDetail[0]?.trxnBasis ? fn_TcsCalculationValue(texData?.tcsDetail[0], (newTotal + basicDiscount)): null
    })  
    }else{
      transData1.map((item)=>{
       item?.code===texData?.vehPriceDetail?.transactionBasis ?  fn_TcsCalculationValue(item, (newTotal + basicDiscount)) : null

    })
    }
    }else{
      fn_TcsCalculationValue(trnsBasicValue, (newTotal + basicDiscount))
    }



   
  };

  fn_TcsCalculation=(data, firstTimeTotal,texResp)=>{
   if (texResp?.tcsDetail.length>0) {
      let newTcs = 0;
      texResp?.tcsDetail?.map((item) => {
        if (item?.trxnBasis === data?.code) {
         setTcsPercentageValue(item?.tcsRate)
          newTcs = Math.round(
            ((firstTimeTotal === 0 ? (exShowRoomPostPrice) : firstTimeTotal) * item?.tcsRate) / 100,
            0
          );
          item?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false);
        }
      });
      setTcsValue(isNaN(newTcs) ? 0 : newTcs);
     
    } else {
      console.log("aaaaaaaaaaaaaaaaaaaaaaa false");
      setTcsStatus(false);
      setTcsValue(0);
    }
  }

  fn_TcsCalculationValue=(data,firstTimeTotal)=>{
    if (texData?.tcsDetail?.length > 0) {
       let newTcs = 0;
       texData?.tcsDetail?.map((item) => {
         if (item?.trxnBasis === data?.code) {
          // if (item?.tcsApplicable === "Y") {
             console.log("newtcs111",(exShowRoomPostPrice ))
          setTcsPercentageValue(item?.tcsRate)
           newTcs = Math.round(
             (exShowRoomPostPrice * item?.tcsRate) / 100,
             0
           );
          // }
          item?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false);
         }
       });
       console.log("newtcs",newTcs)
       setTcsValue(isNaN(newTcs) ? 0 : newTcs);
     } else {
       console.log("aaaaaaaaaaaaaaaaaaaaaaa false");
       setTcsStatus(false);
      //  setTcsValue(0);
     }
   }


  const fn_GetProformaGeneralMasters = (d,type) => {
    setSalesGroupValue(d);
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      prospectNo: Number(cardData?.prospectId),
      proformaId: proformaId,
      "assembly": intrestedVehicleList?.vehAssemblyType,
      "edition": intrestedVehicleList?.vehEditionType,
      "model": intrestedVehicleList?.model,
      "subModel": intrestedVehicleList?.subModel,
      "style": intrestedVehicleList?.vehVariantStyle,
      "my": intrestedVehicleList?.modelYear,
      "vy": intrestedVehicleList?.vinYear,
      "exterior": intrestedVehicleList?.colorCode,
      "interior":intrestedVehicleList?.upholsteryCode,
      calledBy:
        "BILLING_LOCATION,USAGE,SALE_GROUP,END_USE,ITEM_GROUP,RTO_CITY,RTO_CODE,INSU_CITY,INSU_COMPANY,REGN_TYPE,VEH_PRICE",
      priceListApplicable: moment(new Date()).format("DD-MMM-YYYY"), //"23-APR-2024",
      billingLocation: "",
      usage: "",
      saleGroup: d.code,
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
    let newObj={value:d.code,type:type}
    tokenApiCall(
      GetProformaGeneralMastersCallBack,
      APIName.GetProformaGeneralMast,
      "POST",
      param,
      newObj
    );
  };

  const GetProformaGeneralMastersCallBack = (res,newObj) => {
    console.log("GetProformaGeneralMastersCallBack12 = ", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
      res.result?.selectMasterList.map((item) => {
        if (item?.listType === "END_USE") {
          setEndUseData(item.basicList);
          let filteName= item.basicList.filter((item) => item?.isSelected==='Y')
          if(filteName.length===0){
            newObj?.type===1 ?fn_GetProformaUseEndlMasters("EU" ,newObj) : null
          }else{
            setEndUseValue(filteName[0])
            newObj?.type===1 ?fn_GetProformaUseEndlMasters(filteName[0].code ,newObj) : null
          }
          newObj?.type===1 ?item.basicList.map((item,index)=>{item?.isSelected==='Y' ? setEndUseValue(item) : null }) : null
        }
      });
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_Validation = () => {
    if (Object.keys(billingLoactionValue).length === 0) {
      constant.showMsg("Please select billing locaton");
    } else if (Object.keys(usageValue).length === 0) {
      constant.showMsg("Please select usage");
    } else if (Object.keys(salesGroupValue).length === 0) {
      constant.showMsg("Please select sale Group");
    } else if (Object.keys(endUseValue).length === 0) {
      constant.showMsg("Please select end Use");
    } else if (Object.keys(trnsBasicValue).length === 0) {
      constant.showMsg("Please select Trnx Basic");
    } else {
      fn_Create();
    }
  };

  const fn_Create = () => {

    if (performaPriceDetail === null) {
      constant.showMsg("Price not available for this vehcile");
    } else {
      dispatch(emptyLoader_Action(true));
      let newParam = [];
      texMasterData?.selectedProformaValueCodes.map((item) => {
        let newValue = item?.taxCode + "0000" + item?.perc + item?.surcharge;
        newParam.push(newValue);
      });
      console.log("aaa   ", usageValue);
      let param = {
        brandCode: userData?.brandCode,
        countryCode: userData?.countryCode,
        companyId: userData?.companyId,
        prospectNo: Number(cardData?.prospectId),
        coNo: 0,
        piLocation: cardData?.prospectLocation, //prospect location
        piDoc: "SRP",
        piFY: performaBasicInfo?.proformaList.length > 0 ?  performaBasicInfo?.proformaList[0]?.docFy : "", //current datefy
        piNo: Number(prospect_No),
        priceListApplicable: "CURRENT_DATE",//moment(new Date()).format("DD-MMM-YYYY"),
        make: userData?.brandCode,
        assembly: cardData?.vehAssemblyType,
        edition: cardData?.vehEditionType,
        model: intrestedVehicleList?.model, //cardData?.model,
        variant: intrestedVehicleList?.subModel,
        exterior: intrestedVehicleList?.colorCode,
        interior: intrestedVehicleList?.upholsteryCode,
        piStyle: intrestedVehicleList?.vehVariantStyle,
        piMY: intrestedVehicleList?.modelYear,
        piVY: intrestedVehicleList?.vinYear,
        priceSerial: performaPriceDetail?.priceSerial,
        basicPrice: performaPriceDetail?.vehBasicAmount,
        discount: Number(discountValue),
        itemDiscount: Number(discountPerTex),
        totalTax: parseInt(totalAmount),
        totalLevy: 0,
        exShowroomPostDisc: exShowRoomPostPrice,
        exShowroomPreDisc: performaPriceDetail?.exShowromPrice,
        bookingAmount: 0,
        piUsage: usageValue?.code,
        piBillingLocation: billingLoactionValue?.code,
        corporateAmt: 0,
        tcsAppicable: tcsStatus ? "Y" : "N",
        tcsRate: Number(tcsPercentageValue),
        tcsAmt: Number(tcsValue),
        trxnBasic: trnsBasicValue?.code,
        userId: userData?.userId,
        createIP: "1::1",
        gstList: newParam.join(",").toString(), //textcodeeeee
        calledBy: "PROSPECT",
        endUse: endUseValue?.code,
        insuCode: "",
        insuLocation: "",
        itemGroup: "",
        loginUserId: userData?.userId,
        proformaId: 0,
        regnLocation: "",
        rtoCode: "",
        saleGroup: salesGroupValue.code,
        subModel: cardData?.variant,
        vehiclePrice: 0,
      };
      tokenApiCall(
        SaveProformaBasicInfoCallBack,
        APIName.SaveProformaBasicInfo,
        "POST",
        param
      );
    }
  };

  const SaveProformaBasicInfoCallBack = (res) => {
    console.log("GetSave = ", JSON.stringify(res));
    if (res.statusCode === 200) {
      if (res?.result?.resultCode === "Y") {
        SaveInfo();
      } else {
        constant.showMsg("Somethings wents wrong");
      }
      // dispatch(emptyLoader_Action(false));
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  const fn_HeaderList = () => {
    return (
      <View style={[styles.costListMainView, {}]}>
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>HEAD</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Tax%</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Surcharge%</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Total</Text>
        </View>
      </View>
    );
  };

  const texListRender = ({ item, index }) => {
    return (
      <View
        style={[
          styles.costListMainView,
          { marginTop: constant.moderateScale(10) },
        ]}
      >
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>{item?.taxType}</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>{(item?.perc).toFixed(2)}%</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>
            {(item?.surcharge).toFixed(2)}%
          </Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>{item.total}</Text>
        </View>
      </View>
    );
  };

  const fn_FooterList = () => {
    return (
      <View
        style={[
          styles.costListMainView,
          {
            backgroundColor: "#F0F0F0",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            paddingVertical: constant.moderateScale(7),
            paddingHorizontal: 10,
            marginHorizontal: 0,
          },
        ]}
      >
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>Total</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>{texTotal.toFixed(2)}%</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>{surchargeData.toFixed(2)}%</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}>{totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const fn_GetDiscount = (d) => {
    setDiscountValue(d);
    let newArray = [];
    let newTotal = 0;
    texMasterData.selectedProformaValueCodes.map((item) => {
      let newObj =
        ((performaPriceDetail?.vehBasicAmount - Number(d)) *
          Number(item?.perc)) /
        100;
      item["total"] = newObj;
      newTotal = newTotal + Number(newObj);
      newArray.push(item);
    });

    setTexMaster([...newArray]);
    setTotalAmount(newTotal);
  };

  const fn_GetProformaTaxMasters = (d,type) => {
  type===2 ? dispatch(emptyLoader_Action(true)) : null
    let param = {
       brandCode: userData?.brandCode,
       countryCode: userData?.countryCode,
       companyId: userData?.companyId,
       prospectNo: Number(cardData?.prospectId),
       proformaId: proformaId ,
       hsnCode: performaGeneralMasterData?.vehPrice?.hsnCode,
       endUse: d,
       basicPrice: performaGeneralMasterData?.vehPrice?.vehBasicAmount,
       discount:performaGeneralMasterData?.vehPrice?.discountAmt,
       loginUserCompanyId: userData?.userCompanyId,
       loginUserId: userData?.userId,
       ipAddress: "1::1",
 
    };
    tokenApiCall(
       GetProformaTaxMastersCallBack,
       APIName.GetProformaTaxMasters,
       "POST",
       param,
       type
    );
 };

 const GetProformaTaxMastersCallBack = (res,type) => {
    console.log("enduseText ", JSON.stringify(res));
    dispatch(emptyLoader_Action(false))
    settexData(res?.result)
    if (res.statusCode === 200) {
      if(type===1){
        let newArray=[]
        transData1.map((item)=>{
         res?.result?.tcsDetail.map((items)=>{
           items?.trxnBasis===item?.code ? newArray.push(item) : null
          })
     })
     setTransData(newArray)
     if(res?.result?.vehPriceDetail?.transactionBasis===''){
         transData1.map((item)=>{
       item?.code===res?.result?.tcsDetail[0]?.trxnBasis ? setTrnsBasicValue(item) : null
     })
   
     }else{
       transData1.map((item)=>{
       item?.code===res?.result?.vehPriceDetail?.transactionBasis ? setTrnsBasicValue(item) : null
     })
     }
        let tax = 0;
        res?.result?.selectedProformaValueCodes.map((item) => {
          tax = tax + Number(item.perc);
        });
        setTexTotal(tax);
        fn_createCal(performaPriceDetail?.discountAmt, tax,res?.result);
      }else{
      let newArray1=[]
      setTrnsBasicValue({})
       transData1.map((item)=>{
        res?.result?.tcsDetail.map((items)=>{
          items?.trxnBasis===item?.code ? newArray1.push(item) : null
         })
    })
    setTransData(newArray1)
    let transObj = {}
    if(res?.result?.vehPriceDetail?.transactionBasis===''){
        transData1.map((item)=>{
          item?.code===res?.result?.tcsDetail[0]?.trxnBasis ? transObj= item : null

      item?.code===res?.result?.tcsDetail[0]?.trxnBasis ? setTrnsBasicValue(item) : null
    })
  
    }else{
      transData1.map((item)=>{
        item?.code===res?.result?.vehPriceDetail?.transactionBasis ? transObj= item : null

      item?.code===res?.result?.vehPriceDetail?.transactionBasis ? setTrnsBasicValue(item) : null
    })
    }
      

    let tax1 = 0;
    res?.result?.selectedProformaValueCodes.map((item) => {
      tax1 = tax1 + Number(item.perc);
    });
    setTexTotal(tax1);


    let basicPrice = performaPriceDetail?.vehBasicAmount;
    // setDiscountValue(performaPriceDetail?.discountAmt);
    let dis = Number(performaPriceDetail?.discountAmt);
    let tax = isNaN(tax1) ? 0 : tax1;
    let discount_Tax = isNaN(Math.round((dis * 100) / (tax + 100), 0))
      ? 0
      : Math.round((dis * 100) / (tax + 100), 0);
    let basicDiscount = isNaN(basicPrice - discount_Tax)
      ? 0
      : basicPrice - discount_Tax;
    setDiscountPerTex(discount_Tax);
    setBasicPriceDiscount(basicDiscount);

    let newArray = [];
    let newTaxTotal = 0;
    let newSubCharge = 0;
    let newTotal = 0;
    res?.result?.selectedProformaValueCodes.map((item) => {
      newTaxTotal = newTaxTotal + Number(item?.perc);
      newSubCharge = newSubCharge + Number(item?.surcharge);
      let newCal = Math.round(
        (Number(basicDiscount) * Number(item.perc)) / 100,
        0
      );
      newTotal = newTotal + newCal;
      item["total"] = newCal;
      newArray.push(item);
    });

    setTexMaster([...newArray]);
    setTexTotal(isNaN(newTaxTotal) ? 0 : newTaxTotal);
    setSurchargeData(isNaN(newSubCharge) ? 0 : newSubCharge);
    setTotalAmount(isNaN(newTotal) ? 0 : newTotal);
   
    if (res?.result?.tcsDetail.length > 0) {
      let newTcs = 0;
      res?.result?.tcsDetail?.map((item) => {
        // if (item?.tcsApplicable === "Y") {
        if (item?.trxnBasis === transObj?.code) {
    
         setTcsPercentageValue(item?.tcsRate)
          newTcs = Math.round(
            ((exShowRoomPostPrice)  * item?.tcsRate) / 100,
            0
          );
        // }
        item?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false);
      }
      });
      setTcsValue(isNaN(newTcs) ? 0 : newTcs);
    } else {
      console.log("aaaaaaaaaaaaaaaaaaaaaaa false");
      setTcsStatus(false);
      setTcsPercentageValue('')
      setTcsValue(0);
    }
    let filterData = res?.result?.tcsDetail?.filter(e=>e?.trxnBasis === transObj?.code)
    filterData?.length > 0 ? filterData[0]?.tcsApplicable==='Y' ? setTcsPercentageValue(filterData[0]?.tcsRate) :  setTcsPercentageValue('') : setTcsPercentageValue('')

    filterData?.length > 0 ? filterData[0]?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false) : setTcsStatus(false)
    setTrnsBasicValue(transObj)
  }
  
    } else {
       constant.showMsg(res.message);
    }
 };


 const fn_GetProformaUseEndlMasters = (d,newObj) => {
  dispatch(emptyLoader_Action(true))
  let param = {
    brandCode: userData?.brandCode,
    countryCode: userData?.countryCode,
    companyId: userData?.companyId,
    prospectNo: Number(cardData?.prospectId),
    proformaId: proformaId,
    "assembly": intrestedVehicleList?.vehAssemblyType,
    "edition": intrestedVehicleList?.vehEditionType,
    "model": intrestedVehicleList?.model,
    "subModel": intrestedVehicleList?.subModel,
    "style": intrestedVehicleList?.vehVariantStyle,
    "my": intrestedVehicleList?.modelYear,
    "vy": intrestedVehicleList?.vinYear,
    "exterior": intrestedVehicleList?.colorCode,
    "interior":intrestedVehicleList?.upholsteryCode,
    calledBy:
      "BILLING_LOCATION,USAGE,SALE_GROUP,END_USE,ITEM_GROUP,RTO_CITY,RTO_CODE,INSU_CITY,INSU_COMPANY,REGN_TYPE,VEH_PRICE",
    priceListApplicable: moment(new Date()).format("DD-MMM-YYYY"), //"23-APR-2024",
    billingLocation: billingLoactionValue?.code,
    usage: "",
    saleGroup:newObj?.value,
    endUse: d,
    vehiclePrice: 0,
    itemGroup: "",
    regnLocation: "",
    rtoCode: "",
    insuLocation: "",
    insuCode: "",
    loginUserId: userData?.userId,
    ipAddress: "1::1",
  };
  let dataObj ={value:d,type:newObj?.type}
  tokenApiCall(
    GetProformaUseEndlMasters,
    APIName.GetProformaGeneralMast,
    "POST",
    param,
    dataObj
  );
};

const GetProformaUseEndlMasters = (res,dataObj) => {
  console.log("GetProformaGeneralMastersCallBack12 = ", JSON.stringify(res));
  dispatch(emptyLoader_Action(false));
  if (res.statusCode === 200) {
    dataObj?.type=== 1 ? setDiscountValue(res?.result?.vehPrice?.discountAmt) : null
    setExShowRoomPrePrice(res?.result?.vehPrice?.exShowromPrice)
    setPriceDetail(res?.result?.vehPrice)
     let newObj = {priceObj:res?.result?.vehPrice,type:dataObj?.type}
    fn_GetProformaUseTaxMasters(newObj,dataObj?.value)

  } else {
    constant.showMsg(res.message);
  }
};

const fn_GetProformaUseTaxMasters = (priceData,d) => {
   dispatch(emptyLoader_Action(true)) 
    let param = {
       brandCode: userData?.brandCode,
       countryCode: userData?.countryCode,
       companyId: userData?.companyId,
       prospectNo: Number(cardData?.prospectId),
       proformaId: proformaId ,
       hsnCode: performaGeneralMasterData?.vehPrice?.hsnCode,
       endUse: d,
       basicPrice: performaGeneralMasterData?.vehPrice?.vehBasicAmount,
       discount:performaGeneralMasterData?.vehPrice?.discountAmt,
       loginUserCompanyId: userData?.userCompanyId,
       loginUserId: userData?.userId,
       ipAddress: "1::1",
 
    };
    tokenApiCall(
      GetProformaUseTaxMasters,
       APIName.GetProformaTaxMasters,
       "POST",
       param,
       priceData
    );
 };

 const GetProformaUseTaxMasters = (res,priceData) => {
    console.log("enduseText ", JSON.stringify(res));
    dispatch(emptyLoader_Action(false))
    settexData(res?.result)
    if (res.statusCode === 200) {
     
      let newArray1=[]
      setTrnsBasicValue({})
       transData1.map((item)=>{
        res?.result?.tcsDetail.map((items)=>{
          items?.trxnBasis===item?.code ? newArray1.push(item) : null
         })
    })
    setTransData(newArray1)
    let transObj = {}
    if(res?.result?.vehPriceDetail?.transactionBasis===''){
        transData1.map((item)=>{
          item?.code===res?.result?.tcsDetail[0]?.trxnBasis ? transObj= item : null

      item?.code===res?.result?.tcsDetail[0]?.trxnBasis ? setTrnsBasicValue(item) : null
    })
  
    }else{
      transData1.map((item)=>{
        item?.code===res?.result?.vehPriceDetail?.transactionBasis ? transObj= item : null

      item?.code===res?.result?.vehPriceDetail?.transactionBasis ? setTrnsBasicValue(item) : null
    })
    }
      

    let tax1 = 0;
    res?.result?.selectedProformaValueCodes.map((item) => {
      tax1 = tax1 + Number(item.perc);
    });
    setTexTotal(tax1);


    let basicPrice = priceData?.priceObj?.vehBasicAmount;
    let dis = priceData.type===1 ? Number(priceData?.priceObj?.discountAmt) : Number(discountValue)
    // let dis =  Number(priceData?.discountAmt) 
    let tax = isNaN(tax1) ? 0 : tax1;
    let discount_Tax = isNaN(Math.round((dis * 100) / (tax + 100), 0))
      ? 0
      : Math.round((dis * 100) / (tax + 100), 0);
    let basicDiscount = isNaN(basicPrice - discount_Tax)
      ? 0
      : basicPrice - discount_Tax;
      console.log("aaaaaaa"+priceData.type)
    setDiscountPerTex(discount_Tax);
    setBasicPriceDiscount(basicDiscount);

    let newArray = [];
    let newTaxTotal = 0;
    let newSubCharge = 0;
    let newTotal = 0;
    res?.result?.selectedProformaValueCodes.map((item) => {
      newTaxTotal = newTaxTotal + Number(item?.perc);
      newSubCharge = newSubCharge + Number(item?.surcharge);
      let newCal = Math.round(
        (Number(basicDiscount) * Number(item.perc)) / 100,
        0
      );
      newTotal = newTotal + newCal;
      item["total"] = newCal;
      newArray.push(item);
    });

    setTexMaster([...newArray]);
    setTexTotal(isNaN(newTaxTotal) ? 0 : newTaxTotal);
    setSurchargeData(isNaN(newSubCharge) ? 0 : newSubCharge);
    setTotalAmount(isNaN(newTotal) ? 0 : newTotal);
    // alert(newTotal + basicDiscount)
    setExShowRoomPostPrice(newTotal + basicDiscount);
    if (res?.result?.tcsDetail.length > 0) {
      let newTcs = 0;
      res?.result?.tcsDetail?.map((item) => {
        // if (item?.tcsApplicable === "Y") {
        if (item?.trxnBasis === transObj?.code) {
    
         setTcsPercentageValue(item?.tcsRate)
          newTcs = Math.round(
            ((newTotal + basicDiscount)  * item?.tcsRate) / 100,
            0
          );
        // }
        item?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false);
      }
      });
      setTcsValue(isNaN(newTcs) ? 0 : newTcs);
    } else {
      console.log("aaaaaaaaaaaaaaaaaaaaaaa false");
      setTcsStatus(false);
      setTcsPercentageValue('')
      setTcsValue(0);
    }
    let filterData = res?.result?.tcsDetail?.filter(e=>e?.trxnBasis === transObj?.code)
    filterData?.length > 0 ? filterData[0]?.tcsApplicable==='Y' ? setTcsPercentageValue(filterData[0]?.tcsRate) :  setTcsPercentageValue('') : setTcsPercentageValue('')

    filterData?.length > 0 ? filterData[0]?.tcsApplicable==='Y' ? setTcsStatus(true) :  setTcsStatus(false) : setTcsStatus(false)
    setTrnsBasicValue(transObj)
  
  
    } else {
       constant.showMsg(res.message);
    }
 };

  return (
    <View style={{ flex: 1, backgroundColor: "#E1E1E1" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={mainStyle.cal_SubView2}>
          <View style={{ flex: 1 }}>
            {/* <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Source</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View> */}

            <View
              style={[
                styles.driveListDetailView,
                { marginTop: constant.moderateScale(15) },
              ]}
            >
              <View style={[styles.driveListDetailSubView, {}]}>
                <Text style={styles.listText2}>Proforma Inv no</Text>
                <Text style={styles.listText3}>{performaBasicInfo?.proformaList.length===0 ? 'New' :performaBasicInfo?.proformaList[0]?.docNo }</Text>
                {/* <Text style={styles.listText3}>{performaBasicInfo?.proformaList.length > 0 ? "Edit" : "New"}</Text> */}
              </View>
              <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Dated</Text>
                <Text style={styles.listText3}>
                  {moment(new Date()).format("DD-MMM-YYYY")}
                </Text>
              </View>
            </View>

            <View style={styles.driveListDetailView}>
              <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Model</Text>
                <Text style={styles.listText3}>
                  {intrestedVehicleList?.model}
                </Text>
              </View>
              <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>Variant</Text>
                <Text style={styles.listText3}>
                  {intrestedVehicleList?.vehVariantDesc}
                </Text>
              </View>
            </View>

            <View style={styles.driveListDetailView}>
              <View style={styles.driveListDetailSubView}>
                <Text style={styles.listText2}>Style</Text>
                <Text style={styles.listText3}>
                  {intrestedVehicleList?.vehVariantStyle}
                </Text>
              </View>
              <View style={styles.driveListDetailSubView2}>
                <Text style={styles.listText2}>MY/VY</Text>
                <Text style={styles.listText3}>
                  {intrestedVehicleList?.modelYear}-
                  {intrestedVehicleList?.vinYear}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.detailMainView,
                { marginTop: constant.moderateScale(10) },
              ]}
            >
              <Text style={styles.detailText}>Price List</Text>
              <SelectDropList
                list={priceList}
                title={priceListValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setPriceListValue(d)}
              />
            </View>

            <View
              style={[
                styles.detailMainView,
                { marginTop: constant.moderateScale(10) },
              ]}
            >
              <Text style={styles.detailText}>Billing Location</Text>
              <SelectDropList
                list={billingLoactionData}
                buttonExt={styles.dropList}
                refType={Object.keys(billingLoactionValue).length===0 ?false : true}
                textExt={styles.dropListText}
                title={billingLoactionValue?.description}
                on_Select={(d) => setBillingLocationValue(d)}
              />
            </View>
            <View
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: 10,
                paddingHorizontal: constant.moderateScale(0),
                marginTop: constant.moderateScale(13),
                paddingBottom: constant.moderateScale(10),
              }}
            >
              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>Discount</Text>
                <TextInput
                  style={styles.input1}
                  keyboardType="numeric"
                  onChangeText={(d) => fn_createDiscountCal(d, texTotal)}
                >
                  {discountValue}
                </TextInput>
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>Usage</Text>
               
                <SelectDropList
                  list={usageData}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  title={usageValue?.description}
                  refType={Object.keys(usageValue).length===0 ?false : true}
                  on_Select={(d) => setUsageValue(d)}
                />
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>Sale Group</Text>
                <SelectDropList
                  list={salesGroupData}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  title={salesGroupValue?.description}
                  refType={Object.keys(salesGroupValue).length===0 ?false : true}
                  on_Select={(d) =>{
                    setEndUseValue({})
                     fn_GetProformaGeneralMasters(d,2)
                    }}
                />
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>End Use</Text>
                <SelectDropList
                  list={endUseData}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  title={endUseValue?.description}
                  refType={Object.keys(endUseValue).length===0 ?false : true}
                  on_Select={(d) => {
                    setEndUseValue(d)
                    newObj={value:salesGroupValue?.code,type:2}
                    fn_GetProformaUseEndlMasters(d.code,newObj)
                    // fn_GetProformaTaxMasters (d.code,2)
                  }}
                />
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>Loyalty Disc Amt</Text>
                <TextInput
                  style={styles.input1}
                  editable={false}
                  onChangeText={(d) => setLoayalAmt(d)}
                >
                  {loyalAmt}
                </TextInput>
              </View>

              <View style={styles.driveListDetailView}>
                <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>HSN Code</Text>
                  <Text style={styles.listText3}>
                    {performaPriceDetail?.hsnCode}
                  </Text>
                </View>
                <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Basic Price</Text>
                  <Text style={styles.listText3}>
                    {performaPriceDetail?.vehBasicAmount}
                  </Text>
                </View>
              </View>

              <View style={styles.driveListDetailView}>
                <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Discount</Text>
                  <Text style={styles.listText3}>{discountPerTex}</Text>
                </View>
                <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>
                    Basic Price(Post Discount)
                  </Text>
                  <Text style={styles.listText3}>{basicPriceDiscount}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: 10,
                paddingHorizontal: constant.moderateScale(0),
                marginTop: constant.moderateScale(13),
                paddingBottom: constant.moderateScale(0),
              }}
            >
              <FlatList
                data={texMaster}
                ListHeaderComponent={() => fn_HeaderList()}
                renderItem={texListRender}
                ListFooterComponent={() => fn_FooterList()}
              />
            </View>
            <View
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: 10,
                paddingHorizontal: constant.moderateScale(0),
                marginTop: constant.moderateScale(13),
                paddingBottom: constant.moderateScale(20),
              }}
            >
              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>Trnx Basis</Text>
                <SelectDropList
                  list={transData}
                  buttonExt={styles.dropList}
                  title={trnsBasicValue?.description}
                  refType={Object.keys(trnsBasicValue).length===0 ?false : true}
                  textExt={styles.dropListText}
                  on_Select={(d) => {
                     setTrnsBasicValue(d)
                     fn_TcsCalculationValue(d, 0)
                  }}
                />
               
              </View>

              <View
                style={[
                  styles.detailMainView,
                  { marginTop: constant.moderateScale(10) },
                ]}
              >
                <Text style={styles.detailText}>TCS {tcsPercentageValue}%</Text>
                <Pressable
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => null}
                >
                  <FastImage
                    source={tcsStatus ? images?.checkIcon : images?.unCheckIcon}
                    resizeMode="contain"
                    style={mainStyle.tcsCheckBox}
                  />
                  <Text style={mainStyle.tcsText}>{tcsValue}</Text>
                </Pressable>
              </View>

              <View style={styles.driveListDetailView}>
                <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>
                    Ex-Showroom(Pre-Discount)
                  </Text>
                  <Text style={styles.listText3}>{exShowRoomPrePrice}</Text>
                </View>
                <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>
                    Ex-Showroom(Post Discount)
                  </Text>
                  <Text style={styles.listText3}>{exShowRoomPostPrice}</Text>
                </View>
              </View>

              <View style={styles.driveListDetailView}>
                <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Booking Amount</Text>
                  <Text style={styles.listText3}>
                    {performaPriceDetail?.bookingAmt}
                  </Text>
                </View>
                <View style={styles.driveListDetailSubView2}>
                  {/* <Text style={styles.listText2}>MY/VY</Text>
                        <Text style={styles.listText3}>2024/2024</Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>
        <Button
          title="Create Proforma"
          click_Action={() => fn_Validation()}
          buttonExt={styles.performaButton}
        />
      </ScrollView>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  cal_SubView2: {
    flex: 1,
    backgroundColor: constant.whiteColor,
    marginBottom: constant.moderateScale(6),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tcsCheckBox: {
    height: constant.moderateScale(26),
    width: constant.moderateScale(26),
  },
  tcsText: {
    fontFamily: constant.typeMedium,
    fontSize: constant.moderateScale(16),
    marginLeft: constant.moderateScale(8),
    color: constant.blackColor,
  },
});
