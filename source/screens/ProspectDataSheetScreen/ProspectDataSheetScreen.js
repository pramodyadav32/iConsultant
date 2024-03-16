import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './ProspectDataSheetStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DataSheetModal from '../../components/DataSheetModal';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';
import moment from 'moment';

const data = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data2 = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

export default function ProspectDataSheetScreen(props) {
   const { navigation, route } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(1)
   const [animatedValue] = useState(new Animated.Value(1));
   const [detailModal, setDetailModal] = useState(false)
   const [cardData, setcardData] = useState(route.params.cardData)
   const [prospectBasicInfo, setProspectBasicInfo] = useState({})
   const [dataSheet, setDataSheet] = useState({})
   const [prospectInfo, setProspectInfo] = useState({})
   const [actionInfo,setActionInfo] = useState([])
   const interpolateX = animatedValue.interpolate({
      inputRange: [0, 1, 2, 3, 4], // Adjust based on the number of tabs
      outputRange: [0, constant.resW(3), constant.resW(26), tabWidth, constant.resW(79)],
   });

   useEffect(() => {
       fn_GetProspectBasicInfo()
      // fn_GetProspectDetail()
      // fn_GetDataSheetDetail()
   }, [])

   const fn_GetDataSheetDetail = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo": Number(route.params.cardData?.prospectId),
         "calledBy": "PROSPECT_ID",
         "type": "",
         "code": "",
         "status": "All",
         "loginUserCompanyId": userData?.userCompanyId,
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
         "actionDate": "29-Feb-2024"
      }
      tokenApiCall(GetDataSheetDetailCallBack, APIName.GetActionsList, "POST", param)
   }

   const GetDataSheetDetailCallBack = (res) => {
      console.log("Actiomsearch", JSON.stringify(res))
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setDataSheet(res?.result?.actionInfoList[0])
         //  setProspectBasicInfo(res.result?.prospectBasicInfo)
      } else {
         constant.showMsg(res.message)
      }
   }

   const fn_GetProspectBasicInfo = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo": Number(route.params.cardData?.prospectId),
         "loginUserCompanyId": userData?.userCompanyId,
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
      }
      tokenApiCall(GetProspectBasicInfoCallBack, APIName.GetProspectBasicInfo, "POST", param)
   }

   const GetProspectBasicInfoCallBack = (res) => {
      console.log("search", JSON.stringify(res))
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setProspectBasicInfo(res.result?.prospectBasicInfo)
         setActive(1)
         Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
         }).start();
      } else {
         constant.showMsg(res.message)
      }
   }

   const fn_GetProspectDetail = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo": Number(route.params.cardData?.prospectId),
         "loginUserCompanyId": userData?.userCompanyId,
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",

      }
      tokenApiCall(GetProspectDetailCallBack, APIName.GetProspectDetails, "POST", param)
   }

   const GetProspectDetailCallBack = (res) => {
      console.log("search adadad = ", JSON.stringify(res))
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setProspectInfo(res.result?.prospectDetails)
         setActive(3)
         Animated.timing(animatedValue, {
            toValue: 3,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
         }).start();
      } else {
         constant.showMsg(res.message)
      }
   }



   const renderItem = ({ item, index }) => {
      console.log("iiiitem = ", item)
      return (
         <ImageBackground source={images.listCard} resizeMode='cover' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
            <Pressable style={styles.driveListMainView}  >
             {prospectBasicInfo?.isOlmCase === "Y" && <Pressable style={styles.driveListTopView1} onPress={() => setDetailModal(true)}>
                  <Text style={styles.text2}>OLM</Text>
                  <AntDesign name='close' style={styles.closeIcon} />
               </Pressable>
          }
               <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, }}>
                     <FastImage source={{ uri: item?.modelImgUrl }} resizeMode='contain' style={styles.carImage} />
                     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'center', flex: 1, paddingRight: constant.moderateScale(18) }]}>
                           <Text style={styles.listName3}>PID : </Text>
                           <Text style={[styles.listName3]}>{item?.prospectId}</Text>
                        </View>
                        <View style={styles.cardHorLine} />
                     </View>
                  </View>
                  <View style={{ flex: 1.8 }}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Prospect Name</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>{item?.title} {item?.firstName} {item?.lastName}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Model</Text>
                           <Text style={styles.listName3}>{item?.model}</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Mobile No</Text>
                           <Text style={styles.listName3}>{item?.custMobile}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Projected Closure Date</Text>
                           <Text style={styles.listName3}>{moment(item?.projectedCloserDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Rating</Text>
                           <Text style={styles.listName3}>{item?.prospectRating}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Color</Text>
                           <Text style={styles.listName3}>{item?.vehColor}</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </Pressable>
         </ImageBackground>
      )
   }

   const fn_TabClick = (type) => {

      if (type === 1) {
         setActive(type)
         Animated.timing(animatedValue, {
            toValue: type,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
         }).start();
      } else if (type === 2) {
         setActive(2)
         Animated.timing(animatedValue, {
            toValue: 2,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
         }).start();
      } else if (type === 3) {
         fn_GetProspectDetail()
      }else if(type===4){
         fn_GetActionDetail()
      }else{
         setActive(type)
      }
   }

   const fn_GetActionDetail = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "calledBy": "PROSPECT_ID",
         "prospectNo": Number(route.params.cardData?.prospectId),
          "type": "",
         "code": "",
         "status": "A",
         "loginUserCompanyId": userData?.userCompanyId,
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
         "actionDate": ""

      }
      tokenApiCall(GetActionDetailCallBack, APIName.GetActionsList, "POST", param)
   }

   const GetActionDetailCallBack = (res) => {
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setActionInfo(res.result?.actionInfoList)
         setActive(4)
         Animated.timing(animatedValue, {
            toValue: 4,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
         }).start();
      } else {
         constant.showMsg(res.message)
      }
   }

   const actionRenderItem = ({ item, index }) => {
      return (
         <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
               <View style={[styles.driveListDetailSubView, {}]}>
                  <Text style={styles.listText2}>Action</Text>
                  <Text style={styles.listText3}>{item?.actionDescription}</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Due on </Text>
                  <Text style={styles.listText3}>{moment(item?.dueOn, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Stutus</Text>
                  <Text style={styles.listText3}>{item?.statusDesc}</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Completed on</Text>
                  <Text style={styles.listText3}>{item?.performedOn === null ? "" : moment(item?.performedOn, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Remarks</Text>
                  <Text style={styles.listText3}>{item?.remark}</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Projected Closure Date</Text>
                  <Text style={styles.listText3}>{moment(item?.projectedCloserDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
               </View>
            </View>



         </View>
      )
   }

   const prospectInfoRenderItem = ({ item, index }) => {

      return (
         index === 0 ?
            <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
               <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
                  <View style={[styles.driveListDetailSubView, {}]}>
                     <Text style={styles.listText2}>Address(Res)</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resAddress1} {prospectInfo?.resAddress2} {prospectInfo?.resAddress3}</Text>
                  </View>
                  <View style={styles.driveListDetailSubView2}>
                     <Text style={styles.listText2}>State </Text>
                     <Text style={styles.listText3}>{prospectInfo?.resState}</Text>
                  </View>
               </View>

               <View style={styles.driveListDetailView}>
                  <View style={styles.driveListDetailSubView}>
                     <Text style={styles.listText2}>City</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resCity}</Text>
                  </View>
                  <View style={styles.driveListDetailSubView2}>
                     <Text style={styles.listText2}>Sub-Zone</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resSubZone}</Text>
                  </View>
               </View>

               <View style={styles.driveListDetailView}>
                  <View style={styles.driveListDetailSubView}>
                     <Text style={styles.listText2}>District</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resDistrict}</Text>
                  </View>
                  <View style={styles.driveListDetailSubView2}>
                     <Text style={styles.listText2}>PIN</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resPincode}</Text>
                  </View>
               </View>

               <View style={styles.driveListDetailView}>
                  <View style={styles.driveListDetailSubView}>
                     <Text style={styles.listText2}>Phone</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resPhone}</Text>
                  </View>
                  <View style={styles.driveListDetailSubView2}>
                     <Text style={styles.listText2}>Fax</Text>
                     <Text style={styles.listText3}>{prospectInfo?.resFax}</Text>
                  </View>
               </View>

            </View>
            : index === 1 ?
               <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Address(Regn)</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnAddress1} {prospectInfo?.regnAddress2} {prospectInfo?.regnAddress3}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>State </Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnState}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>City</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnCity}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Sub-Zone</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnSubZone}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>District</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnDistrict}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>PIN</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnPincode}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Phone</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnPhone}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Fax</Text>
                        <Text style={styles.listText3}>{prospectInfo?.regnFax}</Text>
                     </View>
                  </View>

               </View>
               :
               <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
                  <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
                     <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Address(Off)</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcAddress1} {prospectInfo?.offcAddress2} {prospectInfo?.offcAddress3}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>State </Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcState}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>City</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcCity}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Sub-Zone</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcSubZone}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>District</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcDistrict}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>PIN</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcPincode}</Text>
                     </View>
                  </View>

                  <View style={styles.driveListDetailView}>
                     <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Phone</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcPhone}</Text>
                     </View>
                     <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Fax</Text>
                        <Text style={styles.listText3}>{prospectInfo?.offcFax}</Text>
                     </View>
                  </View>

               </View>

      )
   }

   const fn_Create = () => {
      props.navigation.navigate("PerformaScreen",{"cardData" : route.params?.cardData})
   }

   const fn_Edit=()=>{
      props.navigation.navigate("EditProspectScreen",{"cardData" : route.params?.cardData})

   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
         <StatusBar translucent={false} backgroundColor={constant.blackColor} />
         <CommonHeader title='Prospect Datasheet' 
         edit={true} showInfo={false} 
         mainExt={styles.drawerStyle} 
         onBack={() => navigation.goBack()}
         editClick={()=>fn_Edit()}
         />
         <View>
            <FlatList
               data={[cardData]}
               renderItem={renderItem}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(5))}
               ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
               ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
            />
         </View>

         <View style={styles.cal_SubView}>
            <View style={styles.tabMainView}>
               <View style={styles.tabSubView}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
                     <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Data Sheet</Text>
                      {active===1 && <View style={[styles.horixontalLine]} />}
                  </Pressable>
                  <Pressable style={active === 2 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(2)} >
                     <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Basic Info</Text>
                     {active===2 && <View style={[styles.horixontalLine]} />}
                 
                  </Pressable>
                  <Pressable style={active === 3 ? [styles.tabButton, { width: constant.resW(30), }] : [styles.tabButton2, { width: constant.resW(30) }]} onPress={() => fn_TabClick(3)} >
                     <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Prospect Info</Text>
                     {active===3 && <View style={[styles.horixontalLine]} />}
                 
                  </Pressable>
                  <Pressable style={active === 4 ? [styles.tabButton, { width: constant.resW(20)}] : [styles.tabButton2, { width: constant.resW(20)}]} onPress={() => fn_TabClick(4)} >
                     <Text style={active === 4 ? styles.tabButtonText : styles.tabButtonText2}>Actions</Text>
                     {active===4 && <View style={[styles.horixontalLine]} />}
                  
                  </Pressable>
                  <Pressable style={active === 5 ? [styles.tabButton, {}] : [styles.tabButton2, {}]} onPress={() => fn_TabClick(5)} >
                     <Text style={active === 5 ? styles.tabButtonText : styles.tabButtonText2}>Performa</Text>
                     {active===5 && <View style={[styles.horixontalLine]} />}
                  
                  </Pressable>
                  </ScrollView>
               </View>
               
               {/* <Animated.View
                  style={[styles.horixontalLine, {
                     transform: [{ translateX: interpolateX }],
                  }]}
               >
               </Animated.View> */}
            </View>
            {
               active === 1 &&
               <View style={{ flex: 1, paddingHorizontal: '1%', paddingBottom: constant.moderateScale(15) }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                        <View style={[styles.driveListDetailSubView, {}]}>
                           <Text style={styles.listText2}>Prospect Stage</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.prospectStage}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Usage</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.usageDescription}</Text>
                     </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Reference</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.referenceId}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Compaings</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.campaignCode}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Importance</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.importance}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>General Comments</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.generalComment}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Finance Case</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.financeCaseFlag === 'N' ? "No" : "Yes"}</Text>
                     </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Current Action</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.currentActionDesc} on {moment(prospectBasicInfo?.currentActionDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
                        </View>
                     </View>
                 <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Action Comment</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.comment}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Project Closure</Text>
                           <Text style={styles.listText3}>{moment(prospectBasicInfo?.projectedClosureDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
                        </View>
                     </View>

                   
                  </ScrollView>
               </View>
            }
            {
               active === 2 &&
               <View style={{ flex: 1, paddingHorizontal: '1%' }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(15) }]}>
                        <View style={[styles.driveListDetailSubView, {}]}>
                           <Text style={styles.listText2}>Opened on</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.prospectOpenedOn}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>OLM Lead</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.isOlmCase=== 'N' ? "No" : "Yes"}</Text>
                        </View>
                     </View>
                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Price Quote</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.priceQuote==='N'? "No" : "Yes"}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>source</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.sourceDescription}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Customer Refrence</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.custReference}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Finance Case</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.financeCaseFlag==="N" ? "No" : "Yes"}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Financer</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.financerDesc}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Finance Location</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.financerLocation}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Corporate Case</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.isCorporateCase==="N" ? "No" : "Yes"}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Deal Category</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.dealCategoryDesc}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Deal Type</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.dealType}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Company</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.dealCompanyDesc}</Text>
                        </View>
                     </View>

                     <View style={styles.driveListDetailView}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Corporate Case Comment</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.corporateComment}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>General Comment</Text>
                           <Text style={styles.listText3}>{prospectBasicInfo?.generalComment}</Text>
                        </View>

                     </View>
                  </ScrollView>
               </View>
            }
            {active === 3 &&
               <View style={{ flex: 1 }}>
                  <FlatList
                     data={data2}
                     showsVerticalScrollIndicator={false}
                     renderItem={prospectInfoRenderItem}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
                  />

               </View>
            }
            {active === 4 &&
               <View style={{ flex: 1 }}>
                  <FlatList
                     data={actionInfo}
                     renderItem={actionRenderItem}
                     showsVerticalScrollIndicator={false}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}

                  />
               </View>
            }
            {
               active === 5 &&
               <View style={{ flex: 1, paddingHorizontal: '1%' }}>
               <ScrollView showsVerticalScrollIndicator={false}>
                
            
               </ScrollView>
            </View>
            }
         </View>
       {active != 5 ?
         <Button title='Create Proforma' click_Action={() => null} buttonExt={styles.performaButton} />
       
       :

         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
         <Button title='Cancel Proforma' click_Action={() => null} buttonExt={styles.cancelPerformaButton} />
         <Pressable style={styles.printerPerformaButton}>
            <FastImage source={images.notify} style={styles.printerImage} />
         </Pressable>
         <Pressable style={styles.sharePerformaButton}>
            <FastImage source={images.notify} style={styles.printerImage} />
         </Pressable>
         </View>
}

         <DataSheetModal
            isVisible={detailModal}
            onRequestClose={() => setDetailModal(false)}

         />
      </SafeAreaView>
   )
}
