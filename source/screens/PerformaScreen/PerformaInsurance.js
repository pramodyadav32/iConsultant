import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput, StyleSheet } from 'react-native';
import * as constant from '../../utilities/constants'
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';

const sourceData = [
  { 'key': 1, "title": 'Calculator', 'description': 'Calculator' }
]

const data2 = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const otherRateData = [
  { "key": 0, title: 0, description: "0" },
  { "key": 1, title: 1, description: 1 },
  { "key": 2, title: 2, description: 2 },
  { "key": 3, title: 3, description: 3 },
  { "key": 4, title: 4, description: 4 },
  { "key": 5, title: 5, description: 5 },
  { "key": 6, title: 6, description: 6 },
  { "key": 7, title: 7, description: 7 },
  { "key": 8, title: 8, description: 8 },
  { "key": 9, title: 9, description: 9 },
  { "key": 10, title: 10, description: 10 },
  { "key": 11, title: 11, description: 11 },
  { "key": 12, title: 12, description: 12 },
  { "key": 13, title: 13, description: 13 },
  { "key": 14, title: 14, description: 14 },
  { "key": 15, title: 15, description: 15 },
  { "key": 16, title: 16, description: 16 },
  { "key": 17, title: 17, description: 17 },
  { "key": 18, title: 18, description: 18 },
  { "key": 19, title: 19, description: 19 },
  { "key": 20, title: 20, description: 20 },

]

const ncbRateData = [
  { "key": 0, title: 0, description: "0" },
  { "key": 5, title: 5, description: 5 },
  { "key": 10, title: 10, description: 10 },
  { "key": 15, title: 15, description: 15 },
  { "key": 20, title: 20, description: 20 },
  { "key": 25, title: 25, description: 25 },
  { "key": 30, title: 30, description: 30 },
  { "key": 35, title: 35, description: 35 },
  { "key": 40, title: 40, description: 40 },
  { "key": 45, title: 45, description: 45 },
  { "key": 50, title: 50, description: 50 },
  { "key": 55, title: 55, description: 55 },
  { "key": 60, title: 60, description: 60 },
  { "key": 65, title: 65, description: 65 },
  { "key": 70, title: 70, description: 70 },
  { "key": 75, title: 75, description: 75 },
  { "key": 80, title: 80, description: 80 },
  { "key": 85, title: 85, description: 85 },
  { "key": 90, title: 90, description: 90 },
  { "key": 95, title: 95, description: 95 },
  { "key": 100, title: 100, description: 100 },

]

export default function PerformaInsurance(props) {
  const { navigation, insurance_Data1,fn_Next ,generalMaster_Data, insuranceLoc_Data,performaBasicInfo } = props
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.AuthReducer)
  const [selectState, setSelectState] = useState(false)
  const [idvListData, setIdvListData] = useState([])
  const [idvListValue, setIdvListValue] = useState({})
  const [basicPremiumList, setbasicPremiumList] = useState([])
  const [idvCalculationList, setidvCalculationList] = useState([])
  const [insurenceHeadList, setinsurenceHeadList] = useState([])
  const [insurenceDataList, setinsurenceDataList] = useState([])
  const [insurenceDetail, setinsurenceDetail] = useState({})
  const [INSU_COMPANY, setINSU_COMPANY] = useState([])
  const [companyValue, setCompanyValue] = useState({})
  const [typeData, setTypeData] = useState([])
  const [typeValue, setTypevalue] = useState({})

  const [calOnData, setCalOnData] = useState([])
  const [calOnValue, setCalOnValue] = useState({})
  const [rateValue, setRateValue] = useState({})
  const [discountDepValue, setDiscountDepValue] = useState({})
  const [discountRuleData, setDiscountRuleData] = useState([])
  const [discountRuleValue, setDiscountRuleValue] = useState({})
  const [otherRateValue, setOtherRateValue] = useState({})
  const [locationValue, setLocationValue] = useState([])
  const [nilDipCheckStatus, setNilDipCheckStatus] = useState(false)
  const [nilDipSelectedData, setNilDipSelectedData] = useState({})
  const [nilDipData, setNilDipData] = useState([])
  const [ncbSelectedData, setNcbSelectedData] = useState({})
  const [idvValue,setIdvValue]= useState(0)
  const [permiumAmt_Before,setPremiumAmt_Before]= useState(0)
  const [permiumAmt_After,setPremiumAmt_After] = useState(0)
  const [premiumAmt,setPremiumAmt] = useState(0)
  const [dep_Amt,setDep_Amt] = useState(0)
  const [discount_DepAmt,setDiscountDepAmt] = useState(0)
  const [net_PremiumAmt,setNetPremiumAmt] = useState(0)
  const [otherDiscountAmount,setOtherDiscountAmount] = useState(0)
  const [loadingAmt,setLoadingAmt] = useState(0)
  const [gross_Amt,setGrossAmt] = useState(0)
  const [gstValue,setGstValue] = useState(0)
  const [totalPayable,setTotalPayable] = useState(0)
  const [priceValue,setPriceValue] = useState(0)
  const [insuranceLocation, setInsuranceLocation] = useState([])
  const [sourceValue,setSourceValue] = useState({})
  const [insurance_Data,setInsurance_Data] = useState({})
 

