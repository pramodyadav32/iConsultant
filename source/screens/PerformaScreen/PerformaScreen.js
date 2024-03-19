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
import AntDesign from "react-native-vector-icons/AntDesign";
import DataSheetModal from "../../components/DataSheetModal";
import AddPackageModel from "./AddPackageModel";
import PerformaBasicInfo from "./PerformaBasicInfo";
import AddPartListModel from "./AddPartListModel";
import PerformaPackage from "./PerformaPackage";
import PerformaAccessories from "./PerformaAccessories";
import PerformaTerm from "./PerformaTerm";
import PerformaInsurance from "./PerformaInsurance";
import PerformaRegistration from "./PerformaRegistration";
import moment from 'moment';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';
import DownloadPerforma from "./DownloadPerforma";

const data = [
   {
      key: 1,
      title: "Your Profile",
      source: images.profile,
      screenName: "HomeScreen",
   },
];

const data2 = [
   {
      key: 1,
      title: "Your Profile",
      source: images.profile,
      screenName: "HomeScreen",
   },
   {
      key: 2,
      title: "Your Profile",
      source: images.profile,
      screenName: "HomeScreen",
   },
   {
      key: 3,
      title: "Your Profile",
      source: images.profile,
      screenName: "HomeScreen",
   },
];

const data3 = [
   { key: 1, title: "Basic Info" },
   { key: 2, title: "Accessories" },
   // { 'key': 3, "title": 'Package', },
   { key: 4, title: "Insurance" },
   { key: 5, title: "RTO" },
   { key: 6, title: "Term" },
   { key: 7, title: "Proforma" },

];

