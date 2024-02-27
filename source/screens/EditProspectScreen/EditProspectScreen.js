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
const data = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data2 = [
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

export default function EditProspectScreen(props) {
    const { navigation } = props
    const dispatch = useDispatch()
    const tabWidth = constant.resW(49);
    const { userData } = useSelector(state => state.AuthReducer)
    const [active, setActive] = useState(1)
    const [animatedValue] = useState(new Animated.Value(1));
    const interpolateX = animatedValue.interpolate({
        inputRange: [0, 1, 2, 3, 4], // Adjust based on the number of tabs
        outputRange: [0, constant.resW(3), constant.resW(26), tabWidth, constant.resW(79)],
    });

    const [detailModal, setDetailModal] = useState(false)
    const [updateModal,setUpdateModal] = useState(false)

 useEffect(()=>{

 },[])

 const fn_GetProspectBasicInfo = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "prospectNo": 8325,
      "loginUserCompanyId": "ORBIT",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetProspectBasicInfoCallBack, APIName.GetProspectBasicInfo, "POST", param)
  }

  const GetProspectBasicInfoCallBack = (res) => {
    console.log("search", JSON.stringify(res))
    if (res.statusCode === 200) {

    } else {
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
                                    <Text style={styles.listText2}>Prospect Name</Text>
                                    <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>Mr.Amarjeet Singh</Text>
                                </View>
                                <View style={styles.driveListDetailSubView2}>
                                    <Text style={styles.listText2}>Model</Text>
                                    <Text style={styles.listName3}>D-MAX</Text>
                                </View>
                            </View>
                            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText2}>Mobile No</Text>
                                    <Text style={styles.listName3}>1234567898</Text>
                                </View>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText2}>Closure Date</Text>
                                    <Text style={styles.listName3}>22-Jan-2024</Text>
                                </View>
                            </View>
                            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText2}>Rating</Text>
                                    <Text style={styles.listName3}>HOT</Text>
                                </View>
                                <View style={styles.driveListDetailSubView}>
                                    <Text style={styles.listText2}>Color</Text>
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
        setActive(type)
        Animated.timing(animatedValue, {
            toValue: type,
            duration: 800, // Adjust the duration of the animation
            useNativeDriver: false,
        }).start();
    }

  

    const fn_Create = () => {
        props.navigation.navigate("CreatePerforma")
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
            <StatusBar translucent={false} backgroundColor={constant.blackColor} />
            <CommonHeader title='Edit Prospect' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />
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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
                                <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Basic Info</Text>
                                {active === 1 && <View style={styles.horixontalLine} />}
                            </Pressable>
                            <Pressable style={active === 2 ? [styles.tabButton, { width: constant.resW(28), }] : [styles.tabButton2, { width: constant.resW(28) }]} onPress={() => fn_TabClick(2)} >
                                <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Prospect Info</Text>
                                {active === 2 && <View style={styles.horixontalLine} />}
                            </Pressable>
                            <Pressable style={active === 3 ? [styles.tabButton, { width: constant.resW(32), }] : [styles.tabButton2, { width: constant.resW(32) }]} onPress={() => fn_TabClick(3)} >
                                <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Vehicle Required</Text>
                                {active === 3 && <View style={styles.horixontalLine} />}

                            </Pressable>
                            <Pressable style={active === 4 ? [styles.tabButton, {}] : [styles.tabButton2, {}]} onPress={() => fn_TabClick(4)} >
                                <Text style={active === 4 ? styles.tabButtonText : styles.tabButtonText2}>Actions</Text>
                                {active === 4 && <View style={styles.horixontalLine} />}

                            </Pressable>
                            <Pressable style={active === 5 ? [styles.tabButton, {}] : [styles.tabButton2, {}]} onPress={() => fn_TabClick(5)} >
                                <Text style={active === 5 ? styles.tabButtonText : styles.tabButtonText2}>Close</Text>
                                {active === 5 && <View style={styles.horixontalLine} />}

                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
                {
                    active === 1 &&
                   <EditBasicInfo />
                }
                {
                    active === 2 &&
                   <EditProspectInfo/>
                }
                {active === 3 &&
                   <VehicleReqInfo />
                }
                {active === 4 &&
                  <ActionInfo updateClick={()=>setUpdateModal(true)} />
                }
                {
                    active === 5 && <CloseInfo />
                }
            </View>
            <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

            <DataSheetModal
                isVisible={detailModal}
                onRequestClose={() => setDetailModal(false)}
            />
            {/* <UpdateActionModal
                  isVisible={updateModal}
                  onRequestClose={() => setUpdateModal(false)}
            /> */}
            <FeedBackModal 
             isVisible={updateModal}
             onRequestClose={() => setUpdateModal(false)}
            />
        </SafeAreaView>
    )
}