useEffect(()=>{
  setNcbSelectedData(ncbRateData[0])
  setDiscountDepValue(otherRateData[0])
  setOtherRateValue(otherRateData[0])

  setInsurance_Data(insurance_Data1)
  fn_SetInsurance()
},[insurance_Data1])


  useEffect(() => {
    console.log("insurance",insurance_Data)
  
  }, [insurance_Data])

  const fn_SetInsurance=()=>{
    let insuranceHeadListTemp = insurance_Data1?.insurenceHeadList.map((list, index) => {
      return { ...list, isChecked: list?.selectedValue, id: index };
    });
    console.log("generalMaster_Data ==== ", JSON.stringify(generalMaster_Data))
    console.log("insurance_Data ==== ", JSON.stringify(insurance_Data))

    sourceData.map((item)=>{
      item?.title === insurance_Data1?.insurenceDetail?.insuSource ? setSourceValue(item) : null
    })
    otherRateData.map((item)=>{
      item?.title === insurance_Data1?.insurenceDetail?.insuDisPer ? setOtherRateValue(item) : null
      item?.title === insurance_Data1?.insurenceDetail?.idv2NildepAmount ? setDiscountDepValue(item) : null

    })
    insurance_Data1?.insurenceDetail?.idv2NildepApply==='s' ? setNilDipCheckStatus(true) : null
    setIdvListData(insurance_Data1?.idvList)
    alert("data"+JSON.stringify(insurance_Data1?.basicPremiumList))
    insurance_Data1?.idvList.map((item)=>{
    
      item?.isSelected === "Y" ? setIdvValue(item): null
    })
    setbasicPremiumList(insurance_Data1?.basicPremiumList)
    setidvCalculationList(insurance_Data1?.idvCalculationList)
    setinsurenceDataList(insurance_Data1?.insurenceDataList)
    setinsurenceHeadList(insuranceHeadListTemp);
    setinsurenceDetail(insurance_Data1?.insurenceDetail)
    setNilDipData(insurance_Data1?.idvCalculationList)

    insurance_Data1?.idvCalculationList.map((item)=>{
      item?.idv2NildepPercentage === insurance_Data1?.insurenceDetail?.idv2NildepPer ? setNilDipSelectedData(item) : null
    })

    let calData = []
    let type = []
    let rule = []
    let insuLocation = []
    let insuCompany = []
    insurance_Data1?.insurenceDataList.map((item) => {
      if (item?.dataType === 'INSU_CALC_ON') {
        calData.push(item)
      item?.selectedValue==='Y' ? setCalOnValue(item) : null 
      item?.selectedValue === 'Y' ? calculateInsurance() : null
      item?.selectedValue === 'Y' ? setSelectState(true) : null

      } else if (item?.dataType === 'INSU_TYPE') {
        type.push(item)
        item?.selectedValue==='Y' ? setTypevalue(item) : null 
      }
      else if (item?.dataType === 'INSU_DISCOUNT_CALC_RULE') {
        rule.push(item)
        item?.selectedValue==='Y' ? setDiscountRuleValue(item) : null 
        item?.selectedValue ==='Y' ?  calculateInsurance() : null
      }else if (item?.dataType === 'INSU_LOCATION') {
        insuLocation.push(item)
        item?.selectedValue==='Y' ? setLocationValue(item) : null 
      }else if (item?.dataType === 'INSU_COMPANY') {
        insuCompany.push(item)
        item?.selectedValue==='Y' ? setCompanyValue(item) : null 

      }
    })
    setCalOnData(calData)
    setTypeData(type)
    setDiscountRuleData(rule)
    setInsuranceLocation(insuLocation)
    setINSU_COMPANY(insuCompany)
    // generalMaster_Data?.selectMasterList?.map((item) => {
    //   if (item?.listType === 'INSU_COMPANY') {
    //       item?.basicList.map((items)=>{
    //         items?.isSelected==='Y' ? setCompanyValue(items) : null 
    //       })
    //     setINSU_COMPANY(item?.basicList)
    //   }
    // })

  }

  const getCompanychange=(camp,loc)=>{
    dispatch(emptyLoader_Action(true))
    let param = {
       brandCode: userData?.brandCode,
       countryCode: userData?.countryCode,
       companyId: userData?.companyId,
       userId: userData?.userId,
       ipAddress: "1::1",
       "docLocation": performaBasicInfo?.proformaList[0]?.docLocation,
       "docCode": performaBasicInfo?.proformaList[0]?.docCode,
       "docFY": performaBasicInfo?.proformaList[0]?.docFy,
       "docNo": performaBasicInfo?.proformaList[0]?.docNo,
       "insuCompany": camp,
       "insuLocation": loc
    };
    tokenApiCall(GetProformaInsuMasterCallBack, APIName.GetProformaInsuMaster, "POST", param);
  }

  const GetProformaInsuMasterCallBack = (res) => {
    console.log("searchTerm", JSON.stringify(res));
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
       setInsurance_Data(res?.result)
       fn_CompanyChange(res?.result)
       
     } else {
       dispatch(emptyLoader_Action(false))
       constant.showMsg(res.message);
    }
 }

 const fn_CompanyChange=(dataValue)=>{
  let insuranceHeadListTemp = dataValue?.insurenceHeadList.map((list, index) => {
    return { ...list, isChecked: list?.selectedValue, id: index };
  });
 


  otherRateData.map((item)=>{
    item?.title === dataValue?.insurenceDetail?.insuDisPer ? setOtherRateValue(item) : null
    item?.title === dataValue?.insurenceDetail?.idv2NildepAmount ? setDiscountDepValue(item) : null

  })
  dataValue?.insurenceDetail?.idv2NildepApply==='s' ? setNilDipCheckStatus(true) : null

  setIdvListData(dataValue?.idvList)
  dataValue?.idvList.map((item)=>{
    item?.isSelected === "Y" ? setIdvValue(item): null
  })
  setbasicPremiumList(dataValue?.basicPremiumList)
  setidvCalculationList(dataValue?.idvCalculationList)
  setinsurenceDataList(dataValue?.insurenceDataList)
  setinsurenceHeadList(insuranceHeadListTemp);
  setinsurenceDetail(dataValue?.insurenceDetail)
  setNilDipData(dataValue?.idvCalculationList)

  dataValue?.idvCalculationList.map((item)=>{
    item?.idv2NildepPercentage === dataValue?.insurenceDetail?.idv2NildepPer ? setNilDipSelectedData(item) : null
  })

  let calData = []
  let type = []
  let rule = []
  let insuLocation = []
  let insuCompany = []
  dataValue?.insurenceDataList.map((item) => {
    if (item?.dataType === 'INSU_CALC_ON') {
      calData.push(item)
    item?.selectedValue==='Y' ? setCalOnValue(item) : null 
    // item?.selectedValue === 'Y' ? calculateInsurance() : null
    item?.selectedValue === 'Y' ? setSelectState(true) : null

    } else if (item?.dataType === 'INSU_TYPE') {
      type.push(item)
      item?.selectedValue==='Y' ? setTypevalue(item) : null 
    }
    else if (item?.dataType === 'INSU_DISCOUNT_CALC_RULE') {
      rule.push(item)
      item?.selectedValue==='Y' ? setDiscountRuleValue(item) : null 
      // item?.selectedValue ==='Y' ?  calculateInsurance() : null
    }
  })
  setCalOnData(calData)
  setTypeData(type)
  setDiscountRuleData(rule)
  // setInsuranceLocation(insuLocation)
  // setINSU_COMPANY(insuCompany)
  // generalMaster_Data?.selectMasterList?.map((item) => {
  //   if (item?.listType === 'INSU_COMPANY') {
  //       item?.basicList.map((items)=>{
  //         items?.isSelected==='Y' ? setCompanyValue(items) : null 
  //       })
  //     setINSU_COMPANY(item?.basicList)
  //   }
  // })
 }

  const fn_SaveInsurance = () => {
    let temp = []
    insurenceHeadList?.map((item, index) => {
      if(item?.isChecked){
        let checkBoxParams = {
          "srNo": index+1,
          "insuCalcVersion": "" + item?.insuCalcVersionNo,
          "headCode": item?.headCode,
          "headAmount": Number(item?.headAmount)
        }
        temp.push(checkBoxParams)
      }
    })
    console.log("aaaaaa companyValue = ", companyValue)
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "docLocation": performaBasicInfo?.proformaList[0]?.docLocation,
      "docCode": performaBasicInfo?.proformaList[0]?.docCode,
      "docFY": performaBasicInfo?.proformaList[0]?.docFy,
      "docNo": performaBasicInfo?.proformaList[0]?.docNo,
      "insuranceYN": selectState ? "Y" : "N",
      "insuLocation": selectState ? locationValue?.dataValue : "",
      "insuCompanyCode": companyValue?.dataValue ? companyValue?.dataValue : "",
      "insuBasicPreAmount": Number(gross_Amt) + Number(loadingAmt),
      "insuGSTAmount": gstValue,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
      "insuranceType": typeValue?.dataValue,
      "insuSource": "Calculator",
      "insuranceCalcOn": calOnValue?.dataValue,
      "insuversion": rateValue?.insuCalcVersionNo,
      "insudiscrule": discountRuleValue?.dataValue,
      "basicpremiumperc1": rateValue?.basicPremiumPerc1,
      "basicpremiumperc2": rateValue?.basicPremiumPerc2,
      "ncb": ncbSelectedData?.title,
      "idv": idvListValue?.idvPer,
      "insudiscountperc": otherRateValue?.title,
      "insuAssetValueGross": priceValue,
      "insuAssetValueNet": idvValue,
      "insuLoadingAmt": loadingAmt,
      "idv2NildepApply": nilDipCheckStatus ? "Y" : "N",
      "idv2NildepPercentage": nilDipSelectedData?.idv2NildepPercentage === null ? 0 : nilDipSelectedData?.idv2NildepPercentage,
      "idv2NildepAmount": dep_Amt,
      "idv2NildepAddOnAmount": nilDipSelectedData?.idv2NildepAddOnAmount,
      "idv2NildepDiscountPercentage": Number(discountDepValue?.key),
      "idv2NildepDiscountAmount": Number(discount_DepAmt),
      "insuFinalDiscount": 0,
      "proformaHeadList":temp
    }
    tokenApiCall(SaveInsuranceCallBack, APIName.SaveProformaInsurance, "POST", param)
  }

  const SaveInsuranceCallBack = (res) => {
    console.log("savePackage", JSON.stringify(res))
    if (res.statusCode === 200) {
      if(res?.result?.resultCode==='Y'){
        constant.showMsg("Data save successfully")
        fn_Next()
      }else{
        fn_Next()
      }

    } else {
      constant.showMsg(res.message)
    }
  }

  const updateInsuranceCheckedList = (selectedData) => {
    console.log("selectedData = ", selectedData)
    let newArr = insurenceHeadList?.forEach((item) => {
      if (item.id === selectedData.id) {
        return (item.isChecked = !item.isChecked);
      }
    });
    setinsurenceHeadList([...insurenceHeadList])
    calculateInsurance()
  };

  const calculateInsurance = () => {
    let exShowRoomPrice = calOnValue?.dataValue === "EX_SHOWROOM_PRE_DISC" ? Number(insurance_Data?.exShowroomValueBeforeDiscount) : calOnValue?.dataValue === "ASSET_VALUE_POST_DISC" ? Number(insurance_Data?.vehFullValueAfterDiscount) : calOnValue?.dataValue === "ASSET_VALUE_PRE_DISC" ? Number(insurance_Data?.vehFullValueBeforeDiscount) :   Number(insurance_Data?.exShowroomValueAfterDiscount)
    setPriceValue(exShowRoomPrice)
    let idvCharnges = (exShowRoomPrice * (Number(idvListValue?.idvPer)))/100
    isNaN(idvCharnges) ? null : setIdvValue(Math.round(idvCharnges,0))
    let rateCharnges = (idvCharnges * (Number(rateValue?.basicPremiumPerc1)))/100
    let nilDipCharnges = 0
    // if(discountRuleValue?.dataValue === "BASIC_PRM_PRE_NCB_INC_NILDEP"){
      nilDipCharnges = nilDipCheckStatus ? ((idvCharnges * (Number(nilDipSelectedData?.idv2NildepPercentage)))/100) + ((idvCharnges * Number(nilDipSelectedData?.idv2NildepAddOnAmount)))/100 : 0
    // }
    let discountOnNilDep = (nilDipCharnges * (Number(discountDepValue?.key)))/100
    
    isNaN(discountOnNilDep) ? null :  setDiscountDepAmt(Math.round(discountOnNilDep,0))
    let totalDepAmount = Number(nilDipCharnges) - Number(discountOnNilDep)
    console.log("aaaaaaaaaa totalDepAmount = ", totalDepAmount)
    isNaN(nilDipCharnges) ? null :  setDep_Amt(Math.round(nilDipCharnges,0))
    let premiumAmountBeforeNcb = Number(rateCharnges) + Number(totalDepAmount)
    isNaN(premiumAmountBeforeNcb) ? null : setPremiumAmt_Before(Math.round(premiumAmountBeforeNcb,0))
    let ncbChanrges = (Number(premiumAmountBeforeNcb) * (Number(ncbSelectedData?.key)))/100
    console.log("aaaaaaaaaaaa ncbChanrges = ", ncbChanrges)
    let premiumAmountAfterNcb = Number(premiumAmountBeforeNcb) - Number(ncbChanrges)
    isNaN(premiumAmountAfterNcb) ? null :  setPremiumAmt_After(Math.round(premiumAmountAfterNcb,0))
    let otherDiscountAmount1 = 0//(Number(premiumAmountAfterNcb) * (Number(otherRateValue?.key)))/100

    if(discountRuleValue?.dataValue === "BASIC_PRM_PRE_NCB_INC_NILDEP"){
      otherDiscountAmount1 = (Number(premiumAmountBeforeNcb) * (Number(otherRateValue?.key)))/100
    }else if(discountRuleValue?.dataValue === "BASIC_PRM_PRE_NCB_EXC_NILDEP"){
      otherDiscountAmount1 = ((Number(premiumAmountBeforeNcb)-Number(totalDepAmount)) * (Number(otherRateValue?.key)))/100
    }else if(discountRuleValue?.dataValue === "BASIC_TOTAL_PRM_POST_NCB"){
      otherDiscountAmount1 = (Number(premiumAmountAfterNcb) * (Number(otherRateValue?.key)))/100
    }
    isNaN(otherDiscountAmount1) ? null : setOtherDiscountAmount(Math.round(otherDiscountAmount1,0))
    
    console.log("aaaaaaaaaaa otherDiscountAmount - ", otherDiscountAmount1)
    let premiumAmountAfterDiscount = Number(premiumAmountAfterNcb) - Number(otherDiscountAmount1)
    isNaN(premiumAmountAfterDiscount) ? null : setNetPremiumAmt(Math.round(premiumAmountAfterDiscount,0))
    let loadingAmount = 0;
    insurenceHeadList?.map((item) => {
      if(item.isChecked){
        loadingAmount = loadingAmount + Number(item?.headAmount)
      }
    })
    isNaN(loadingAmount) ? null : setLoadingAmt(Math.round(loadingAmount,0))
    let grossPremiumAmount = Number(premiumAmountAfterDiscount) + loadingAmount
    isNaN(grossPremiumAmount) ? null : setGrossAmt(Math.round(grossPremiumAmount,0))
    let grossPremiumAmountAfterGST = Number(grossPremiumAmount) + (Number(grossPremiumAmount) * 18)/100
    isNaN(grossPremiumAmountAfterGST) ? null : setTotalPayable(Math.round(grossPremiumAmountAfterGST,0))
    console.log("grossPremiumAmount = ", grossPremiumAmount)
    console.log("grossPremiumAmountAfterGST = ", grossPremiumAmountAfterGST)
    let gstAmount = grossPremiumAmountAfterGST-grossPremiumAmount
    isNaN(gstAmount) ? null : setGstValue(Math.round(gstAmount,0))
  };

  const resetDropDownDataThirdParty = () => {
    setLocationValue({})
    setCompanyValue({})
    setCalOnValue({})
    setIdvListValue({})
    setRateValue({})
    setNilDipCheckStatus(false)
    setNilDipSelectedData({})
    setDiscountDepValue({})
    setNcbSelectedData({})
    setDiscountRuleValue({})
    setOtherRateValue({})
  }

  const resetDropDownDataNoInsurance = () => {
    setTypevalue({})
    setLocationValue({})
    setCompanyValue({})
    setCalOnValue({})
    setIdvListValue({})
    setRateValue({})
    setNilDipCheckStatus(false)
    setNilDipSelectedData({})
    setDiscountDepValue({})
    setNcbSelectedData({})
    setDiscountRuleValue({})
    setOtherRateValue({})
  }

  const resetDropDownDataInsuranceCompany = (d,locVal) => {
    setCalOnValue({})
    setIdvListValue({})
    setRateValue({})
    setNilDipCheckStatus(false)
    setNilDipSelectedData({})
    setDiscountDepValue({})
    setNcbSelectedData({})
    setDiscountRuleValue({})
    setOtherRateValue({})

    setTotalPayable(0)
    setGstValue(0)
    setLoadingAmt(0)
    setGrossAmt(0)
    setNetPremiumAmt(0)
    setPremiumAmt_After(0)
    setPremiumAmt_Before(0)
    setDiscountDepAmt(0)
    setDep_Amt(0)
    setIdvValue(0)
    setPriceValue(0)
    getCompanychange(d?.dataValue,locVal?.dataValue)

    
  }