export default function PerformaScreen(props) {
   const { navigation, route } = props
   const dispatch = useDispatch()
   const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(0)
   const [animatedValue] = useState(new Animated.Value(1));
   const [detailModal, setDetailModal] = useState(false)
   const [packageModel, setPackageModel] = useState(false)
   const [addListModel, setAddListModel] = useState(false)
   const [vehiclePricedetail, setVehiclePriceDetail] = useState({})
   const [termData, settermData] = useState([])
   const [performaTaxMaster, setPerformaTaxMaster] = useState();
   const [performaBasicDataHeader, setPerformaBasicDataHeader] = useState();
   const [proformaGeneralMasters, setProformaGeneralMasters] = useState();
   const [performaNo,setPerformaNo] = useState(0)


   const [insuranceData, setInsuranceData] = useState({})
   const [generalMasterData,setGeneralMasterData] = useState({})
   const [ins_Location,setins_Location] = useState([])
   const [reg_Data,setReg_Data] = useState({})
   const [intrestedVehicleList,setintrestedVehicleList] = useState({})
   const [performHeaderData,setPerformHeaderData] = useState({})
   const [invoiceData,setInvoiceData] = useState("")

   console.log("cardData", route.params.cardData)
   useEffect(() => {
       fn_GetProspectBasicInfo()
      //  fn_GetVehiclePriceInfo()
      // fn_GetProspectDetail()
      // fn_GetProformaTaxMasters()
   }, [])

   const fn_GetProformaGeneralMasters = (data) => {
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "prospectNo": Number(route.params.cardData?.prospectId),
         "proformaId": 0,
         "assembly": data?.vehAssemblyType,
         "edition": data?.vehEditionType,
         "model": data?.model,
         "subModel": data?.subModel,
         "style": data?.vehVariantStyle,
         "my": data?.modelYear,
         "vy": data?.vinYear,
         "exterior": data?.colorCode,
         "interior":data?.upholsteryCode,
         "calledBy": "BILLING_LOCATION,USAGE,SALE_GROUP,END_USE,ITEM_GROUP,RTO_CITY,RTO_CODE,INSU_CITY,INSU_COMPANY,REGN_TYPE,VEH_PRICE",
         "priceListApplicable": moment(new Date()).format('DD-MMM-YYYY'),//"23-APR-2024",
         "billingLocation": selectedBranch?.branchCode,
         "usage": "",
         "saleGroup": "",
         "endUse": "",
         "vehiclePrice": 0,
         "itemGroup": "",
         "regnLocation": "",
         "rtoCode": "",
         "insuLocation": "",
         "insuCode": "",
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
      };
      tokenApiCall(
         GetProformaGeneralMastersCallBack,
         APIName.GetProformaGeneralMast
         ,
         "POST",
         param
      );
   };

   const GetProformaGeneralMastersCallBack = (res) => {
      console.log("GetProformaGeneralMastersCallBack = ", JSON.stringify(res));
      if (res.statusCode === 200) {
         setProformaGeneralMasters(res.result);
         setVehiclePriceDetail(res.result?.vehPrice);
         fn_GetProformaTaxMasters(res.result?.vehPrice)
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_GetProformaTaxMasters = (data) => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         prospectNo: Number(route.params.cardData?.prospectId),
         proformaId: 0,
         hsnCode: data?.hsnCode,
         endUse: "EU",
         basicPrice: data?.vehBasicAmount,
         discount: data?.discountAmt,
         loginUserCompanyId: userData?.userCompanyId,
         loginUserId: userData?.userId,
         ipAddress: "1::1",
   
      };
      tokenApiCall(
         GetProformaTaxMastersCallBack,
         APIName.GetProformaTaxMasters,
         "POST",
         param
      );
   };

   const GetProformaTaxMastersCallBack = (res) => {
      console.log("GetProformaTaxMastersCallBack = ", JSON.stringify(res));
      if (res.statusCode === 200) {
         setPerformaTaxMaster(res?.result)
         // setVehiclePriceDetail(res.result?.vehPriceDetail);
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_GetProspectBasicInfo = () => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         prospectNo: Number(route.params.cardData?.prospectId),
         loginUserCompanyId: "ORBIT",
         loginUserId: userData?.userId,
         ipAddress: "1::1",
      };
      tokenApiCall(
         GetProspectBasicInfoCallBack,
         APIName.GetProspectBasicInfo,
         "POST",
         param
      );
   };

   const GetProspectBasicInfoCallBack = (res) => {
      console.log("GetProspectBasicInfoCallBack = ", JSON.stringify(res.result));
      if (res.statusCode === 200) {
         setPerformaBasicDataHeader(res?.result)
         if(res?.result?.proformaList=== null || res?.result?.proformaList=== undefined){
            setPerformaNo(0)
         }else{
            res?.result?.proformaList.length > 0 ?  setPerformaNo(res?.result?.proformaList[0]?.docNo) : setPerformaNo(0)
         }
         setintrestedVehicleList(res?.result?.intrestedVehicleList[0])
         fn_GetProformaGeneralMasters(res?.result?.intrestedVehicleList[0])
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_GetProspectDetail = () => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         billingLocation: "string",
         prospectNo: 0,
         proformaId: 0,
         calledBy: "string",
         edition: "string",
         assembly: "string",
         model: "string",
         subModel: "string",
         style: "string",
         my: 0,
         vy: 0,
         exterior: "string",
         interior: "string",
         loginUserCompanyId: userData?.userCompanyId,
         loginUserId: userData?.userId,
         ipAddress: "1::1",
      };
      tokenApiCall(
         GetProspectDetailCallBack,
         APIName.GetProformaVehicleMasters,
         "POST",
         param
      );
   };

   const GetProspectDetailCallBack = (res) => {
      console.log("GetProspectDetailCallBack = ", JSON.stringify(res));
      if (res.statusCode === 200) {
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_GetPackage = () => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         docLocation: "string",
         docCode: "string",
         docFY: "string",
         docNo: 0,
         loginUserId: userData?.userId,
         ipAddress: "1::1",
      };
      tokenApiCall(
         GetPackageCallBack,
         APIName.GetProformaPackages,
         "POST",
         param
      );
   };

   const GetPackageCallBack = (res) => {
      console.log("search1", JSON.stringify(res));
      if (res.statusCode === 200) {
      } else {
         constant.showMsg(res.message);
      }
   };

   const fn_GetTerms = () => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         userId: userData?.userId,
         ipAddress: "1::1",
         docLocation: "MADU01",
         docCode: "SRP",
         docFY: "2023-2024",
         docNo: 43,
      };
      tokenApiCall(GetTermsCallBack, APIName.GetProformaTerms, "POST", param);
   };

   const GetTermsCallBack = (res) => {
      console.log("searchTerm", JSON.stringify(res));
      if (res.statusCode === 200) {
         settermData(res?.result?.termsDetailList);
         setActive(4);
      } else {
         constant.showMsg(res.message);
      }
   }

   const fn_GetProformaInsuMaster = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         userId: userData?.userId,
         ipAddress: "1::1",
         "docLocation": "MADU01",
         "docCode": "SRP",
         "docFY": "2023-2024",
         "docNo": 49
      };
      tokenApiCall(GetProformaInsuMasterCallBack, APIName.GetProformaInsuMaster, "POST", param);
   };

   const GetProformaInsuMasterCallBack = (res) => {
      console.log("searchTerm", JSON.stringify(res));
      if (res.statusCode === 200) {
         setInsuranceData(res?.result)
         fn_GetProformaGeneralMast()
       } else {
         dispatch(emptyLoader_Action(false))
         constant.showMsg(res.message);
      }
   }

   const fn_GetProformaGeneralMast = () => {
      let param = {
         brandCode: userData?.brandCode,
         countryCode: userData?.countryCode,
         companyId: userData?.companyId,
         "prospectNo": Number(route.params.cardData?.prospectId),
         "proformaId": 0,
         "assembly": "CKD",
         "edition": "STD",
         "model": "SCAB",
         "subModel": "SA_SRADAC",
         "style": "STD",
         "my": 2020,
         "vy": 2020,
         "exterior": "COSMBM",
         "interior": "STD",
         "calledBy": "BILLING_LOCATION,USAGE,SALE_GROUP,END_USE,ITEM_GROUP,RTO_CITY,RTO_CODE,INSU_CITY,INSU_COMPANY,VEH_PRICE",
         "priceListApplicable": "23-APR-2024",
         "billingLocation": "MADU01",
         "usage": "01",
         "saleGroup": "RETAIL",
         "endUse": "EU",
         "vehiclePrice": 836232,
         "itemGroup": "A1",
         "regnLocation": "MADU01",
         "rtoCode": "",
         "insuLocation": "",
         "insuCode": "",
         "loginUserId": userData?.userId,
         "ipAddress": "1::1",
         "CompetitionBrandCode": "TATA",
         "CompetitionModelCode": "SAFARI",
         "CompetitionVariantCode": ""
      };
      tokenApiCall(GetProformaGeneralMastCallBack, APIName.GetProformaGeneralMast, "POST", param);
   };

   const GetProformaGeneralMastCallBack = (res) => {
      console.log("searchGeneralMst", JSON.stringify(res));
     
      if (res.statusCode === 200) {
         setGeneralMasterData(res?.result)
         fn_GetProspectMaster()
       
      } else {
         dispatch(emptyLoader_Action(false))
         constant.showMsg(res.message);
      }
   }

   const fn_GetProspectMaster = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
          "brandCode": userData?.brandCode,
          "countryCode": userData?.countryCode,
          "companyId": userData?.companyId,
          "branchCode": selectedBranch?.branchCode,
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
          "loginUserCompanyId": userData?.userCompanyId,
          "loginUserId": userData?.userId,
          "ipAddress": "1::1",

      }
      tokenApiCall(GetProspectMasterCallBack, APIName.GetProspectMaster, "POST", param)
  }

  const GetProspectMasterCallBack = async (res) => {
      console.log("search1111", JSON.stringify(res))
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {          
          res?.result.map((item) => {
           if (item.listType === 'STATE') {
                setins_Location(item.prospectMasterList)         
            } 
        })
        setActive(2);
      } else {

          constant.showMsg(res.message)
      }
  }

   const fn_Registration = () => {
      dispatch(emptyLoader_Action(true))
      let param = {
         "brandCode": userData?.brandCode,
         "countryCode": userData?.countryCode,
         "companyId": userData?.companyId,
         "docLocation": "MADU01",
         "docCode": "SRP",
         "docFY": "2023-2024",
         "docNo": 49,
         "regnSource": "",
         "rtoCalcOn": "2024-02-01",
         "loginUserId": userData?.userId,
         "ipAddress": "1::1"
      }
      tokenApiCall(RegistrationCallBack, APIName.GetProformaRegistrationMaster, "POST", param)
   }

   const RegistrationCallBack = (res) => {
      console.log("searchTerm", JSON.stringify(res))
      dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setReg_Data(res?.result?.proformaRegistrationMaster)
         setActive(3)
      } else {
         constant.showMsg(res.message)
      }
   }

   const renderItem = ({ item, index }) => {
      return (
         <ImageBackground source={images.performaCard} resizeMode='stretch' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
            <Pressable style={styles.driveListMainView}  >
               <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1.8, marginTop: constant.moderateScale(7) }}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <FastImage source={{uri:intrestedVehicleList?.imagePath}} resizeMode='contain' style={styles.carImage} />

                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Prospect Name</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>{item?.title} {item?.firstName} {item?.lastName}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Model</Text>
                           <Text style={styles.listName3}>{item?.model}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>MY/VY</Text>
                           <Text style={styles.listName3}>{intrestedVehicleList?.modelYear}/{intrestedVehicleList?.vinYear}</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Vehicle Cost</Text>
                           <Text style={styles.listName3}>{performHeaderData?.vehicleCost?.basicAmount}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Temp Regn</Text>
                           <Text style={styles.listName3}>{performHeaderData?.temporaryRegistration?.totalAmount > 0 ? performHeaderData?.temporaryRegistration?.totalAmount : "NIL"}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Hypo Charges</Text>
                           <Text style={styles.listName3}>{performHeaderData?.hypothecationCharges?.totalAmount > 0 ? performHeaderData?.hypothecationCharges?.totalAmount : "NIL"}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Service Charges</Text>
                           <Text style={styles.listName3}>{performHeaderData?.serviceCharges?.totalAmount > 0 ? performHeaderData?.serviceCharges?.totalAmount : "NIL"}</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Extd Warr Pack</Text>
                           <Text style={styles.listName3}>{performHeaderData?.extendedWarrantyPack?.totalAmount > 0 ? performHeaderData?.extendedWarrantyPack?.totalAmount : "NIL" }</Text>
                        </View>

                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Accessories (Performa)</Text>
                           <Text style={styles.listName3}>{performHeaderData?.accessories?.totalAmount > 0 ? performHeaderData?.accessories?.totalAmount : "NIL"}</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           {/* <Text style={styles.listText2}>Accessories (Performa)</Text> */}
                           {/* <Text style={styles.listName3}>3500.00</Text> */}
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Total</Text>
                           <Text style={styles.listName3}>{performHeaderData?.vehicleCost?.totalAmount}</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </Pressable>
         </ImageBackground>
      )
   }



   const fn_TabClick = (type) => {
      if (type === 0) {
         setActive(type)
      } else if (type === 1) {
         setActive(type)
      } else if (type === 2) {
         fn_GetProformaInsuMaster()
         // fn_GetPackage()
      } else if (type === 3) {
         fn_Registration()
      } else if (type === 4) {
         fn_GetTerms()
      }else if(type===5){
         
         getPrformaPdf()
      }

   }

   const getPrformaPdf = (item) => {
      console.log("performBasic",performaBasicDataHeader)
      dispatch(emptyLoader_Action(true));
      const param = {
        brandCode: userData?.brandCode,
        countryCode: userData?.countryCode,
        companyId: userData?.companyId,
        userId: userData?.userId,
        ipAddress: "1::1",
        docLocation: "MADU01",
        docCode: "SRP",
        docFY: "2023-2024",
        docNo: 49,
      //   docLocation:performaBasicDataHeader?.proformaList[0]?.docLocation,
      //   docCode: performaBasicDataHeader?.proformaList[0]?.docCode,
      //   docFY: performaBasicDataHeader?.proformaList[0]?.docFy,
      //   docNo:performaBasicDataHeader?.proformaList[0]?.docNo,
      };
      console.log("param" + JSON.stringify(param));
      tokenApiCall(
        getEstimatePdf_Callback,
        APIName.GetProformaPDF,
        "POST",
        JSON.stringify(param),
        item
      );
    };
  
    const getEstimatePdf_Callback = (res, item) => {
      dispatch(emptyLoader_Action(false));
      if (res.statusCode === 200) {
        let temp = res?.result?.fileBase;
        if (temp === "") {
          constant.showMsg("No PDF is available");
        } else {
         setInvoiceData(temp)
         setActive(5)
       
        }
      } else {
        constant.showMsg("Somethings wents wrong");
      }
    };

   const actionRenderItem = ({ item, index }) => {
      return (
         <View
            style={{
               backgroundColor: "#F9F9F9",
               borderWidth: 1,
               borderRadius: 10,
               borderColor: constant.whiteColor,
               marginHorizontal: constant.moderateScale(5),
               paddingBottom: constant.moderateScale(10),
               elevation: 1,
            }}
         >
            <View
               style={[
                  styles.driveListDetailView,
                  { marginTop: constant.moderateScale(10) },
               ]}
            >
               <View style={[styles.driveListDetailSubView, {}]}>
                  <Text style={styles.listText2}>Action</Text>
                  <Text style={styles.listText3}>Test Drive</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Due on </Text>
                  <Text style={styles.listText3}>14-Feb-2024</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Stutus</Text>
                  <Text style={styles.listText3}>Active</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Completed on</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Remarks</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Projected Closure Data</Text>
                  <Text style={styles.listText3}>Standard</Text>
               </View>
            </View>
         </View>
      );
   };

   const renderItem1 = () => {
      return (
          <ImageBackground source={images.listCard} resizeMode='cover' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
              <Pressable style={styles.driveListMainView}  >
                  {/* <Pressable style={styles.driveListTopView1} onPress={() => setDetailModal(true)}>
                      <Text style={styles.text2}>OLM</Text>
                      <AntDesign name='close' style={styles.closeIcon} />
                  </Pressable> */}
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1, }}>
                          <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage2} />
                          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <View style={[{ flexDirection: 'row', justifyContent: 'center', flex: 1, paddingRight: constant.moderateScale(18) }]}>
                                  <Text style={styles.listName3}>PID : </Text>
                                  <Text style={[styles.listName3]}>{route.params.cardData?.prospectId}</Text>
                              </View>
                              <View style={styles.cardHorLine} />
                          </View>
                      </View>
                      <View style={{ flex: 1.8 }}>
                          <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                              <View style={styles.driveListDetailSubView}>
                                  <Text style={styles.listText4}>Prospect Name</Text>
                                  <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>{route.params.cardData?.title} {route.params.cardData?.firstName} {route.params.cardData?.lastName}</Text>
                              </View>
                              <View style={styles.driveListDetailSubView2}>
                                  <Text style={styles.listText4}>Model</Text>
                                  <Text style={styles.listName3}>{route.params.cardData?.model}</Text>
                              </View>
                          </View>
                          <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                              <View style={styles.driveListDetailSubView}>
                                  <Text style={styles.listText4}>Mobile No</Text>
                                  <Text style={styles.listName3}>{route.params.cardData?.custMobile}</Text>
                              </View>
                              <View style={styles.driveListDetailSubView2}>
                                  <Text style={styles.listText4}>Closure Date</Text>
                                  <Text style={styles.listName3}>{moment(route.params.cardData?.projectedCloserDate, 'DD-MMM-YYYY, hh:mm A').format('DD-MMM-YYYY')}</Text>
                              </View>
                          </View>
                          <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                              <View style={styles.driveListDetailSubView}>
                                  <Text style={styles.listText4}>Rating</Text>
                                  <Text style={styles.listName3}>{route.params.cardData?.prospectRating}</Text>
                              </View>
                              <View style={styles.driveListDetailSubView2}>
                                  <Text style={styles.listText4}>Color</Text>
                                  <Text style={styles.listName3}>{route.params.cardData?.vehColor}</Text>
                              </View>
                          </View>
                      </View>
                  </View>
              </Pressable>
          </ImageBackground>
      )
  }

  const fn_SaveBasicInfo=()=>{
   let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      prospectNo: Number(route.params.cardData?.prospectId),
      loginUserCompanyId: userData?.userCompanyId,
      loginUserId: userData?.userId,
      ipAddress: "1::1",
   };
   tokenApiCall(
      SaveBasicInfoCallBack,
      APIName.GetProspectBasicInfo,
      "POST",
      param
   );
  }

  const SaveBasicInfoCallBack = (res) => {
   console.log("SaveBasicInfoCal = ", JSON.stringify(res));
   //   dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setPerformaBasicDataHeader(res?.result)
       fn_performDetail(res?.result?.proformaList[0])
      } else {
         constant.showMsg(res.message);
      }
};

