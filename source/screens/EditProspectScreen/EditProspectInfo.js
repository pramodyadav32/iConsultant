import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
// import styles from './EditProspectStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName, tokenApiCall } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EditProspectInfo(props) {
    const { data, prospectMaster, prospectDetail } = props
    const dispatch = useDispatch()
    const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
    const [activeIndex, setActiveIndex] = useState(true)
    const [active, setActive] = useState(1)
    const [stateData, setStateData] = useState([])
    const [stateValue, setStateValue] = useState({})
    const [cityData, setCityData] = useState([])
    const [cityValue, setCityValue] = useState({})
    const [title, setTitle] = useState([])
    const [titleValue, setTitleValue] = useState({})
    const [titleSonValue, setTitleSonValue] = useState({ "code": "", "description": " " })
    const [name, setName] = useState("")
    const [sonName, setSonName] = useState("")
    const [mobileno, setMobileno] = useState("")
    const [email, setEmail] = useState("")
    const [panData, setPanData] = useState("")
    const [empName, setEmpName] = useState("")
    const [empMail, setEmpMail] = useState("")
    const [destination, setDestination] = useState("")
    const [prospectTypeData, setProspectData] = useState([])
    const [prospectTypeValue, setProspectTypeValue] = useState({})

    const [resAdd1, setRes_Add1] = useState("")
    const [resAdd2, setRes_Add2] = useState("")
    const [resAdd3, setRes_Add3] = useState("")
    const [res_State, setRes_State] = useState({})
    const [res_City, setRes_City] = useState({})
    const [res_destict, setRes_Destict] = useState({})
    const [res_Pin, setRes_Pin] = useState("")
    const [res_Phone, setRes_Phone] = useState('')

    const [regAdd1, setReg_Add1] = useState("")
    const [regAdd2, setReg_Add2] = useState("")
    const [regAdd3, setReg_Add3] = useState("")
    const [reg_State, setReg_State] = useState({})
    const [reg_City, setReg_City] = useState({})
    const [reg_destict, setReg_Destict] = useState({})
    const [reg_Pin, setReg_Pin] = useState("")
    const [reg_Phone, setReg_Phone] = useState('')

    const [offAdd1, setOff_Add1] = useState("")
    const [offAdd2, setOff_Add2] = useState("")
    const [offAdd3, setOff_Add3] = useState("")
    const [off_State, setOff_State] = useState({})
    const [off_City, setOff_City] = useState({})
    const [off_destict, setOff_Destict] = useState({})
    const [off_Pin, setOff_Pin] = useState("")
    const [off_Phone, setOff_Phone] = useState('')

    const [copyToRes, setCopyToRes] = useState(false)
    const [copyToOff, setCopyToOff] = useState(false)
    const [copyRegToOff, setCopyRegToOff] = useState(false)
    useEffect(() => {
        prospectMaster.map((item) => {
            if (item.listType === 'TITLE') {
                setTitle(item.prospectMasterList)
                item.prospectMasterList.map((item) => {
                    item?.code === prospectDetail?.title ? setTitleValue(item) : null
                })
            } else if (item.listType === 'STATE') {
                setStateData(item.prospectMasterList)
                item.prospectMasterList.map((item) => {
                    item?.code === prospectDetail?.regnState ? prospectDetail?.regnState != '' ? setReg_State(item) : null : null
                    item?.code === prospectDetail?.resState ? prospectDetail?.resState != '' ? setRes_State(item) : null : null
                    item?.code === prospectDetail?.offcState ? prospectDetail?.offcState != '' ? setOff_State(item) : null : null

                })
            } else if (item.listType === 'CITY') {
                item.prospectMasterList.map((item) => {
                    item?.code === prospectDetail?.regnCity ? prospectDetail?.regnCity != '' ? setReg_City(item) : null : null
                    item?.code === prospectDetail?.resCity ? prospectDetail?.resCity != '' ? setRes_City(item) : null : null
                    item?.code === prospectDetail?.offcCity ? prospectDetail?.offcCity != '' ? setOff_City(item) : null : null

                })
                setCityData(item.prospectMasterList)
            } else if (item.listType === 'PROSPECT_CATEGORY') {
                setProspectData(item.prospectMasterList)
                // item.prospectMasterList.map((item)=>{
                //     item?.code === data?.prospectType ? setProspectTypeValue(item) : null
                // })
            }
        })
        setMobileno(prospectDetail?.mobile)
        setEmail(prospectDetail?.email)
        setPanData(prospectDetail?.pan)
        setEmpName(prospectDetail?.employerNam)
        setEmpMail(prospectDetail?.employerEmailId)
        setDestination(prospectDetail?.designation)

        setOff_Add1(prospectDetail?.offcAddress1)
        setOff_Add2(prospectDetail?.offcAddress2)
        setOff_Add3(prospectDetail?.offcAddress3)
        setOff_Phone(prospectDetail?.offcPincode)
        setOff_Pin(prospectDetail?.offcPhone)

        setReg_Add1(prospectDetail?.regnAddress1)
        setReg_Add2(prospectDetail?.regnAddress2)
        setReg_Add3(prospectDetail?.regnAddress3)
        setReg_Phone(prospectDetail?.regnPhone)
        setReg_Pin(prospectDetail?.regnPincode)

        setRes_Add1(prospectDetail?.resAddress1)
        setRes_Add2(prospectDetail?.resAddress2)
        setRes_Add3(prospectDetail?.resAddress3)
        setRes_Phone(prospectDetail?.resPhone)
        setRes_Pin(prospectDetail?.resPincode)

    }, [prospectMaster])


    const fn_TabClick = (type) => {
        setActive(type)

    }

    const fn_copyAddress1 = () => {
        setRes_Add1(regAdd1)
        setRes_Add2(regAdd2)
        setRes_Add3(regAdd3)
        setRes_State(reg_State)
        setRes_City(reg_City)
        setRes_Destict(reg_destict)
        setRes_Pin(reg_Pin)
        setRes_Phone(reg_Phone)
        setCopyToRes(!copyToRes)
    }

    const fn_copyAddress2 = () => {
        setOff_Add1(regAdd1)
        setOff_Add2(regAdd2)
        setOff_Add3(regAdd3)
        setOff_State(reg_State)
        setOff_City(reg_City)
        setOff_Destict(reg_destict)
        setOff_Pin(reg_Pin)
        setOff_Phone(reg_Phone)
        setCopyToOff(!copyToOff)
    }

    const fn_copyAddress3 = () => {
        setOff_Add1(resAdd1)
        setOff_Add2(resAdd2)
        setOff_Add3(resAdd3)
        setOff_State(res_State)
        setOff_City(res_City)
        setOff_Destict(res_destict)
        setOff_Pin(res_Pin)
        setOff_Phone(res_Phone)
        setCopyRegToOff(!copyRegToOff)
    }

    const fn_Create = () => {
        // if (Object.keys(sourceValue).length === 0) {
        //     constant.showMsg("Please select source")
        // } else if (Object.keys(dealCategoryValue).length === 0) {
        //     constant.showMsg("Please select Deal Category")
        // } else if (Object.keys(dealTypeValue).length === 0) {
        //     constant.showMsg("Please select Deal Type")
        // } else if (Object.keys(companyValue).length === 0) {
        //     constant.showMsg("Please select Company")
        // } else {
            const param = {
                "brandCode": userData?.brandCode,
                "countryCode": userData?.countryCode,
                "companyId": userData?.companyId,
                "prospectLocation": selectedBranch.brandCode,
                "prospectNo": Number(data?.prospectID),
                "custType": "I",
                "title": titleValue.code,
                "firstName": name,
                "middleName": "",
                "lastName": "",
                "suffix": "",
                "gender": "M",
                "sonof": sonName,
                "mobile": mobileno,
                "email": email,
                "employer": empName,
                "designation": destination,
                "employerEmail": empMail,
                "pan": panData,
                "regnAdd1": regAdd1,
                "regnAdd2": regAdd2,
                "regnAdd3": regAdd3,
                "regnState": reg_State?.code,
                "regnCity": reg_City?.code,
                "regnPin": res_Pin,
                "regnPhone": res_Phone,
                "regnFax": "",
                "regnZone": "",
                "regnSubZone": "",
                "regnDistrict": res_destict,
                "resAdd1": resAdd1,
                "resAdd2": resAdd2,
                "resAdd3": resAdd3,
                "resState": res_State?.code,
                "resCity": res_City?.code,
                "resPin": res_Pin,
                "resPhone": res_Phone,
                "resFax": "",
                "resZone": "",
                "resSubZone": "",
                "resDistrict": reg_destict,
                "offAdd1": offAdd1,
                "offAdd2": offAdd2,
                "offAdd3": offAdd3,
                "offState": off_State?.code,
                "offCity": off_City?.code,
                "offPin": off_Pin,
                "offPhone": off_Phone,
                "offFax": "",
                "offZone": "",
                "offSubZone": "",
                "offDistrict": off_destict?.code,
                "cp1Add1": "",
                "cp1Add2": "",
                "cp1Add3": "",
                "cp1State": "",
                "cp1City": "",
                "cp1Pin": "",
                "cp1Phone": "",
                "cp1Zone": "",
                "cp1SubZone": "",
                "cp1District": "",
                "cp2Add1": "",
                "cp2Add2": "",
                "cp2Add3": "",
                "cp2State": "",
                "cp2City": "",
                "cp2Pin": "",
                "cp2Phone": "",
                "cp2Zone": "",
                "cp2SubZone": "",
                "cp2District": "",
                "mobile2": "",
                "email2": "",
                "drivenBy": "",
                "chauffeurName": "",
                "chauffeurMobile": "",
                "chauffeurDOB": "",
                "correspondenceAdd": "",
                "loginUserCompanyId": userData?.userCompanyId,
                "loginUserId": userData?.userId,
                "ipAddress": "1::1",
                "branchCode": selectedBranch?.branchCode,

            }
            console.log("param", param)
            tokenApiCall(saveBasicInfoCallBack, APIName.SaveProspectDetails, "POST", param)

        // }

    }

    const saveBasicInfoCallBack = (res) => {
        console.log("res", res)
        if (res.statusCode === 200) {
            res?.result?.resultCode === "Y" ? constant.showMsg("Data Saved Successfully.") : constant.showMsg("Error while data saving.")
        } else {
            dispatch(emptyLoader_Action(false))
            constant.showMsg(res.message)
        }
    }


    return (
        <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, backgroundColor: constant.whiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: constant.moderateScale(20) }}>

                    <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                        <Pressable onPress={() => setActiveIndex(true)} style={{ flex: 1, paddingVertical: constant.moderateScale(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.up_ListText}>Customer Info</Text>
                            <FastImage source={activeIndex ? images.downArrow : images.rightArrow} style={styles.upRightArrow} />
                        </Pressable>
                    </ImageBackground>
                    {activeIndex && <View>
                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Prospect Type</Text>
                            <View style={styles.mobileSubView}>
                                <SelectDropList
                                    list={prospectTypeData}
                                    buttonExt={styles.dropList}
                                    textExt={styles.dropListText}
                                    on_Select={(d) => setProspectTypeValue(d)}
                                />
                            </View>
                        </View>


                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Name</Text>
                            <View style={styles.mobileSubView}>
                                <SelectDropList
                                    list={title}
                                    title={titleValue?.description}
                                    buttonExt={styles.dropNameList}
                                    textExt={styles.dropNameListText}
                                    on_Select={(d) => setTitleValue(d)}

                                />
                                <TextInput onChangeText={(d) => setName(d)} style={[styles.input1, { marginLeft: '2%' }]} >{name}</TextInput>

                            </View>
                        </View>

                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Son of</Text>
                            <View style={styles.mobileSubView}>
                                <SelectDropList
                                    list={title}
                                    title={titleSonValue?.description}
                                    buttonExt={styles.dropNameList}
                                    textExt={styles.dropNameListText}
                                    on_Select={(d) => setTitleSonValue(d)}
                                />
                                <TextInput onChangeText={(d) => setSonName(d)} style={[styles.input1, { marginLeft: '2%' }]} >{sonName}</TextInput>

                            </View>
                        </View>

                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Mobile No.<Text style={styles.text2}>*</Text></Text>
                            <View style={styles.mobileSubView}>
                                <TextInput style={styles.input1} onChangeText={(d) => setMobileno(d)} keyboardType='numeric'>{mobileno}</TextInput>
                            </View>
                        </View>

                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Email ID</Text>
                            <TextInput onChangeText={(d) => setEmail(d)} style={styles.input1} >{email}</TextInput>
                        </View>


                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>I-Tax PAN</Text>
                            <TextInput onChangeText={(d) => setPanData(d)} style={styles.input1} >{panData}</TextInput>
                        </View>
                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Employer Name</Text>
                            <TextInput onChangeText={(d) => setEmpName(d)} style={styles.input1} >{empName}</TextInput>
                        </View>
                        <View style={styles.detailMainView}>
                            <Text style={styles.detailText}>Employer Mail</Text>
                            <TextInput onChangeText={(d) => setEmpMail(d)} style={styles.input1} >{empMail}</TextInput>
                        </View>
                        <View style={[styles.detailMainView, { marginBottom: constant.moderateScale(10) }]}>
                            <Text style={styles.detailText}>Designation</Text>
                            <TextInput onChangeText={(d) => setDestination(d)} style={styles.input1} >{destination}</TextInput>
                        </View>
                    </View>
                    }

                    <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                        <Pressable onPress={() => setActiveIndex(false)} style={{ flex: 1, paddingVertical: constant.moderateScale(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.up_ListText}>Address Info</Text>
                            <FastImage source={activeIndex ? images.downArrow : images.rightArrow} style={styles.upRightArrow} />
                        </Pressable>
                    </ImageBackground>

                    {activeIndex === false && <View>

                        <View style={styles.tabMainView}>
                            <View style={styles.tabSubView}>
                                <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
                                    <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Add(Regn.)</Text>
                                    {active === 1 && <View style={styles.horixontalLine} />}
                                </Pressable>
                                <Pressable style={active === 2 ? [styles.tabButton, { width: constant.resW(20), }] : [styles.tabButton2, { width: constant.resW(20) }]} onPress={() => fn_TabClick(2)} >
                                    <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Add(Res.)</Text>
                                    {active === 2 && <View style={styles.horixontalLine} />}
                                </Pressable>
                                <Pressable style={active === 3 ? [styles.tabButton, { width: constant.resW(20), }] : [styles.tabButton2, { width: constant.resW(20) }]} onPress={() => fn_TabClick(3)} >
                                    <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Add(Off.)</Text>
                                    {active === 3 && <View style={styles.horixontalLine} />}

                                </Pressable>
                            </View>
                        </View>
                        {active === 1 &&
                            <View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Address (Regn.)</Text>
                                    <TextInput onChangeText={(d) => { setReg_Add1(d) }} style={styles.input1} >{regAdd1}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setReg_Add2(d) }} style={styles.input1} >{regAdd2}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setReg_Add3(d) }} style={styles.input1} >{regAdd3}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>State</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={stateData}
                                            title={reg_State?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setReg_State(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>City</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={cityData}
                                            title={reg_City?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setReg_City(d)}

                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>District</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={[]}
                                            title=' '
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setReg_Destict(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Pin</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setReg_Pin(d) }} style={styles.input1} >{reg_Pin}</TextInput>

                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Phone</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setReg_Phone(d) }} style={styles.input1} >{reg_Phone}</TextInput>

                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Copy to Add(Res)</Text>
                                    <Pressable style={styles.mobileSubView} onPress={() => fn_copyAddress1()}>
                                        <FastImage resizeMode='contain' source={copyToRes ? images.checkIcon : images.unCheckIcon} style={styles.uncheckBoxStyle} />

                                    </Pressable>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Copy to Add(Off)</Text>
                                    <Pressable style={[styles.mobileSubView, { marginLeft: constant.moderateScale(0) }]} onPress={() => fn_copyAddress2()}>
                                        <FastImage resizeMode='contain' source={copyToOff ? images.checkIcon : images.unCheckIcon} style={styles.uncheckBoxStyle} />

                                    </Pressable>
                                </View>
                            </View>
                        }
                        {active === 2 &&
                            <View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Address (Regn.)</Text>
                                    <TextInput onChangeText={(d) => { setRes_Add1(d) }} style={styles.input1} >{resAdd1}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setRes_Add2(d) }} style={styles.input1} >{resAdd2}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setRes_Add3(d) }} style={styles.input1} >{resAdd3}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>State</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={stateData}
                                            title={res_State?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setRes_State(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>City</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={cityData}
                                            title={res_City?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setRes_City(d)}

                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>District</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={[]}
                                            title=' '
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setRes_Destict(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Pin</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setRes_Pin(d) }} style={styles.input1} >{res_Pin}</TextInput>

                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Phone</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setRes_Phone(d) }} style={styles.input1} >{res_Phone}</TextInput>

                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Copy to Add(Off)</Text>
                                    <Pressable style={styles.mobileSubView} onPress={() => fn_copyAddress3()}>
                                        <FastImage resizeMode='contain' source={copyRegToOff ? images.checkIcon : images.unCheckIcon} style={styles.uncheckBoxStyle} />

                                    </Pressable>
                                </View>
                            </View>
                        }
                        {active === 3 &&
                            <View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Address (Regn.)</Text>
                                    <TextInput onChangeText={(d) => { setOff_Add1(d) }} style={styles.input1} >{offAdd1}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setOff_Add2(d) }} style={styles.input1} >{offAdd2}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}></Text>
                                    <TextInput onChangeText={(d) => { setOff_Add3(d) }} style={styles.input1} >{offAdd3}</TextInput>
                                </View>
                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>State</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={stateData}
                                            title={off_State?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setOff_State(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>City</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={cityData}
                                            title={off_City?.description}
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setOff_City(d)}

                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>District</Text>
                                    <View style={styles.mobileSubView}>
                                        <SelectDropList
                                            list={[]}
                                            title=' '
                                            buttonExt={styles.dropList}
                                            textExt={styles.dropListText}
                                            on_Select={(d) => setOff_Destict(d)}
                                        />
                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Pin</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setOff_Pin(d) }} style={styles.input1} >{off_Pin}</TextInput>

                                    </View>
                                </View>

                                <View style={styles.detailMainView}>
                                    <Text style={styles.detailText}>Phone</Text>
                                    <View style={styles.mobileSubView}>
                                        <TextInput onChangeText={(d) => { setOff_Phone(d) }} style={styles.input1} >{off_Phone}</TextInput>

                                    </View>
                                </View>
                            </View>
                        }

                    </View>
                    }

                </View>
                <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerImageStyle: {
        height: undefined,
        width: undefined,
        marginHorizontal: constant.moderateScale(8),
        marginBottom: constant.moderateScale(2),
        elevation: 1

    },
    up_ListText: {
        fontSize: constant.moderateScale(13),
        color: '#3B3B3B',
        fontFamily: constant.typeRegular,
        marginLeft: constant.moderateScale(26)
    },
    upRightArrow: {
        height: constant.moderateScale(18),
        width: constant.moderateScale(18),
        marginRight: constant.moderateScale(10)
    },

    detailMainView: {
        paddingHorizontal: "3%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: constant.moderateScale(5)
    },
    detailText: {
        fontSize: constant.moderateScale(14),
        color: '#424242',
        width: constant.moderateScale(115),
        fontFamily: constant.typeLight
    },
    text2: {
        fontSize: constant.moderateScale(14),
        color: constant.red,
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
    mobileSubView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input1: {
        borderWidth: 1,
        height: constant.moderateScale(40),
        flex: 1,
        borderRadius: 10,
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
        color: constant.blackColor,
        fontFamily: constant.typeLight,
        paddingHorizontal: "3%",
        fontSize: constant.moderateScale(15)
    },
    searchButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchStyle: {
        height: constant.moderateScale(50),
        width: constant.moderateScale(50),
    },
    detailMainView2: {
        paddingHorizontal: "2%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: "2%"
    },
    bottomMainView: {
        backgroundColor: constant.whiteColor,
        marginHorizontal: '1%',
        borderRadius: 10,
        elevation: 1,
        marginTop: '3%',
        paddingBottom: '2%'
    },
    calenderStyle: {
        height: constant.moderateScale(25),
        width: constant.moderateScale(25),
        marginRight: '2%'
    },
    calenderMainView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ABABAB',
        paddingLeft: "3%",

    },
    calenderInput: {
        height: constant.moderateScale(40),
        flex: 1,
        borderRadius: 10,
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
        color: constant.blackColor,
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(14)
    },
    proceedButton: {
        width: constant.moderateScale(135),
        alignSelf: 'center',
        marginTop: constant.resW(30),
        marginBottom: constant.resW(5)
    },
    proccedButtonText: {

    },
    dropNameList: {
        borderWidth: 1,
        height: constant.moderateScale(40),
        borderRadius: 8,
        width: constant.resW(19),
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
        //    paddingHorizontal:0
    },
    dropNameListText: {
        fontSize: constant.moderateScale(14),
        color: constant.textColor,
        fontFamily: constant.typeLight,
    },
    refInput: {
        height: constant.moderateScale(40),
        flex: 1,
        backgroundColor: constant.whiteColor,
        color: '#4AAA38',
        fontFamily: constant.typeMedium,
        fontSize: constant.moderateScale(15)
    },
    coutMainView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    coutButton: {
        //   backgroundColor:constant.red,
        height: constant.moderateScale(40),
        width: constant.moderateScale(40),
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counttext: {
        fontFamily: constant.typeMedium,
        fontSize: constant.font34,
        color: constant.red,

    },
    countInput: {
        height: constant.moderateScale(35),
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: constant.whiteColor,
        width: constant.moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: constant.moderateScale(10),
        borderColor: constant.red
    },
    countInputText: {
        color: constant.blackColor,
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(15),
    },
    commentInput: {
        borderWidth: 1,
        height: constant.moderateScale(90),
        flex: 1,
        borderRadius: 10,
        borderColor: '#ABABAB',
        backgroundColor: constant.whiteColor,
        color: constant.blackColor,
        fontFamily: constant.typeLight,
        paddingHorizontal: "3%",
        fontSize: constant.moderateScale(14),
        textAlignVertical: 'top'
    },

    tabMainView: {
        paddingBottom: '1%',
        height: constant.moderateScale(50),

    },
    tabSubView: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#FE0F1780',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '3%',
        paddingTop: constant.moderateScale(7),
    },
    tabButton: {
        width: constant.resW(23),
        justifyContent: 'center'
    },
    tabButtonText: {
        fontSize: constant.moderateScale(15),
        color: constant.red,
        fontFamily: constant.typeMedium,
        marginTop: constant.moderateScale(4),

    },
    tabButton2: {
        width: constant.resW(23),
        justifyContent: 'center'
    },
    tabButtonText2: {
        fontSize: constant.moderateScale(15),
        color: constant.textColor,
        fontFamily: constant.typeLight,
        marginTop: constant.moderateScale(4),

    },
    horixontalLine: {
        height: constant.moderateScale(2.5),
        width: constant.moderateScale(45),
        backgroundColor: 'red',
        position: 'absolute',
        bottom: -constant.moderateScale(2),
        borderRadius: constant.resW(20)
    },
    uncheckBoxStyle: {
        height: constant.moderateScale(28),
        width: constant.moderateScale(28),
        color: '#ABABAB',
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