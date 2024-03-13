import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './EditProspectStyle';
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
import EditBasicInfo from './EditBasicInfo';
import EditProspectInfo from './EditProspectInfo';
import CloseInfo from './CloseInfo';
import VehicleReqInfo from './VehicleReqInfo';
import ActionInfo from './ActionInfo';
import UpdateActionModal from '../../components/UpdateActionModal';
import FeedBackModal from '../../components/FeedBackModal';
import { emptyLoader_Action } from '../../redux/actions/AuthAction';
import CustumerInfo from './CustumerInfo';
const data = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data2 = [
    { 'key': 1, "title": 'Basic Info', },
    { 'key': 2, "title": 'Prospect Info', },
    { 'key': 3, "title": 'Vehicle Required' },
    { 'key': 4, "title": 'Actions' },
    { 'key': 5, "title": 'Custumer Profile' },
    { 'key': 6, "title": 'Close' },


]

export default function EditProspectScreen(props) {
    const { navigation, route } = props
    const dispatch = useDispatch()
    const tabWidth = constant.resW(49);
    const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
    const [active, setActive] = useState(0)
    const [animatedValue] = useState(new Animated.Value(1));
    const [basicInfo, setBasicInfo] = useState({})
    const [prospectMasterData, setProspectMasterData] = useState([])
    const [prospectInfo, setProspectInfo] = useState({})
    const [veh_ModelData, setVeh_ModelData] = useState([])
    const [vehicleData, setVehicleData] = useState([])
    const interpolateX = animatedValue.interpolate({
        inputRange: [0, 1, 2, 3, 4], // Adjust based on the number of tabs
        outputRange: [0, constant.resW(3), constant.resW(26), tabWidth, constant.resW(79)],
    });

    const [detailModal, setDetailModal] = useState(false)
    const [updateModal, setUpdateModal] = useState({ show: false, data: {} })
    const [feedBackModal, setFeedBackModal] = useState({ show: false, data: {} })
    const [actionTypeData, SetActionTypeData] = useState([])
    const [performData, setPerformData] = useState([])
    const [actionInfo, setActionInfo] = useState([])
    const [profileData,setProfileData] = useState({})

    useEffect(() => {
        fn_GetProspectBasicInfo()
    }, [])

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
        if (res.statusCode === 200) {
            setBasicInfo(res.result?.prospectBasicInfo)
            fn_GetProspectMaster()
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
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
        console.log("search11", JSON.stringify(res))
        dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            setProspectMasterData(res?.result)

            setActive(0)
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
        console.log("search", JSON.stringify(res))
        dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            setProspectInfo(res.result?.prospectDetails)
            setActive(1)
        } else {
            constant.showMsg(res.message)
        }
    }

    const fn_GetVehicleMasterModel = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "EDITION,ASSEMBLY,MODEL",
            "edition": "",
            "assembly": "",
            "subModel": "",
            "model": "",
            "code": "",
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetVehicleMasterModelCallBack, APIName.GetVehicleMaster, "POST", param)
    }

    const GetVehicleMasterModelCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        if (res.statusCode === 200) {
            await res.result.map((item) => {
                if (item.listType === 'MODEL') {
                    setVeh_ModelData(item.vehicleMaster)
                }
            })
            fn_VehicleReqList()
            //   setActive(2)
            //   dispatch(emptyLoader_Action(false))
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const fn_VehicleReqList = () => {
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "prospectNo": Number(route.params.cardData?.prospectId),
            "loginUserCompanyId": userData?.userCompanyId,
            "loginUserId": userData?.userId,
            "ipAddress": "1::1",
        }
        console.log("vehicleReq", param)
        tokenApiCall(VehicleReqListCallBack, APIName.GetVehiclesRequiredList, "POST", param)
    }

    const VehicleReqListCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        if (res.statusCode === 200) {

            setActive(2)
            dispatch(emptyLoader_Action(false))
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const fn_GetVehicleModel = (d) => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "EDITION,ASSEMBLY,VARIANT,STYLE,MY,VY,EXT_COLOR,INT_COLOR",
            "edition": "",
            "assembly": "",
            "subModel": "",
            "model": d.code,
            "code": "",
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetVehicleMasterCallBack, APIName.GetVehicleMaster, "POST", param)
    }

    const GetVehicleMasterCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        if (res.statusCode === 200) {
            setVehicleData(res?.result)
            dispatch(emptyLoader_Action(false))
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
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
        // dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            fn_GetActionMasterList()
            setActionInfo(res.result?.actionInfoList)

        } else {
            constant.showMsg(res.message)
        }
    }

    const fn_GetActionMasterList = () => {
        // dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "FUP_TYPE,ACTION_STATUS",
            "loginUserCompanyId": userData?.userCompanyId,
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetActionMasterListCallBack, APIName.GetActionMaster, "POST", param)
    }

    const GetActionMasterListCallBack = (res) => {
        console.log("search11", JSON.stringify(res))
        // dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            res.result.map((item) => {
                if (item?.listType === 'FUP_TYPE') {
                    SetActionTypeData(item?.actionMasterList)
                } else {
                    setPerformData(item?.actionMasterList)
                }
            })
            // SetActionTypeData(res?.result[0]?.actionMasterList)
            fn_GetVehicleActionModel()


        } else {
            constant.showMsg(res.message)
        }
    }

    const fn_GetVehicleActionModel = () => {
        // dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "EDITION,ASSEMBLY,MODEL",
            "edition": "",
            "assembly": "",
            "subModel": "",
            "model": "",
            "code": "",
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetVehicleActionModelCallBack, APIName.GetVehicleMaster, "POST", param)
    }

    const GetVehicleActionModelCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        if (res.statusCode === 200) {
            await res.result.map((item) => {
                if (item.listType === 'MODEL') {
                    setVeh_ModelData(item.vehicleMaster)
                }
            })
            setActive(3)
            dispatch(emptyLoader_Action(false))
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const fn_GetActionTypeCloseList = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "FUP_TYPE,ACTION_STATUS",
            "loginUserCompanyId": userData?.userCompanyId,
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetActionTypeCloseListCallBack, APIName.GetActionMaster, "POST", param)
    }

    const GetActionTypeCloseListCallBack = (res) => {
        console.log("search", JSON.stringify(res))
        // dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            res.result.map((item) => {
                if (item?.listType === 'FUP_TYPE') {
                    SetActionTypeData(item?.actionMasterList)
                } else {
                    setPerformData(item?.actionMasterList)
                }
            })
            // SetActionTypeData(res?.result[0]?.actionMasterList)
            fn_GetVehicleActionClose()


        } else {
            constant.showMsg(res.message)
        }
    }

    const fn_GetVehicleActionClose = () => {
        // dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "EDITION,ASSEMBLY,MODEL",
            "edition": "",
            "assembly": "",
            "subModel": "",
            "model": "",
            "code": "",
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetVehicleActionCloseCallBack, APIName.GetVehicleMaster, "POST", param)
    }

    const GetVehicleActionCloseCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        if (res.statusCode === 200) {
            await res.result.map((item) => {
                if (item.listType === 'MODEL') {
                    setVeh_ModelData(item.vehicleMaster)
                }
            })
            setActive(5)
            dispatch(emptyLoader_Action(false))
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const fn_GetProfile = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "prospectID": Number(route.params.cardData?.prospectId),
            "calledFrom": "PERSONAL",
            "userId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetProfileCallBack, APIName.GetCustomerProfile, "POST", param)

    }

    const GetProfileCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        // dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            setProfileData(res?.result)
            fn_GetProfileModel()
          
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const fn_GetProfileModel = () => {
        dispatch(emptyLoader_Action(true))
        let param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "calledBy": "EDITION,ASSEMBLY,MODEL",
            "edition": "",
            "assembly": "",
            "subModel": "",
            "model": "",
            "code": "",
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetProfileModelCallBack, APIName.GetVehicleMaster, "POST", param)
    }

    const GetProfileModelCallBack = async (res) => {
        console.log("search", JSON.stringify(res))
        dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            await res.result.map((item) => {
                if (item.listType === 'MODEL') {
                    setVeh_ModelData(item.vehicleMaster)
                }
            })
            setActive(4)
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }

    const renderItem = () => {
        return (
            <ImageBackground source={images.listCard} resizeMode='cover' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
                <Pressable style={styles.driveListMainView}  >
                    <Pressable style={styles.driveListTopView1} onPress={() => setDetailModal(true)}>
                        <Text style={styles.text2}>OLM</Text>
                        <AntDesign name='close' style={styles.closeIcon} />
                    </Pressable>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, }}>
                            <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage} />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={[{ flexDirection: 'row', justifyContent: 'center', flex: 1, paddingRight: constant.moderateScale(18) }]}>
                                    <Text style={styles.listName3}>PID : </Text>
                                    <Text style={[styles.listName3]}>12443</Text>
                                </View>
                                <View style={styles.cardHorLine} />
                            </View>
                        </View>
                        <View style={{ flex: 1.8 }}>
                            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText4}>Prospect Name</Text>
                                    <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>Mr.Amarjeet Singh</Text>
                                </View>
                                <View style={styles.driveListDetailSubView2}>
                                    <Text style={styles.listText4}>Model</Text>
                                    <Text style={styles.listName3}>D-MAX</Text>
                                </View>
                            </View>
                            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText4}>Mobile No</Text>
                                    <Text style={styles.listName3}>1234567898</Text>
                                </View>
                                <View style={styles.driveListDetailSubView2}>
                                    <Text style={styles.listText4}>Closure Date</Text>
                                    <Text style={styles.listName3}>22-Jan-2024</Text>
                                </View>
                            </View>
                            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText4}>Rating</Text>
                                    <Text style={styles.listName3}>HOT</Text>
                                </View>
                                <View style={styles.driveListDetailSubView2}>
                                    <Text style={styles.listText4}>Color</Text>
                                    <Text style={styles.listName3}>Brilliant Silver</Text>
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
            Animated.timing(animatedValue, {
                toValue: type,
                duration: 800, // Adjust the duration of the animation
                useNativeDriver: false,
            }).start();
        } else if (type === 1) {
            fn_GetProspectDetail()
        } else if (type === 2) {
            fn_GetVehicleMasterModel()
        } else if (type === 3) {

            fn_GetActionDetail()
        } else if (type === 4) {
            fn_GetProfile()

        } else {
            fn_GetActionTypeCloseList()
            // setActive(5)
        }

    }

    const fn_FeedBack = (item, index) => {
        // console.log("item",item)
        // setFeedBackModal({show:true,data:item})
        dispatch(emptyLoader_Action(true))
        const param = {
            "brandCode": userData?.brandCode,
            "countryCode": userData?.countryCode,
            "companyId": userData?.companyId,
            "branchCode": selectedBranch?.branchCode,
            "prospectNo": Number(item?.prospectId),
            "serial": 0,
            "loginUserCompanyId": userData?.userCompanyId,
            "loginUserId": userData?.userId,
            "ipAddress": "1::1"
        }
        tokenApiCall(GetTestDriveFeedbackDetailsCallBack, APIName.GetTestDriveFeedbackQuestions, "POST", param)

    }

    const GetTestDriveFeedbackDetailsCallBack = (res) => {
        console.log("search", JSON.stringify(res))
        dispatch(emptyLoader_Action(false))
        if (res.statusCode === 200) {
            let newData = res.result?.feedbackList.map((item) => {
                item["answer"] = {}
                return (item)
            })
            console.log("newDat", newData)
            setFeedBackModal({ show: true, data: newData })
        } else {
            constant.showMsg(res.message)
        }
    }




    const fn_Create = () => {
        props.navigation.navigate("CreatePerforma")
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
            <StatusBar translucent={false} backgroundColor={constant.blackColor} />

            <CommonHeader title='Edit Prospect' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />
            <ScrollView>
                <View>
                    <FlatList
                        data={data}
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
                            <FlatList
                                data={data2}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}
                                ListFooterComponent={() => common_fn.listVer_Space(constant.moderateScale(10))}

                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable style={active === index ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(index)} >
                                            <Text style={active === index ? styles.tabButtonText : styles.tabButtonText2}>{item?.title}</Text>
                                            {active === index && <View style={styles.horixontalLine} />}
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    {
                        active === 0 &&
                        <EditBasicInfo
                            data={basicInfo}
                            prospectMaster={prospectMasterData}
                        />
                    }
                    {
                        active === 1 &&
                        <EditProspectInfo
                            data={basicInfo}
                            prospectDetail={prospectInfo}
                            prospectMaster={prospectMasterData}
                        />
                    }
                    {active === 2 &&
                        <VehicleReqInfo
                            modelData={veh_ModelData}
                            vehicledata={vehicleData}
                            prospectData={route.params?.cardData}
                            modelSelect={(d) => fn_GetVehicleModel(d)}

                        />
                    }
                    {active === 3 &&
                        <ActionInfo
                            updateClick={(item, index) => setUpdateModal({ show: true, data: item })}
                            actionType_Data={actionTypeData}
                            modelData={veh_ModelData}
                            data={actionInfo}
                            perform_Data={performData}
                            feedBackClick={(item, index) => { fn_FeedBack(item, index) }}
                        />

                    }
                    {active === 4 &&
                        <CustumerInfo
                            data={basicInfo}
                            profile_Data={profileData}
                            prospectDetail={prospectInfo}
                            prospectMaster={prospectMasterData}
                            modelData={veh_ModelData}
                        />
                    }
                    {
                        active === 5 &&
                        <CloseInfo
                            actionType_Data={actionTypeData}
                            modelData={veh_ModelData}
                            perform_Data={performData}
                            data={basicInfo}
                        />
                    }
                </View>
            </ScrollView>
            {/* <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} /> */}

            <DataSheetModal
                isVisible={detailModal}
                onRequestClose={() => setDetailModal(false)}
            />
            <UpdateActionModal
                isVisible={updateModal.show}
                data={updateModal.data}
                actionType_Data={actionTypeData}
                modelData={veh_ModelData}
                onRequestClose={() => setUpdateModal(s => { return { ...s, show: false } })}
            />
            <FeedBackModal
                isVisible={feedBackModal.show}
                QuestionList={feedBackModal?.data}
                onRequestClose={() => setFeedBackModal(s => { return { ...s, show: false } })}
            />
        </SafeAreaView>
    )
}