const fn_performDetail=(data)=>{
   let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      "userId": userData?.userId,
      "ipAddress": "1::1",
      "docLocation": data?.docLocation,
      "docCode": data?.docCode,
      "docFY": data?.docFy,
      "docNo": data?.docNo

   };
   tokenApiCall(
      performDetailCallBack,
      APIName.GetProformaDetals,
      "POST",
      param
   );
}

const performDetailCallBack = (res) => {
   console.log("SaveBasicInfoCal = ", JSON.stringify(res));
     dispatch(emptyLoader_Action(false))
      if (res.statusCode === 200) {
         setPerformHeaderData(res?.result)
         setActive(1)
         constant.showMsg("Basic Info save successfully")
      } else {
         constant.showMsg(res.message);
      }
};

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#E1E1E1" }}>
         <StatusBar translucent={false} backgroundColor={constant.blackColor} />
         <CommonHeader
            title="Performa"
            mainExt={styles.drawerStyle}
            onBack={() => navigation.goBack()}
         />
         {active ===0 ?
         <View>
         <FlatList
             data={data}
             renderItem={renderItem1}
             showsVerticalScrollIndicator={false}
             ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(5))}
             ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
             ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
         />
     </View>
     :
         <View>
            <FlatList
               data={[route.params.cardData]}
               renderItem={renderItem}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={() =>
                  common_fn.listSpace(constant.moderateScale(5))
               }
               ItemSeparatorComponent={() =>
                  common_fn.listSpace(constant.moderateScale(7))
               }
               ListFooterComponent={() =>
                  common_fn.listSpace(constant.moderateScale(10))
               }
            />
         </View>
}

         <View style={styles.cal_SubView}>
            <View style={styles.tabSubView}>
               <FlatList
                  horizontal
                  data={data3}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() =>
                     common_fn.listVer_Space(constant.moderateScale(15))
                  }
                  renderItem={({ item, index }) => {
                     return (
                        <Pressable
                           style={
                              index === active ? styles.tabButton : styles.tabButton2
                           }
                           onPress={() => {
                              if(index === 0){
                                 fn_TabClick(index, item)
                              }else if(performaBasicDataHeader?.proformaList[0] !== undefined){
                                 fn_TabClick(index, item)
                              }else{
                                 fn_TabClick(index, item)
                                 constant.showMsg("No performa found for this prospect, please create performa first");
                              }
                           }}
                        >
                           <Text
                              style={
                                 active === index
                                    ? styles.tabButtonText
                                    : styles.tabButtonText2
                              }
                           >
                              {item?.title}
                           </Text>
                           {active === index && <View style={styles.horixontalLine} />}
                        </Pressable>
                     );
                  }}
               />
            </View>

            {active === 0 && (
               <PerformaBasicInfo
                  performaPriceDetail={vehiclePricedetail}
                  performaBasicInfo={performaBasicDataHeader}
                  performaGeneralMasterData={proformaGeneralMasters}
                  cardData = {route.params.cardData}
                  texMasterData ={performaTaxMaster}
                  SaveInfo = {()=>{fn_SaveBasicInfo()}}
                  prospect_No = {performaNo}
                  intrestedVehicleList = {intrestedVehicleList}
                />
            )}
            {active === 1 && <
               PerformaAccessories 
               performaBasicInfo={performaBasicDataHeader}
               fn_Next={()=>{fn_GetProformaInsuMaster()}}
               />}
            {/* {active === 2 && <PerformaPackage />} */}
            {
               active === 2 &&
               <PerformaInsurance 
               insurance_Data = {insuranceData}
               generalMaster_Data = {generalMasterData}
               insuranceLoc_Data = {ins_Location}
               performaBasicInfo={performaBasicDataHeader}

               />
            }
            {active === 3 && <PerformaRegistration 
             regData= {reg_Data}
             performaGeneralMasterData={proformaGeneralMasters}
             performaBasicInfo={performaBasicDataHeader}
             performaPriceDetail={vehiclePricedetail}
             getTermsInfoAndMove={()=>fn_GetTerms()}
            />}
            {active === 4 && <PerformaTerm term_Data={termData}
            moveToPerformaInvoice={()=>setActive(5)}
            />}

            {active === 5 && <DownloadPerforma
            performaGeneralMasterData={proformaGeneralMasters}
            performaBasicInfo={performaBasicDataHeader}
            invoice_Data = {invoiceData}
            />}
         </View>

         {/* <Button title='Create Proforma' click_Action={() => fn_Create()} buttonExt={styles.performaButton} /> */}

         <AddPartListModel
            isVisible={addListModel}
            onRequestClose={() => setAddListModel(false)}
         />
         <AddPackageModel
            isVisible={packageModel}
            onRequestClose={() => setPackageModel(false)}
         />
      </SafeAreaView>
   );
}
