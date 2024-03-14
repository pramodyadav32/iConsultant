import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
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
import moment from "moment"

export default function VehicleReqInfo(props) {
  const { cardClick, modelData, modelSelect, vehicledata,prospectData } = props
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()
  const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
  const [modelValue, setModelValue] = useState({})
  const [editionData, setEditionData] = useState([])
  const [editionValue, setEditionValue] = useState({})
  const [assemblyData, setAssemblyData] = useState([])
  const [assemblyValue, setAssemblyValue] = useState({})
  const [varientData, setvarientData] = useState([])
  const [varientValue, setVarientValue] = useState({})
  const [styleData, setStyleData] = useState([])
  const [styleValue, setStyleValue] = useState({})
  const [exteriorData, setExteriorData] = useState([])
  const [exteriorValue, setExteriorValue] = useState({})
  const [inteiorData, setInteriorData] = useState([])
  const [interiorValue, setInteriorValue] = useState({})
  const [my_Data, setMyData] = useState([])
  const [my_DataValue, setMyDataValue] = useState({})
  const [vy_Data, setVyData] = useState([])
  const [vy_DataValue, setVyDataValue] = useState({})
  const [priceAvailable, setPriceAvailable] = useState()

  useEffect(() => {
    vehicledata.map((item) => {
      if (item.listType === 'EDITION') {
        setEditionData(item.vehicleMaster)
      } else if (item.listType === 'ASSEMBLY') {
        setAssemblyData(item.vehicleMaster)
      } else if (item.listType === 'VARIANT') {
        setvarientData(item.vehicleMaster)
      } else if (item.listType === 'STYLE') {
        setStyleData(item.vehicleMaster)
      } else if (item.listType === 'EXT_COLOR') {
        setExteriorData(item.vehicleMaster)
      } else if (item.listType === 'INT_COLOR') {
        setInteriorData(item.vehicleMaster)
      } else if (item.listType === 'VY') {
        setVyData(item.vehicleMaster)
      } else if (item.listType === 'MY') {
        setMyData(item.vehicleMaster)
      }
    })
  }, [vehicledata])

  useEffect(() => {
    priceStatus()
  }, [])
  

  const fn_ModelSelect = (d) => {
    setModelValue(d)
    modelSelect(d)
  }

  const fn_Create = () => {
    if (Object.keys(modelValue).length === 0) {
      constant.showMsg("Please select model")
    } else if (Object.keys(editionValue).length === 0) {
      constant.showMsg("Please Select edition")
    } else if (Object.keys(varientValue).length === 0) {
      constant.showMsg("Please Select Varient")
    } else if (Object.keys(exteriorValue).length === 0) {
      constant.showMsg("Please Select exterior ")
    } else if (Object.keys(styleValue).length === 0) {
      constant.showMsg('Please select style')
    } else if (Object.keys(exteriorValue).length === 0) {
      constant.showMsg("Please select exterior ")
    } else if (Object.keys(interiorValue).length === 0) {
      constant.showMsg("Please select interior")
    } else if (Object.keys(my_DataValue).length === 0) {
      constant.showMsg("Please select MV")
    } else if (Object.keys(vy_DataValue).length === 0) {
      constant.showMsg("Please select VY")
    } else if (Object.keys(assemblyValue).length === 0) {
      constant.showMsg("Please select assembly ")
    } else if (count <= 0) {
      constant.showMsg("Count must be greater than zero")
    } else {
      fn_VehicleSave()
    }

  }

  const fn_VehicleSave = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "dealerCode": userData?.empCode,
      "branchCode": selectedBranch?.branchCode,
      "prospectNo": Number(prospectData?.prospectId),
      "assembly": assemblyValue.code,
      "edition": editionValue.code,
      "prospectLocation": selectedBranch?.branchCode,
      "fy": "string",
      "make": "string",
      "model": modelValue.code,
      "subModel": varientValue?.code,
      "style": styleValue.code,
      "my": Number(my_DataValue.code),
      "vy": Number(vy_DataValue.code),
      "qty": count,
      "color": exteriorValue.code,
      "interiorColor": interiorValue.code,
      "delete": "string",
      "save": "string",
      "edit": "string",
      "loginUserId": userData?.userId,
      "ipAddress": "1::1",
      "serial": 0
    }
    tokenApiCall(VehicleSaveCallBack, APIName.SaveVehiclesRequired, "POST", param)

  }

  const VehicleSaveCallBack = (res) => {
    console.log("res", res)
    if (res.statusCode === 200) {
      res?.result?.resultCode === "Y" ? constant.showMsg("Data Saved Successfully.") : constant.showMsg("Error while data saving.")
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const priceStatus = () => {
    let param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "prospectNo": Number(prospectData?.prospectId),
      "proformaId": 0,
      "assembly": assemblyValue.code,
      "edition": editionValue.code,
      "model": modelValue.code,
      "subModel": varientValue?.code,
      "style": styleValue.code,
      "my": Number(my_DataValue.code),
      "vy": Number(vy_DataValue.code),
      "exterior": exteriorValue.code,
      "interior": interiorValue.code,
      "calledBy": "VEH_PRICE",
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
    }
    tokenApiCall(priceStatusCallBack, APIName.GetProformaGeneralMasters, "POST", param)

  }

  const priceStatusCallBack = (res) => {
    console.log("res", res)
    if (res.statusCode === 200) {
      setPriceAvailable("")
    } else {
      dispatch(emptyLoader_Action(false))
      // constant.showMsg(res.message)
    }
  }

  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: constant.whiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: constant.moderateScale(20) }}>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={modelData}
              buttonExt={styles.dropList}
              title={modelValue?.description}
              textExt={styles.dropListText}
              on_Select={(d) => fn_ModelSelect(d)}
            />
          </View>
          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Edition<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={editionData}
              title={editionValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setEditionValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Varient</Text>
            <SelectDropList
              list={varientData}
              title={varientValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setVarientValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Style<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={styleData}
              title={styleValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setStyleValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Exterior<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={exteriorData}
              title={exteriorValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setExteriorValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Internal</Text>
            <SelectDropList
              list={inteiorData}
              title={interiorValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setInteriorValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>MY/VY</Text>
            <View style={styles.mobileSubView}>
              <SelectDropList
                list={my_Data}
                title={my_DataValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => setMyDataValue(d)}

              />
              <Text> </Text>
              <SelectDropList
                list={vy_Data}
                title={vy_DataValue?.description}
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
              title={assemblyValue?.description}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setAssemblyValue(d)}

            />
          </View>

          <View style={styles.bottomMainView}>
            {/* <View style={styles.detailMainView2}>
            <Text style={styles.detailText}>Fuel</Text>
           <SelectDropList 
             list={[]}
             title='Please Select'
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View> */}

            <View style={styles.detailMainView2}>
              <Text style={styles.detailText}>Reference</Text>
              <TextInput style={styles.refInput} editable={false} >Available</TextInput>

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
        </View>
        <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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

  dropNameList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    borderRadius: 8,
    width: constant.resW(17),
    borderColor: '#ABABAB',
    backgroundColor: constant.whiteColor,
    paddingHorizontal: 0
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
  minusStyle: {
    height: constant.moderateScale(20),
    width: constant.moderateScale(20),
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