useEffect(()=>{
  calculateInsurance()
},[calOnValue,idvListValue,rateValue,nilDipSelectedData,discountDepValue,ncbSelectedData,discountRuleValue,otherRateValue])

  return (
    <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.cal_SubView2}>

        <Pressable onPress={()=>{
          setSelectState(!selectState)
          resetDropDownDataNoInsurance()
          }}>
          <View style={[styles.selectMainView]}>
            <Text style={styles.detailText}>Select</Text>
            <FastImage source={selectState ? images.checkIcon : images.unCheckIcon} style={styles.selectCheckIcon} />
          </View>
          </Pressable>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Source</Text>
            <SelectDropList
              list={sourceData}
              disable={!selectState}
              buttonExt={styles.dropList}
              refType={Object.keys(sourceValue).length===0 ?true : false}
              textExt={styles.dropListText}
              title={sourceValue?.description}
             on_Select={(d)=>setSourceValue(d)}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Type</Text>
            <SelectDropList
              list={typeData}
              desName='3'
              disable={!selectState}
              buttonExt={styles.dropList}
              refType={Object.keys(typeValue).length===0 ?true : false}
              title={typeValue?.dataDescription}
              textExt={styles.dropListText}
              on_Select={(d) => {
                setTypevalue(d)
                resetDropDownDataThirdParty()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Location</Text>
            <SelectDropList
              list={insuranceLocation}
              desName='3'
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              title={locationValue?.dataDescription}
              refType={Object.keys(locationValue).length===0 ?true : false}
              textExt={styles.dropListText}
              on_Select={(d) => setLocationValue(d)}
            />
          </View>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Company</Text>
            {console.log("company",companyValue)}
            <SelectDropList
              list={INSU_COMPANY}
              desName='3'
              refType={Object.keys(companyValue).length===0 ?true : false}
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              title={companyValue?.dataDescription}
              textExt={styles.dropListText}
              on_Select={(d) => {
                setCompanyValue(d)
                resetDropDownDataInsuranceCompany(d,locationValue)
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Calc On</Text>
            <SelectDropList
              list={calOnData}
              desName="3"
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
             title={calOnValue?.dataDescription}
             refType={Object.keys(calOnValue).length===0 ?true : false}
              textExt={styles.dropListText}
              on_Select={(d) => {
                setCalOnValue(d)
              //  setTimeout(()=>{calculateInsurance()},1000)  
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>IDV%</Text>
            <SelectDropList
              list={idvListData}
              desName='4'
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              refType={Object.keys(idvListValue).length===0 ?true : false}
              on_Select={(d) => {
                setIdvListValue(d)
                // calculateInsurance()
              }}
            />
          </View>
        
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Rate</Text>
            <SelectDropList
              list={basicPremiumList}
              desName='5'
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              refType={Object.keys(rateValue).length===0 ?true : false}
              on_Select={(d) => {
                console.log("rate selected = ", d)
                setRateValue(d)
                // calculateInsurance()
              }}
            />
          </View>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>NIL Dep.</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={()=> {selectState && (typeValue?.dataValue !== "THIRD_PARTY")? setNilDipCheckStatus(!nilDipCheckStatus) : null}}>
              <FastImage source={nilDipCheckStatus ? images.checkIcon : images.unCheckIcon} style={[styles.checkboxStyle, { marginRight: constant.moderateScale(10) }]} />
              </Pressable>
              <SelectDropList
                list={nilDipData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                desName='6'
                disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
                disable={!nilDipCheckStatus}
                refType={Object.keys(nilDipSelectedData).length===0 ?true : false}
               on_Select={(d)=>{
                console.log("nildip selected = ", d)
                setNilDipSelectedData(d)
                // calculateInsurance()
               }}
              />
            </View>
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Discount on Dep.</Text>
            <SelectDropList
              list={otherRateData}
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              title={discountDepValue.description}
              refType={Object.keys(discountDepValue).length===0 ?true : false}
              textExt={styles.dropListText}
              on_Select={(d) => {
                setDiscountDepValue(d)
                // calculateInsurance()
              }}
            />
          </View>

          {/* <View style={[styles.selectMainView]}>
            <Text style={styles.detailText}>Select</Text>
            <Text style={styles.detailText}>-</Text>
          </View> */}

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>NCB</Text>
            <SelectDropList
              list={ncbRateData}
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              title={ncbSelectedData?.description}
              refType={Object.keys(ncbSelectedData).length===0 ?true : false}
              on_Select={(d) => {
                setNcbSelectedData(d)
                // calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Discount Rule</Text>
            <SelectDropList
              list={discountRuleData}
              desName='3'
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              title={discountRuleValue?.dataDescription}
              refType={Object.keys(discountDepValue).length===0 ?true : false}
              on_Select={(d) => {
                console.log("dis rule selected = ", d)
                setDiscountRuleValue(d)
                // calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10), opacity: selectState===false || typeValue?.dataValue === "THIRD_PARTY" ? 0.4 : 1  }]}>
            <Text style={styles.detailText}>Discount Rate</Text>
            <SelectDropList
              list={otherRateData}
              disable={!selectState || (typeValue?.dataValue === "THIRD_PARTY")}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              title={otherRateValue?.description}
              refType={Object.keys(otherRateValue).length===0 ?true : false}
              on_Select={(d) => {
                console.log("rate selected = ", d)
                setOtherRateValue(d)
                // calculateInsurance()
              }}
            />
          </View>


          <FlatList
            numColumns={2}
            data={insurenceHeadList}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Pressable style={styles.bottomMainView} onPress={() => { selectState ?updateInsuranceCheckedList(item) : null }}>
                    <FastImage
                      source={item?.isChecked ? images.checkIcon : images.unCheckIcon}
                      style={styles.checkboxStyle}
                    />
                    <Text style={styles.text4}>{item?.headDescription}</Text>
                  </Pressable>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />

          <View style={{ flex: 1, backgroundColor: '#F9F9F9', borderRadius: 10, marginHorizontal: constant.moderateScale(3), paddingHorizontal: constant.moderateScale(0), marginTop: constant.moderateScale(13), paddingVertical: constant.moderateScale(10), marginBottom: constant.moderateScale(20) }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Value</Text>
                <Text style={styles.text6}>{priceValue}</Text>
              </View>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>IDV Value</Text>
                <Text style={styles.text6}>{idvValue}</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Dep. Amt</Text>
                <Text style={styles.text6}>{dep_Amt}</Text>
              </View>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Discount on Dep Amt</Text>
                <Text style={styles.text6}>{discount_DepAmt}</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
            
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Premium Amt</Text>
                <Text style={styles.text6}>{permiumAmt_Before} <Text style={styles.text7}>(Before NCB)</Text></Text>
              </View>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Premium Amt</Text>
                <Text style={styles.text6}>{permiumAmt_After} <Text style={styles.text7}>(After NCB)</Text></Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
            
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Net Premium Amt</Text>
                <Text style={styles.text6}>{net_PremiumAmt} <Text style={styles.text7}>(After Discount)</Text></Text>
              </View>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Gross Premium Amt</Text>
                <Text style={styles.text6}>{gross_Amt}</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Loading Amt</Text>
                <Text style={styles.text6}>{loadingAmt}</Text>
              </View>
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>GST</Text>
                <Text style={styles.text6}>{gstValue}</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
             
              <View style={[styles.bottomMainView2, {}]}>
                <Text style={styles.text5}>Total Premium Payable</Text>
                <Text style={styles.text6}>{totalPayable}</Text>
              </View>
            </View>

          </View>

          {/* <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text2}>0</Text>
            </View> */}

          {/* <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10)}}>
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(0)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text3}>0</Text>
            </View> 
            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Gross Premium Amt</Text>
             <Text style={styles.text3}>0</Text>
            </View> 
            </View> */}

        </View>
        <Button title='Next' click_Action={() => fn_SaveInsurance()} buttonExt={styles.performaButton} />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  cal_SubView2: {
    flex: 1,
    backgroundColor: constant.whiteColor,
    marginBottom: constant.moderateScale(6),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  performaButton: {
    marginBottom: constant.moderateScale(30),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(70),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
  },
  detailMainView: {
    paddingHorizontal: constant.moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: constant.moderateScale(5)
  },
  detailText: {
    fontSize: constant.moderateScale(14),
    color: '#424242',
    width: constant.moderateScale(150),
    fontFamily: constant.typeLight
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
  selectMainView: {
    paddingHorizontal: constant.moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    marginTop: constant.moderateScale(8)
  },
  selectCheckIcon: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25)
  },
  middleMainView: {
    paddingHorizontal: constant.moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: constant.moderateScale(8)
  },
  text2: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
    marginRight: constant.moderateScale(15)
  },
  text3: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
    marginRight: constant.moderateScale(11)
  },
  bottomMainView: {
    paddingHorizontal: constant.moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: constant.moderateScale(5)
  },
  checkboxStyle: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25)
  },
  text4: {
    fontSize: constant.moderateScale(14),
    color: constant.textColor,
    fontFamily: constant.typeMedium,
    marginLeft: constant.moderateScale(11)
  },
  text5: {
    fontSize: constant.moderateScale(13),
    color: '#00000042',
    fontFamily: constant.typeRegular,
    marginLeft: constant.moderateScale(11)
  },
  text6: {
    fontSize: constant.moderateScale(14),
    color: '#000',
    fontFamily: constant.typeRegular,
    marginLeft: constant.moderateScale(11),
    marginTop: constant.moderateScale(2)
  },
  bottomMainView2: {
    // paddingHorizontal:constant.moderateScale(8),
    // flexDirection:'row',
    // alignItems:'center',
    flex: 1,
    paddingVertical: constant.moderateScale(5)
  },
  text7: {
    fontSize: constant.moderateScale(14),
    color: '#000',
    fontFamily: constant.typeLight,
    marginLeft: constant.moderateScale(11)
  }

})