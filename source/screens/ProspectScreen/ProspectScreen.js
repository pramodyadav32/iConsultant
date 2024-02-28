import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ProspectStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import CalenderModal from '../../components/CalenderModal';
import ProspectActionSlotScreen from './ProspectActionSlotScreen';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';
import moment from 'moment';

const data = [
  { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
  { 'key': 2, "title": 'Help Center', 'source': images.info, 'screenName': 'HomeScreen' },
  { 'key': 3, "title": 'Privacy Policy', 'source': images.lock, 'screenName': 'HomeScreen' },
  { 'key': 4, "title": 'Logout', 'source': images.logout, 'screenName': 'HomeScreen' },
]

export default function ProspectScreen(props) {
  const { navigation } = props
  const { userData } = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()
  const [active, setActive] = useState(1)
  const [count, setCount] = useState(0)
  const [calenderModalShow, setCalenderModalShow] = useState(false)
  const [actionCal_Modal, setActionCal_Modal] = useState(false)
  const [timeSlotModal, setTimeSlotModal] = useState({ show: false, date: '',vehicleList:[],slotList:[] })
  const [stateData, setStateData] = useState([])
  const [stateValue, setStateValue] = useState({})
  const [cityData, setCityData] = useState([])
  const [cityValue, setCityValue] = useState({})
  const [title, setTitle] = useState([])
  const [titleValue, setTitleValue] = useState({})
  const [referenceData, setReferenceData] = useState([])
  const [referenceValue, setReferenceValue] = useState({})
  const [sourceData, setSourceData] = useState([])
  const [sourceValue, setSourceValue] = useState({})
  const [ratingData, setRatingData] = useState([])
  const [ratingValue, setRatingValue] = useState({})
  const [usageData, setUsageData] = useState([])
  const [usageValue, setUsageValue] = useState({})
  const [entityData, setEntityData] = useState([])
  const [entityValue, setEntityValue] = useState({})
  const [mobileno, setMobileNo] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [generlCloserdata, setGeneralClosureData] = useState('')
  const [name, setName] = useState("")
  const [email,setEmail] = useState('')

  const [modelData, setModalData] = useState([])
  const [modelValue, setModelValue] = useState({})
  const [editionData, setEditionData] = useState([])
  const [editionValue, setEditionValue] = useState({})
  const [assemblyData, setAssemblyData] = useState([])
  const [assemblyValue, setAssemblyValue] = useState({})
  const [varientData, setvarientData] = useState([])
  const [varientValue, setVarientValue] = useState({})
  const [styleData, setStyleData] = useState([])
  const [styleValue, setStyleValue] = useState({})
  const [exteriorData,setExteriorData] = useState([])
  const [exteriorValue,setExteriorValue] = useState({})
  const [inteiorData,setInteriorData] = useState([])
  const [interiorValue,setInteriorValue] = useState({})
  const [my_Data,setMyData] = useState([])
  const [my_DataValue,setMyDataValue] = useState({})
  const [vy_Data,setVyData] = useState([])
  const [vy_DataValue,setVyDataValue] = useState({})

  const [actionData,setActionDate] = useState('')

  useEffect(() => {
    fn_GetProspectMaster()
    fn_GetVehicleMaster ()
  }, [])


  const fn_GetProspectTagList = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "type": "E",
      "value": "",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetProspectTagListCallBack, APIName.ProspectTagList, "POST", param)
  }

  const GetProspectTagListCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }

  const fn_GetProspectMaster = () => {
    dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchCode": "MADU01",
      "calledBy": "INTERNATIONAL_CALLING_CODE,ENTITY,TITLE,STATE,CITY,REFERENCE,SOURCE,RATING,USAGE,DEALCATEGORY,DEALTYPE,CORPORATE,PURCHASE_INTENTION,PROSPECT_CATEGORY,IMPORTANCE,FINANCER,DRIVEN_BY,GENDER,SALES_CONSULTANT,CUST_TYPE,COMPETITION_MODELS,CORRESPONDENCE_ADDRESS",
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
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {
      await res.result.map((item) => {
        if (item.listType === 'ENTITY') {
          setEntityData(item.prospectMasterList)
        } else if (item.listType === 'TITLE') {
          setTitle(item.prospectMasterList)
        } else if (item.listType === 'STATE') {
          setStateData(item.prospectMasterList)
        } else if (item.listType === 'CITY') {
          setCityData(item.prospectMasterList)
        } else if (item.listType === 'REFERENCE') {
          setReferenceData(item.prospectMasterList)
        } else if (item.listType === 'SOURCE') {
          setSourceData(item.prospectMasterList)
        } else if (item.listType === 'RATING') {
          setRatingData(item.prospectMasterList)
        } else if (item.listType === 'USAGE') {
          setUsageData(item.prospectMasterList)
        }
      })
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_GetGeneralMasterList = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "type": "E",
      "value": "",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetGeneralMasterListCallBack, APIName.GeneralMasterList, "POST", param)
  }

  const GetGeneralMasterListCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }

  const fn_GetSearchCust = () => {
    if (mobileno === '') { constant.showMsg("Please enter mobile no") }
    else if (mobileno.length != 10) { constant.showMsg('Please enter valid mobile no') }
    else {
      let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "type": "M",
        "value": mobileno,
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
      }
      tokenApiCall(getSearchCustCallBack, APIName.GetCustomerSearchResults, "POST", param)
    }
  }

  const getSearchCustCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }

  const fn_SaveNewProspect = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchCode": "string",
      "prospectLocation": "string",
      "title": "string",
      "entity": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "suffix": "string",
      "regnState": "string",
      "regnCity": "string",
      "pincode": "string",
      "email": "string",
      "contactName": "string",
      "mobile": "string",
      "assembly": "string",
      "edition": "string",
      "source": "string",
      "usage": "string",
      "refFrom": "string",
      "firstAction": "string",
      "actionDate": "string",
      "actionComment": "string",
      "campaign": 0,
      "dealerCompanyDocket": "string",
      "corporateFlag": "string",
      "dealType": "string",
      "approveFlag": "string",
      "corporateComment": "string",
      "salesperson": "string",
      "projectedClosureDate": "string",
      "hour": "string",
      "demoVehModel": "string",
      "demoVehVariant": "string",
      "demoVehChassisNo": "string",
      "make": "string",
      "subModel": "string",
      "model": "string",
      "qty": 0,
      "color": "string",
      "interiorColor": "string",
      "style": "string",
      "my": 0,
      "vy": 0,
      "activeRate": "string",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
      "slotMins": "string",
      "slotCount": 0,
      "valueString": "string",
      "testDriveZone": "string",
      "teamCode": "string"
    }
    tokenApiCall(SaveNewProspectCallBack, APIName.SaveNewProspect, "POST", param)
  }

  const SaveNewProspectCallBack = (res) => {
    console.log("saveProspect", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }

  const fn_GetVehicleMaster = () => {
    // dispatch(emptyLoader_Action(true))
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "calledBy": "EDITION,ASSEMBLY,MODEL,VARIANT,STYLE,MY,VY,EXT_COLOR,INT_COLOR",
      "edition": "",
      "assembly": "",
      "subModel": "",
      "model": "",
      "code": "",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetVehicleMasterCallBack, APIName.GetVehicleMaster, "POST", param)
  }

  const GetVehicleMasterCallBack = async (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {
      await res.result.map((item) => {
        if (item.listType === 'EDITION') {
          setEditionData(item.vehicleMaster)
        } else if (item.listType === 'ASSEMBLY') {
          setAssemblyData(item.vehicleMaster)
        }else if (item.listType === 'MODEL') {
          setModalData(item.vehicleMaster)
        }else if (item.listType === 'VARIANT') {
          setvarientData(item.vehicleMaster)
        }else if (item.listType === 'STYLE') {
          setStyleData(item.vehicleMaster)
        }else if (item.listType === 'EXT_COLOR') {
          setExteriorData(item.vehicleMaster)
        }else if (item.listType === 'INT_COLOR') {
          setInteriorData(item.vehicleMaster)
        }else if (item.listType === 'VY') {
          setVyData(item.vehicleMaster)
        }else if (item.listType === 'MY') {
          setMyData(item.vehicleMaster)
        }
      })
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_TabClick = (type) => {
    setActive(type)
  }

  const fn_DateSelect = (data) => {
    setCalenderModalShow(false)
    setGeneralClosureData(moment(data.timestamp).format("DD-MM-yyyy"))
  }

  const fn_ActionDateSelect = (data) => {
    setActionDate(moment(data.timestamp).format("DD-MM-yyyy"))
    setTimeSlotModal(s=>{return{ ...s,date: data }})
    fn_GetActionSlots()
  }

  const fn_GetDemoVehicleList=()=>{
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "calledBy": "MODEL",
      "model": "DMAX",
      "loginUserCompanyId": "ORBIT",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetDemoVehicleListCallBack, APIName.GetDemoVehicleList, "POST", param)
  }

  const GetDemoVehicleListCallBack= async (res) => {
    console.log("searchvehi", JSON.stringify(res))
    if (res.statusCode === 200) {
      setActionCal_Modal(false)
      setTimeSlotModal(s=>{return{ ...s,show:true,vehicleList: res?.result?.demoVehicleList }})
      dispatch(emptyLoader_Action(false))

    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_GetActionSlots=()=>{
    dispatch(emptyLoader_Action(true))
  let param = {
    "brandCode": userData?.brandCode,
    "countryCode": userData?.countryCode,
    "companyId": userData?.companyId,
    "branchcode": "MADU01",
    "calledBy": "TIME_SLOTS",
    "actionCode": "",
    "chassisNo": "",
    "empCode": "",
    "date": "2024-02-21T09:10:47.522Z",
    "loginUserId": userData?.userId,
    "ipAddress": "1::1"
  }
  tokenApiCall( GetActionSlotsCallBack, APIName.GetActionSlots, "POST", param)
}

const  GetActionSlotsCallBack= async (res) => {
  console.log("searchvehi", JSON.stringify(res))
  if (res.statusCode === 200) {
    setTimeSlotModal(s=>{return{ ...s,slotList:res.result?.actionSlotList}})
    fn_GetDemoVehicleList()
  } else {
    dispatch(emptyLoader_Action(false))
    constant.showMsg(res.message)
  }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
      <StatusBar translucent={false} backgroundColor={constant.blackColor} />
      <CommonHeader title='Create Prospect' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />

      <View style={styles.mainTopView}>
        <View style={styles.tabMainView}>
          <View style={styles.tabSubView}>
            <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
              <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>General</Text>
              {active === 1 && <View style={styles.horixontalLine} />}
            </Pressable>
            <Pressable style={active === 2 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(2)} >
              <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Vehicle</Text>
              {active === 2 && <View style={styles.horixontalLine} />}
            </Pressable>
            <Pressable style={active === 3 ? [styles.tabButton, { flex: 0.6 }] : [styles.tabButton2, { flex: 0.6 }]} onPress={() => fn_TabClick(3)} >
              <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Actions</Text>
              {active === 3 && <View style={styles.horixontalLine} />}
            </Pressable>
          </View>
        </View>
        {active === 1 &&
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Mobile No.<Text style={styles.text2}>*</Text></Text>
              <View style={styles.mobileSubView}>
                <TextInput style={styles.input1} onChangeText={(d) => setMobileNo(d)} keyboardType='numeric'>{mobileno}</TextInput>
                <Pressable style={styles.searchButtonStyle} onPress={() => fn_GetSearchCust()}>
                  <FastImage source={images.search} resizeMode='contain' style={styles.searchStyle} />
                </Pressable>
              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Entity<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={entityData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setUsageValue(d)}
              />
              {/* <TextInput style={styles.input1} keyboardType='numeric'>+91 8470068493</TextInput> */}
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Name<Text style={styles.text2}>*</Text></Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={title}
                  title=''
                  buttonExt={styles.dropNameList}
                  textExt={styles.dropNameListText}
                  on_Select={(d) => setTitleValue(d)}
                />
                <TextInput onChangeText={(d) => setName(d)} style={[styles.input1, { marginLeft: '2%' }]} >{name}</TextInput>

              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Email ID</Text>
              <TextInput onChangeText={(d) => setEmail(d)} style={styles.input1} >{email}</TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>State<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={stateData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setStateValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>City<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={cityData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setCityValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>PIN</Text>
              <TextInput style={styles.input1} keyboardType='numeric' onChangeText={(d) => setPinCode(d)} >{pinCode}</TextInput>
            </View>

            <View style={styles.bottomMainView}>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Source</Text>
                <SelectDropList
                  list={sourceData}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setSourceValue(d)}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Reference</Text>
                <SelectDropList
                  list={referenceData}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setReferenceValue(d)}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Usage</Text>
                <SelectDropList
                  list={usageData}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setUsageValue(d)}
                />
              </View>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Closure Date</Text>
                <Pressable style={styles.calenderMainView} onPress={() => setCalenderModalShow(true)}>
                  <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{generlCloserdata}</TextInput>
                  <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
                </Pressable>
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>rating</Text>
                <SelectDropList
                  list={ratingData}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setRatingValue(d)}
                />
              </View>
            </View>
            <Button
              title='Proceed'
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
            />
          </ScrollView>
        }

        {active === 2 &&
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={modelData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setModelValue(d)}
              />
            </View>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Edition<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={editionData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setEditionValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Varient</Text>
              <SelectDropList
                list={varientData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setVarientValue(d)}
              />
              {/* <TextInput style={styles.input1} >a.r@gmail.com</TextInput> */}
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Style<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={styleData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setStyleValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Exterior<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={exteriorData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setEditionValue(d)}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Internal</Text>
              <SelectDropList
                list={inteiorData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setInteriorValue(d)}
              />
              {/* <TextInput style={styles.input1} >a.r@gmail.com</TextInput> */}
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>MY/VY</Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={my_Data}
                  title=' '
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setMyDataValue(d)}
                />
                <Text> </Text>
                <SelectDropList
                  list={vy_Data}
                  title=' '
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setVyDataValue(d)}
                />

              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Assembly Type</Text>
              <SelectDropList
                list={assemblyData}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setAssemblyValue(d)}
              />
            </View>

            <View style={styles.bottomMainView}>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Fuel</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Reference</Text>
                <TextInput style={styles.refInput} >Available</TextInput>

              </View>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Count</Text>
                <View style={styles.coutMainView}>
                  <Pressable style={styles.coutButton} onPress={()=> count <= 0 ? null : setCount(count-1)}>
                    <FastImage source={images.minussign} tintColor={constant.red} resizeMode='contain' style={styles.minusStyle} />
                  </Pressable>
                  <View style={styles.countInput}>
                    <Text style={styles.countInputText}>{count}</Text>
                  </View>

                  <Pressable style={styles.coutButton} onPress={()=> setCount(count+1)}>
                    <FastImage source={images.add} tintColor={constant.red} resizeMode='contain' style={styles.minusStyle} />
                  </Pressable>
                </View>
              </View>

            </View>
            <Button
              title='Proceed'
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
            />
          </ScrollView>
        }

        {active === 3 &&
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Date<Text style={styles.text2}>*</Text></Text>
              <Pressable style={styles.calenderMainView} onPress={() => setActionCal_Modal(true)}>
                <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}></TextInput>
                <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
              </Pressable>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>From</Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={[]}
                  title='Mr.'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
                <Text> </Text>
                <SelectDropList
                  list={[]}
                  title='Mr.'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />

              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>VIN</Text>
              <TextInput placeholder='Type here' style={styles.input1} ></TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Regn.<Text style={styles.text2}>*</Text></Text>
              <TextInput placeholder='Type here' style={styles.input1} ></TextInput>
            </View>

            <View style={[styles.detailMainView, { alignItems: 'flex-start' }]}>
              <Text style={[styles.detailText, { marginTop: '3%' }]}>Action Comment</Text>
              <TextInput placeholder='Enter Comment' style={styles.commentInput} ></TextInput>
            </View>


            <Button
              title='Proceed'
              buttonExt={styles.proceedButton}
              textExt={styles.proccedButtonText}
            />
          </ScrollView>
        }
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
        onRequestClose={() => setTimeSlotModal(s => { return { ...s, show: false } })}
        date={timeSlotModal.date}
        vehicleList = {timeSlotModal.vehicleList}
        slotList = {timeSlotModal.slotList}
      />
    </SafeAreaView>
  )
}
