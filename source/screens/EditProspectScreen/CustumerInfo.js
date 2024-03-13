import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CalenderModal from '../../components/CalenderModal';
import moment from 'moment';

export default function CustumerInfo(props) {
    const { data,prospectMaster, prospectDetail,profile_Data, modelData} = props
    const dispatch = useDispatch()
    const [active, setActive] = useState(1)
    const [destination,setDestination] = useState("")
    const [prospectTypeData,setProspectData] = useState([])
    const [prospectTypeValue,setProspectTypeValue] = useState({})
    const [gender,setGender] = useState(true)
    const [materialStaus,setMaterialStatus] = useState("N")
    const [aniversary_Modal, setAniversary_Modal] = useState(false)
    const [aniversaryDate,setAniversaryDate] = useState("")
    const [dob_Modal, setDob_Modal] = useState(false)
    const [dob,setDob] = useState("")
    const [note,setNote] = useState("")
    const [companyTypeList,setCompanyTypeList] = useState([])
    const [companyTypeValue,setCompanyTypeValue] = useState({})
    const [occupationList,setOccupationList] = useState([])
    const [occupationValue,setOccupationValue] = useState({})
    const [ageGroupList,setAgeGroupList] = useState([])
    const [ageGroupValue,setAgeGroupValue]  = useState({})
    const [designationList,setDesignationList] = useState([])
    const [designationValue,setDesignationValue] = useState({})
    const [turnoverList,setTurnoverList] = useState([])
    const [turnoverValue,setTurnoverValue] = useState({})
    const [purchaseTypeList,setPurchaseList] = useState([])
    const [financerList,setFinancerList] = useState([])
    const [financerValue,setFinancerValue] = useState({})
    const [usesTypeList,setUsesTypeList] = useState([])
    const [usesTypeValue,setUsesTypeValue] = useState({})
    const [customerProfile,setCustomerProfile] = useState({})
    const [purchaseTypeData,setPurchaseTypeData] = useState([])
    const [purchaseTypeValue,setPurchaseTypeValue] = useState({})
    const [paymenttypeData,setPaymentTypeData] = useState([])
    const [paymenttypeValue,setPaymentTypeValue] = useState({})
    const [compModelData,setCompModelData] = useState([])
    const [compModelValue,setCompModelValue] = useState({})
    const [downPaymentData,setDownPaymentData] = useState([])
    const [downPaymentValue,setDownPaymentValue] = useState('')
    const [interestData,setInterestData] = useState([])
    const [interestValue,setInterestValue] = useState({})
    const [loadTenureData,setLoadTenureDate] = useState([])
    const [loadTenureValue,setTenureValue] = useState({})
    const [emiRate,setEmiRate ] = useState('')
    const [purchaseVisible,setPurchaseVisible] = useState(false)

    const [usageFreqData,setUsageFreqData] = useState([])
    const [usageFreqValue,setUsageFreqValue] = useState({})
    const [typeTravellingData,setTravelingData] = useState([])
    const [typeTravellingValue,setTravelingValue] = useState({})
    const [usagePaymentData,setUsagePaymentData] = useState([])
    const [usagePaymentValue,setUsagePaymentValue] = useState({})
    const [typeBodyData,setTypeBodyData] = useState([])
    const [typeBodyValue,setTypeBodyValue] = useState({})

    const [additionLeafData,setAdditionLeafData] = useState([])
    const [additionLeafValue,setAdditionLeafValue] = useState({})
    const [distanceDayData,setDistanceDayData] = useState([])
    const [distanceDayValue,setDistanceDayValue] = useState({})

    const [averageData,setAverageData] = useState([])
    const [averageValue,setAverageValue] = useState({})
    const [loadBodyData,setLoadBodyData] = useState([])
    const [loadBodyDataValue,setLoadBodyDataValue] = useState({})
    const [drivenMostlyData,setDrivernMostlyData] = useState([])
    const [drivenMostyleValue,setDrivenMostlyValue] = useState({})
    const [reasonChooseData,setReasonChooseData] = useState([])
    const [reasonChooseValue,setReasonChooseValue] = useState({})
    const [triggerPurcahseData,setTriggerPurchaseData] = useState([])
    const [triggerPurchaseValue,setTriggerPurchaseValue] = useState({})
    const [cabinData,setCabinData] = useState([])
    const [cabinValue,setCabinValue] = useState({})
    const [anyModificationData,setAnyModificationData] = useState([])
    const [anyModificationDataValue,setAnyModificationValue] = useState({})
    const [reasonPurcahseData,setReasonPurchasedata] = useState([])
    const [reasonPurchaseValue,setReasonPurcahsevalue] = useState({})


    const [v_UsageData,setV_UsageData] = useState([])
    const [v_UsageValue,setV_UsageValue] = useState({})
    const [v_BodyTypeData,setV_BodyTypeData] = useState([])
    const [v_BodyTypeValue,setV_BodyTypeValue] = useState({})
    const [v_BrandData,setV_BrandData] = useState([])
    const [v_BrandValue,setV_BrandValue] = useState({})
    const [v_ModelData,setV_ModelData] = useState([])
    const [v_ModelValue,setV_ModelValue] = useState({})
    const [v_VarientData,setV_VarientData] = useState([])
    const [v_VarientValue,setV_VarientValue] = useState({})
    const [purchaseYearData,setPurchaseYearData] = useState([])
    const [purchaseYearValue,setPurchaseYearValue] = useState({})
    const [qtyData,setQtyData] = useState([])
    const [qtyValue,setQtyValue] = useState([])






   useEffect(()=>{
     setCompanyTypeList(profile_Data?.companyTypeList)
     setOccupationList(profile_Data?.occupationList)
     setAgeGroupList(profile_Data?.ageGroupList)
     setDesignationList(profile_Data?.designationList)
     setTurnoverList(profile_Data?.turnoverList)
     setPurchaseList(profile_Data?.purchaseTypeList)
     setFinancerList(profile_Data?.financerList)
     setUsesTypeList(profile_Data?.usesTypeList)
     setCustomerProfile(profile_Data?.individualCustomerProfile)
     setMaterialStatus(profile_Data?.individualCustomerProfile?.marriedStatus)
     console.log("dob",profile_Data?.individualCustomerProfile?.dob)
     setDob(moment(profile_Data?.individualCustomerProfile?.dob).format("DD-MMM-YYYY"))

     let purchase_ = []
     let payment_ =[]
     let comp_ = []
     let downPayment_ = []
     let interestRate_ = []
     let load_Tenure = []
        profile_Data?.purchaseTypeList.map((item)=>{
        if(item?.dataType === "PURCHASE_TYPE"){
          purchase_.push(item)
        }else if(item?.dataType === "PAYMENT_TYPE"){
            payment_.push(item)
        }else if(item?.dataType === "COMP_MODELS"){
            comp_.push(item)
        }else if(item?.dataType === "DOWN_PAYMENT"){
            downPayment_.push(item)
        }else if(item?.dataType === "INTEREST_RATE"){
            interestRate_.push(item)
        }else if(item?.dataType === "LOAN_TENURE"){
            load_Tenure.push(item)
        }
     })

     setPurchaseTypeData(purchase_)
     setPaymentTypeData(payment_)
     setUsagePaymentData(payment_)
     setCompModelData(comp_)
     setDownPaymentData(downPayment_)
     setInterestData(interestRate_)
     setLoadTenureDate(load_Tenure)

    let usageFreq = []
    let typeTravel = []
    let paymentType = []
    let AvgSpeed = []
    let loadBody = []
    let driveMost = []
    let reasonChoose = []
    let triggerPurchase = []
    let Cabin = []
    let anyModification = []
    let reasonPurchase = []
    let bodyBuild = []
    let distancePerDay = []
    let loadCapicty = []
    let leafSpring = []
    let BodyType = []
    let reasonIsuz = []

    profile_Data?.usesTypeList.map((item)=>{
          if(item?.dataType === 'USAGE_FREQUENCY'){
           usageFreq.push(item)
          }else if(item?.dataType === 'TRAVEL_TYPE'){
           typeTravel.push(item)
          }else if(item?.dataType === 'BODY_BUILT_TYPE'){
            bodyBuild.push(item)
           }else if(item?.dataType === 'LOAD_CAPACITY'){
            loadCapicty.push(item)
           }else if(item?.dataType === 'ADD_LEAF_SPRING'){
            leafSpring.push(item)
           }else if(item?.dataType === 'DIST_PER_DAY'){
            distancePerDay.push(item)
           }else if(item?.dataType === 'AVERAGE_SPEED'){
            AvgSpeed.push(item)
           }else if(item?.dataType === 'LOAD_BODY'){
            loadBody.push(item)
           }else if(item?.dataType === 'MAIN_DRIVER'){
            driveMost.push(item)
           }else if(item?.dataType === 'REASON_ISUZU'){
            reasonIsuz.push(item)
           }else if(item?.dataType === 'CABIN'){
            Cabin.push(item)
           }else if(item?.dataType === 'REASON_CHOOSE'){
            reasonChoose.push(item)
           }else if(item?.dataType === 'MODIFICATION'){
            anyModification.push(item)
           }else if(item?.dataType === 'REASON_PURCHASE'){
            reasonPurchase.push(item)
           }
    })

  setUsageFreqData(usageFreq)
  setTravelingData(typeTravel)
  setTypeBodyData(bodyBuild)
  setAdditionLeafData(leafSpring)
  setDistanceDayData(distancePerDay)
  setAverageData(AvgSpeed)
  setLoadBodyData(loadBody)
  setDrivernMostlyData(driveMost)
  setReasonPurchasedata(reasonPurchase)
  setCabinData(Cabin)
  setAnyModificationData(anyModification)
  setReasonChooseData(reasonIsuz)
   },[profile_Data])

  

    const fn_TabClick = (type) => {
        console.log("type")
        type === active ? setActive(0) : setActive(type)
        // setActive(type)
      
    }

    const fn_SelectPaymentType=(d)=>{
        setPaymentTypeValue(d)
        d.dataCode === 'LOAN' ? setPurchaseVisible(true) : setPurchaseVisible(false)
    }

 

    return (
        <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={{flex:1,backgroundColor:constant.whiteColor,borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingBottom:constant.moderateScale(20)}}>

           <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(1)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>User Details</Text>
                 <FastImage source={ active===1 ? images.downArrow : images.rightArrow} style={active===1 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===1 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Occupation<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={occupationList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setOccupationValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Age<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={ageGroupList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setAgeGroupValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Designation</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={designationList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setDesignationValue(d)}
           />
            </View>
                {/* <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput> */}
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Annual Family Income</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={turnoverList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setTurnoverValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Gender</Text>
            <View style={styles.mobileSubView}>
           <Pressable style={styles.radioButton} onPress={()=>setGender(true)}>
            <MaterialCommunityIcons name={gender ? 'radiobox-marked' : 'radiobox-blank'} style={gender ? styles.readioIcon2 : styles.readioIcon} />
            <Text style={styles.materialText}  >Male</Text>
           </Pressable>
           <Pressable style={styles.radioButton} onPress={()=>setGender(false)}>
            <MaterialCommunityIcons name={gender ? 'radiobox-blank' :'radiobox-marked' } style={ gender ? styles.readioIcon : styles.readioIcon2} />
            <Text style={styles.materialText}  >Female</Text>
           </Pressable>
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Material Status</Text>
            <View style={styles.mobileSubView}>
           <Pressable style={styles.radioButton} onPress={()=>setMaterialStatus("N")}>
            <MaterialCommunityIcons name={materialStaus=== "N" ? 'radiobox-marked' :'radiobox-blank'} style={[materialStaus==="N" ? styles.readioIcon2 : styles.readioIcon]} />
            <Text style={styles.materialText}  >Single</Text>
           </Pressable>
           <Pressable style={styles.radioButton} onPress={()=>setMaterialStatus("Y")}>
            <MaterialCommunityIcons name={materialStaus==="N" ? 'radiobox-blank' : 'radiobox-marked' } style={materialStaus==="N" ? styles.readioIcon : styles.readioIcon2} />
            <Text style={styles.materialText}  >Married</Text>
           </Pressable>
            </View>
        </View>
         

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Anniversary date</Text>
            <Pressable style={styles.calenderMainView} onPress={()=>setAniversary_Modal(true)}>
       <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{aniversaryDate}</TextInput>
       <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
    </Pressable>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Family Size</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
       <Text style={styles.detailText}>DOB</Text>
    <Pressable style={styles.calenderMainView} onPress={()=>setDob_Modal(true)}>
       <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{dob}</TextInput>
       <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
    </Pressable>
   </View>
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Notes</Text>
                <TextInput onChangeText={(d)=>setNote(d)} style={[styles.input1,{height:constant.moderateScale(80),textAlignVertical:'top'}]} >{note}</TextInput>
        </View>
     
        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(2)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Purchased / Financed</Text>
                 <FastImage source={ active===2 ? images.downArrow : images.rightArrow} style={active===2 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===2 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Purchase Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={purchaseTypeData}
             buttonExt={styles.dropList}
             desName="2"
             textExt={styles.dropListText}
             on_Select={(d)=>setPurchaseTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Payment Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={paymenttypeData}
             buttonExt={styles.dropList}
             desName="2"
             textExt={styles.dropListText}
             on_Select={(d)=>fn_SelectPaymentType(d)}
           />
            </View>
        </View>

       {purchaseVisible && <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Competion Models<Text style={styles.text2}>*</Text></Text>
             <View style={styles.mobileSubView}>
            <SelectDropList 
             list={compModelData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setCompModelValue(d)}
           />
            </View>
                {/* <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput> */}
        </View>
}

{purchaseVisible &&   <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Down Payment (Rs.)<Text style={styles.text2}>*</Text></Text>
           
                <TextInput onChangeText={(d)=>setDownPaymentValue(d)} style={styles.input1} >{downPaymentValue}</TextInput>
        </View>
}
        
{purchaseVisible &&  <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>EMI/Interest rate (Rs.)<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setEmiRate(d)} style={styles.input1} >{emiRate}</TextInput>
        </View>
}
{purchaseVisible &&   <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Loan Tenure in months<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={loadTenureData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setTenureValue(d)}
           />
            </View>
        </View>
}

{purchaseVisible &&   <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Bank/Financer Name</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={financerList}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setFinancerValue(d)}
           />
            </View>
        </View> 
}

        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(3)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Usage [SCAB]</Text>
                 <FastImage source={ active===3 ? images.downArrow : images.rightArrow} style={active===3 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===3 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage Frequency</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={usageFreqData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setUsageFreqValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Type of Travelling</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={typeTravellingData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setTravelingValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Payment Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={usagePaymentData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setUsagePaymentValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Type of Body Built<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={typeBodyData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setTypeBodyValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Additional Leaf Spring<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={additionLeafData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setAdditionLeafValue(d)}
           />
            </View>
        </View>
        
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Distance Per Day</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={distanceDayData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setDistanceDayValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Average Speed</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={averageData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setAverageValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Load body<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={loadBodyData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setLoadBodyDataValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Driven Mostly by</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={drivenMostlyData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setDrivenMostlyValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Reason to Choose ISUZU<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={reasonChooseData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setReasonChooseValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Trigger to Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Cabin<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={cabinData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setCabinValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Any Modifications intend to do<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={anyModificationData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setAnyModificationValue(d)}
           />
            </View>
        </View> 

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Reason to Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={reasonPurcahseData}
             desName="2"
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setReasonPurcahsevalue(d)}
           />
            </View>
        </View> 

        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(4)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Vehicles Owned</Text>
                 <FastImage source={ active===4 ? images.downArrow : images.rightArrow} style={active===4 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===4 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Body Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Year of Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Qty</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(5)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Vehicles Replaced</Text>
                 <FastImage source={ active===5 ? images.downArrow : images.rightArrow} style={active===5 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===5 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Body Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Year of Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Qty</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        </View>
}
</View>
<Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

     </ScrollView>

     <CalenderModal
        isVisible={aniversary_Modal}
        onRequestClose={() => setAniversary_Modal(false)}
        onDateClick={(data) => {setAniversaryDate(moment(data.timestamp).format("DD-MMM-yyyy")),setAniversary_Modal(false)}}
      />

<CalenderModal
        isVisible={dob_Modal}
        onRequestClose={() => setDob_Modal(false)}
        onDateClick={(data) => {setDob(moment(data.timestamp).format("DD-MMM-yyyy")),setDob_Modal(false)}}
      />
        </View>
    );
}

const styles = StyleSheet.create({
    headerImageStyle:{
        height:undefined,
        width:undefined,
        marginHorizontal:constant.moderateScale(8),
       marginBottom:constant.moderateScale(2),
       elevation:1
  
      },
      up_ListText:{
        fontSize:constant.moderateScale(13),
        color:'#3B3B3B',
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(18)
      },
      upRightArrow:{
        height:constant.moderateScale(16),
        width:constant.moderateScale(16),
        marginRight:constant.moderateScale(10)
      },
      upRightArrow2:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25),
        marginRight:constant.moderateScale(10)
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
            width:constant.resW(19),
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
        //    paddingHorizontal:0
          },
          dropNameListText:{
              fontSize:constant.moderateScale(14),
              color:constant.textColor,
              fontFamily:constant.typeLight,
          },
          refInput:{
            height:constant.moderateScale(40),
            flex:1,
            backgroundColor:constant.whiteColor,
            color:'#4AAA38',
            fontFamily:constant.typeMedium,
            fontSize:constant.moderateScale(15)
          },
          coutMainView:{
           flex:1,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'center'
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
            materialText:{
                color:'#000000',
                fontFamily:constant.typeRegular,
                fontSize:constant.moderateScale(13),
                marginLeft:constant.moderateScale(7)
            },
            radioButton:{
            flexDirection:'row',
            alignItems:'center',
            flex:1,
            paddingVertical:constant.moderateScale(5)
            },
            readioIcon:{
             fontSize:constant.moderateScale(25),
             color:'#BEBEBE',

            },
            readioIcon2:{
                fontSize:constant.moderateScale(25),
                color:constant.red,
                
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