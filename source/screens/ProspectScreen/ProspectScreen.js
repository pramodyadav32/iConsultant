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
  const [actionCal_Modal,setActionCal_Modal] =  useState(false)
  const [timeSlotModal,setTimeSlotModal] = useState({show:false,date:''})

  useEffect(() => {
    // fn_GetSearchCust()
    fn_GetProspectMaster()
  },[])

  const fn_GetSearchCust = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "type": "E",
      "value": "",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(getSearchCustCallBack, APIName.GetCustomerSearchResults, "POST", param)
  }

  const getSearchCustCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message)
    }
  }

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

  const GetProspectMasterCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
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


  const fn_TabClick = (type) => {
    setActive(type)
  }

  const fn_DateSelect=(data)=>{
    setCalenderModalShow(false)
  }

  const fn_ActionDateSelect=(data)=>{
    setActionCal_Modal(false)
    console.log("data",data)
    setTimeSlotModal({show:true,date:data})
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Mobile No.<Text style={styles.text2}>*</Text></Text>
              <View style={styles.mobileSubView}>
                <TextInput style={styles.input1} keyboardType='numeric'>+91 8470068493</TextInput>
                <Pressable style={styles.searchButtonStyle}>
                  <FastImage source={images.search} resizeMode='contain' style={styles.searchStyle} />
                </Pressable>
              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Entity<Text style={styles.text2}>*</Text></Text>
              <TextInput style={styles.input1} keyboardType='numeric'>+91 8470068493</TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Name<Text style={styles.text2}>*</Text></Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={[]}
                  title='Mr.'
                  buttonExt={styles.dropNameList}
                  textExt={styles.dropNameListText}
                />
                <TextInput style={[styles.input1, { marginLeft: '2%' }]} >Alfred Rosario</TextInput>

              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Email ID</Text>
              <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>State<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>City<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>PIN</Text>
              <TextInput style={styles.input1} >124001</TextInput>
            </View>

            <View style={styles.bottomMainView}>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Source</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Reference</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Usage</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
              </View>
              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>Closure Date</Text>
                <Pressable style={styles.calenderMainView} onPress={() => setCalenderModalShow(true)}>
                  <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}></TextInput>
                  <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
                </Pressable>
              </View>

              <View style={styles.detailMainView2}>
                <Text style={styles.detailText}>rating</Text>
                <SelectDropList
                  list={[]}
                  title='Please Select'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
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
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>
            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Edition<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Varient</Text>
              <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Style<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Exterior<Text style={styles.text2}>*</Text></Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
              />
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Internal</Text>
              <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>MY/VY</Text>
              <View style={styles.mobileSubView}>
                <SelectDropList
                  list={[]}
                  title='2024'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />
                <Text> </Text>
                <SelectDropList
                  list={[]}
                  title='2024'
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                />

              </View>
            </View>

            <View style={styles.detailMainView}>
              <Text style={styles.detailText}>Assembly Type</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
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
                  <Pressable style={styles.coutButton}>
                    <FastImage source={images.minussign} tintColor={constant.red} resizeMode='contain' style={styles.minusStyle} />
                  </Pressable>
                  <View style={styles.countInput}>
                    <Text style={styles.countInputText}>{count}</Text>
                  </View>

                  <Pressable style={styles.coutButton}>
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
              <Pressable style={styles.calenderMainView} onPress={()=>setActionCal_Modal(true)}>
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
        onDateClick={(data)=> fn_DateSelect(data)}
      />

<CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data)=> fn_ActionDateSelect(data)}
      />
      
      <ProspectActionSlotScreen
        isVisible={timeSlotModal.show}
        onRequestClose={() => setTimeSlotModal(s=>{return{...s,show:false}})}
        date={timeSlotModal.date}
      />
    </SafeAreaView>
  )
}
