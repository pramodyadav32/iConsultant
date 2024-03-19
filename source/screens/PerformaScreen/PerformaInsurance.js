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

const data2 = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const otherRateData = [
  { "key": 0, title: 0, description: 0 },
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
  { "key": 0, title: 0, description: 0 },
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
  const { navigation, insurance_Data, generalMaster_Data, insuranceLoc_Data,performaBasicInfo } = props
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
  const [loadingAmt,setLoadingAmt] = useState(0)
  const [gross_Amt,setGrossAmt] = useState(0)
  const [gstValue,setGstValue] = useState(0)
  const [totalPayable,setTotalPayable] = useState(0)
  const [priceValue,setPriceValue] = useState(0)


  useEffect(() => {

   let insuranceHeadListTemp = insurance_Data?.insurenceHeadList.map((list, index) => {
      return { ...list, isChecked: false, id: index };
    });
    console.log("generalMaster_Data ==== ", JSON.stringify(generalMaster_Data))
    setIdvListData(insurance_Data?.idvList)
    setbasicPremiumList(insurance_Data?.basicPremiumList)
    setidvCalculationList(insurance_Data?.idvCalculationList)
    setinsurenceDataList(insurance_Data?.insurenceDataList)
    setinsurenceHeadList(insuranceHeadListTemp);
    setinsurenceDetail(insurance_Data?.insurenceDetail)
    setNilDipData(insurance_Data?.idvCalculationList)

    let calData = []
    let type = []
    let rule = []
    insurance_Data?.insurenceDataList.map((item) => {
      if (item?.dataType === 'INSU_CALC_ON') {
        calData.push(item)
      } else if (item?.dataType === 'INSU_TYPE') {
        type.push(item)
      }
      else if (item?.dataType === 'INSU_DISCOUNT_CALC_RULE') {
        rule.push(item)
      }
    })
    setCalOnData(calData)
    setTypeData(type)
    setDiscountRuleData(rule)
    generalMaster_Data?.selectMasterList?.map((item) => {
      if (item?.listType === 'INSU_COMPANY') {
        setINSU_COMPANY(item?.basicList)
      }
    })

  }, [insurance_Data, generalMaster_Data])

  const fn_SaveInsurance = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "docLocation": performaBasicInfo?.proformaList[0]?.docLocation,
      "docCode": performaBasicInfo?.proformaList[0]?.docCode,
      "docFY": performaBasicInfo?.proformaList[0]?.docFy,
      "docNo": performaBasicInfo?.proformaList[0]?.docNo,
      "insuranceYN": "string",
      "insuLocation": "string",
      "insuCompanyCode": "string",
      "insuBasicPreAmount": 0,
      "insuGSTAmount": 0,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
    }
    tokenApiCall(SaveInsuranceCallBack, APIName.SaveProformaInsurance, "POST", param)
  }

  const SaveInsuranceCallBack = (res) => {
    console.log("savePackage", JSON.stringify(res))
    if (res.statusCode === 200) {

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
    let exShowRoomPrice = generalMaster_Data?.vehPrice?.exShowromPrice
    setPriceValue(exShowRoomPrice)
    let idvCharnges = (exShowRoomPrice * (Number(idvListValue?.idvPer)))/100
    setIdvValue(idvCharnges)
    let rateCharnges = (idvCharnges * (Number(rateValue?.basicPremiumPerc1)))/100
    let nilDipCharnges = nilDipCheckStatus ? (idvCharnges * (Number(nilDipSelectedData?.idv2NildepPercentage) + Number(nilDipSelectedData?.idv2NildepAddOnAmount)))/100  : 0
    let discountOnNilDep = (nilDipCharnges * (Number(discountDepValue?.key)))/100
    setDiscountDepAmt(discountOnNilDep)
    let totalDepAmount = Number(nilDipCharnges) - Number(discountOnNilDep)
    setDep_Amt(totalDepAmount)
    let premiumAmountBeforeNcb = Number(rateCharnges) + Number(totalDepAmount)
    setPremiumAmt_Before(premiumAmountBeforeNcb)
    let ncbChanrges = (Number(premiumAmountBeforeNcb) * (Number(ncbSelectedData?.key)))/100
    let premiumAmountAfterNcb = Number(premiumAmountBeforeNcb) - Number(ncbChanrges)
    setPremiumAmt_After(premiumAmountAfterNcb)
    let otherDiscountAmount = (Number(premiumAmountAfterNcb) * (Number(otherRateValue?.key)))/100
    let premiumAmountAfterDiscount = Number(premiumAmountAfterNcb) - Number(otherDiscountAmount)
    setNetPremiumAmt(premiumAmountAfterDiscount)
    let loadingAmount = 0;
    insurenceHeadList?.map((item) => {
      if(item.isChecked){
        loadingAmount = loadingAmount + Number(item?.headAmount)
      }
    })
    setLoadingAmt(loadingAmount)
    let grossPremiumAmount = Number(premiumAmountAfterDiscount) + loadingAmount
    setGrossAmt(grossPremiumAmount)
    let grossPremiumAmountAfterGST = Number(grossPremiumAmount) * 18/100
    setTotalPayable(grossPremiumAmountAfterGST)
    let gstAmount = grossPremiumAmountAfterGST-grossPremiumAmount
    setGstValue(gstAmount)
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.cal_SubView2}>

        <Pressable onPress={()=>setSelectState(!selectState)}>
          <View style={[styles.selectMainView]}>
            <Text style={styles.detailText}>Select</Text>
            <FastImage source={selectState ? images.checkIcon : images.unCheckIcon} style={styles.selectCheckIcon} />
          </View>
          </Pressable>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Source</Text>
            <SelectDropList
              list={[]}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
            //  on_Select={(d)=>setActionTypeValue(d)}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Type</Text>
            {console.log("typeData", typeData)}

            <SelectDropList
              list={typeData}
              desName='3'
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setTypevalue(d)}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Location</Text>
            <SelectDropList
              list={insuranceLoc_Data}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setLocationValue(d)}
            />
          </View>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Company</Text>
            <SelectDropList
              list={INSU_COMPANY}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setCompanyValue(d)}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Calc On</Text>
            <SelectDropList
              list={calOnData}
              desName="3"
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                setCalOnValue(d)
                calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>IDV%</Text>
            <SelectDropList
              list={idvListData}
              desName='4'
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("idv selected = ", d)
                setIdvListValue(d)
                calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Rate</Text>
            <SelectDropList
              list={basicPremiumList}
              desName='5'
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("rate selected = ", d)
                setRateValue(d)
                calculateInsurance()
              }}
            />
          </View>
          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>NIL Dep.</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={()=>setNilDipCheckStatus(!nilDipCheckStatus)}>
              <FastImage source={nilDipCheckStatus ? images.checkIcon : images.unCheckIcon} style={[styles.checkboxStyle, { marginRight: constant.moderateScale(10) }]} />
              </Pressable>
              <SelectDropList
                list={nilDipData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                desName='6'
                disable={!selectState}
                disable={!nilDipCheckStatus}
               on_Select={(d)=>{
                console.log("nildip selected = ", d)
                setNilDipSelectedData(d)
                calculateInsurance()
               }}
              />
            </View>
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Discount on Dep.</Text>
            <SelectDropList
              list={otherRateData}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("dis on dep selected = ", d)
                setDiscountDepValue(d)
                calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.selectMainView]}>
            <Text style={styles.detailText}>Select</Text>
            <Text style={styles.detailText}>-</Text>
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>NCB</Text>
            <SelectDropList
              list={ncbRateData}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("ncb selected = ", d)
                setNcbSelectedData(d)
                calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Discount Rule</Text>
            <SelectDropList
              list={discountRuleData}
              desName='3'
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("dis rule selected = ", d)
                setDiscountRuleValue(d)
                calculateInsurance()
              }}
            />
          </View>

          <View style={[styles.detailMainView, { marginTop: constant.moderateScale(10) }]}>
            <Text style={styles.detailText}>Rate</Text>
            <SelectDropList
              list={otherRateData}
              disable={!selectState}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => {
                console.log("rate selected = ", d)
                setOtherRateValue(d)
                calculateInsurance()
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