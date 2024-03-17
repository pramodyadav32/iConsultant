import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { userData_Action, emptyLoader_Action, home_Refresh_Action } from '../../redux/actions/AuthAction'
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
import CalenderModal from '../../components/CalenderModal';
import moment from 'moment';

let data1=[
  {"key":1},
  {"key":2},
  {"key":3},
  {"key":4},

]

export default function CloseInfo(props) {
  const { actionType_Data, modelData, data, perform_Data } = props
  const dispatch = useDispatch()
  const { userData, selectedBranch } = useSelector(state => state.AuthReducer)
  const [actionTypeData, setActionTypeData] = useState([])
  const [actionTypeValue, setActionTypeValue] = useState({})
  // const [modelData,setModelData] = useState([])
  const [modelValue, setModelValue] = useState({})
  const [performData, setPerformData] = useState(perform_Data)
  const [performValue, setPerformValue] = useState({})
  const [performDate, setPerformdate] = useState('')
  const [comment, setcomment] = useState('')
  const [closureDate, setClosureDate] = useState('')
  const [closureData, setClosureData] = useState([])
  const [closureValue, setClosureValue] = useState({})
  const [remark, setRemark] = useState('')

  const [actionCal_Modal, setActionCal_Modal] = useState(false)
  const [closureCal_Modal, setclosureCal_Modal] = useState(false)
  const [dislikeData,setDislikeData] = useState([])
  const [otherModel,setOtherModel] = useState({})
  const [varientData,setVarientData ] = useState([])
  const [varientValue,setVarientValue ] = useState([])
  const [brandData,setBrandData] = useState([])
  const [brandValue,setBrandValue] = useState([])
  const [showDislikeAndBrand,setShowDisLikeAndBrand] = useState(false)
  const [showDislike,setShowDisLike] = useState(false)
  const [showList,setShowList] = useState({show:false,data:[]})
  const [compVehBrandData, setCompVehBrandData] = useState([])
  const [compVehModelData, setCompVehModelData] = useState([])
  const [compVehVarientData, setCompVehVarientData] = useState([])
  const [compVehBrandSelected, setCompVehBrandSelected] = useState()
  const [compVehModelSelected, setCompVehModelSelected] = useState()
  const [compVehVarientSelected, setCompVehVarientSelected] = useState()

  const [dealerData,setDealerData] = useState([])
  const [dealerValue,setDealerValue] = useState({})
  const [tentativeDateModel,setTentativeDateModel] = useState({show:false,index:-1,obj:{}})

  console.log("data",data)
  useEffect(() => {
    fn_GetClosureMaster()
    fn_GetCompitionVehicleInfo("", "", "BRAND")
  }, [])


  const fn_GetClosureMaster = () => {
    dispatch(emptyLoader_Action(true))
    let param =
    {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "code": "",
      "loginUserCompanyId": userData?.companyId,
      "loginUserId": userData?.userId,
      "ipAddress": "1::1"
    }
    tokenApiCall(GetClosureMasterCallBack, APIName.GetClosureMasters, "POST", param)
  }

  const GetClosureMasterCallBack = async (res) => {
    console.log("search232323-", JSON.stringify(res?.result))
    if (res.statusCode === 200) {
      setClosureData(res?.result?.closureList)
      setDislikeData(res?.result?.dislikeList)
      setDealerData(res?.result?.dealerList)
      dispatch(emptyLoader_Action(false))
    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }


  const fn_ActionDateSelect = (data) => {
    setPerformdate(moment(data.timestamp).format("DD-MMM-yyyy"))
    setActionCal_Modal(false)
  }

  const fn_ClosureDateSelect = (data) => {
    setClosureDate(moment(data.timestamp).format("DD-MMM-yyyy"))
    setclosureCal_Modal(false)
  }
  const fn_TentativeDateSelect = (data) => {

    const originalDate = moment(data.timestamp);
    const utcDate = originalDate.utc();
    const zoneData = utcDate.toISOString()

    let newArr = showList?.data
     let newObj = tentativeDateModel?.obj
     if(newObj.dateValue != ''){
      let newDate = moment(data.timestamp).format("DD-MMM-yyyy")
      newObj.dateValue = newDate
      newObj.zoneDate = zoneData
      newArr.splice(tentativeDateModel?.index,1,newObj)
      setShowList(s=>{return{...s,data:newArr}})
     }else{
        let newDate = moment(data.timestamp).format("DD-MMM-yyyy")
        newObj["dateValue"] = newDate
        newObj["zoneDate"] = zoneData
        newArr.splice(tentativeDateModel?.index,1,newObj)
        setShowList(s=>{return{...s,data:newArr}})
     }
    setTentativeDateModel(s=>{return{...s,show:false}})
  }

  

  const fn_Create = async() => {
    // if (Object.keys(sourceValue).length === 0) {
    //     constant.showMsg("Please select source")
    // } else if (Object.keys(dealCategoryValue).length === 0) {
    //     constant.showMsg("Please select Deal Category")
    // } else if (Object.keys(dealTypeValue).length === 0) {
    //     constant.showMsg("Please select Deal Type")
    // } else if (Object.keys(companyValue).length === 0) {
    //     constant.showMsg("Please select Company")
    // } else {
      console.log("dislikenDa",JSON.stringify(dislikeData))
      let newArray = []
      await dislikeData.map((data)=>{
        data?.dislikeValues.map((item)=>{
          item.select ? newArray.push(data?.group+""+item?.code) : null
        })
       })

       console.log("row data",JSON.stringify(data1))
      let newArrayTable = []
      await data1?.map((item)=>{
          item.select ? newArrayTable.push(item) : null
       })
       console.log("newArrayTable = ", newArrayTable)

       let closureList = []
       showList.show ? 
       showList?.data.map((item)=>{
        if(item.dateValue != undefined){
          let newObj ={
            "serial": item?.vehicleSerial,
            "model": item?.modelCode,
            "variant": item?.variantCode,
            "exterior": item?.exteriorCode,
            "interior": item?.interiorCode,
            "qty": item?.quantity,
            "expectedDelvDate": item?.zoneDate,
            "proformaLocation": "",
            "proformaDoc": "",
            "proformaFY": "",
            "proformaNo": 0
          }
          closureList.push(newObj)
        }
       })
       : null


    const param = {
      "brandCode": userData?.brandCode,
      "countryCode": userData?.countryCode,
      "companyId": userData?.companyId,
      "branchCode": selectedBranch?.branchCode,
      "prospectNo": Number(data?.prospectID),
      "loginUserId": userData?.userId,
      "ipAddress": "1:1",
      "makeOrder": closureValue.code==='A' ? "Y" : "N",//closer type if A then send "Y" else "N"
      "make": showDislikeAndBrand ? compVehBrandSelected?.code : "",//base on close type
      "model": showDislikeAndBrand ? compVehModelSelected?.code : "",//base on close type
      "subModel": showDislikeAndBrand ? compVehVarientSelected?.code : "",//base on close type variant
      "dealerCode": closureValue?.code ==="C" ? dealerValue?.code : '',//base on close type if from other dealer
      "comment": comment,
      "closeType": closureValue?.code,
      "ruleSubCategory": "",
      "status": "",
      "closeDate": closureDate,
      "ordDate": moment(new Date()).format("DD-MMM-YYYY"),
      "prospectDisLikeList":showDislike ? newArray.join(",").toString() : '' ,
      "closureProductList": showList.show ? closureList : [],
      "reOpenDay": "",
      "reOpenMonth": "",
      "reOpenYear": ""
    }
    // }
    console.log("param", param)
    tokenApiCall(saveBasicInfoCallBack, APIName.SaveProspectClosure, "POST", param)

    // }

  }

  const saveBasicInfoCallBack = (res) => {
    console.log("res", res)
    if (res.statusCode === 200) {
      dispatch(home_Refresh_Action(true))

    } else {
      dispatch(emptyLoader_Action(false))
      constant.showMsg(res.message)
    }
  }

  const fn_GetCompitionVehicleInfo = (brandCode, modelCode, calledBy) => {
    dispatch(emptyLoader_Action(true))
    let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "branchCode": selectedBranch?.branchCode,
        "prospectNo": Number(data?.prospectID),
        "proformaId": 0,
        "assembly": "",
        "edition": "",
        "model": "",
        "subModel": "",
        "style": "",
        "my": 0,
        "vy": 0,
        "exterior": "",
        "interior": "",
        "calledBy": brandCode === "" ? "COMPETITION_BRAND,COMPETITION_MODEL,COMPETITION_VARIANT" : modelCode === "" ? "COMPETITION_MODEL,COMPETITION_VARIANT" :"COMPETITION_VARIANT",
        "priceListApplicable": "",
        "billingLocation": "",
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
        "CompetitionBrandCode": brandCode,
        "CompetitionModelCode": modelCode,
        "CompetitionVariantCode": ""
        }
    tokenApiCall(GetCompitionVehicleInfoCallBack, APIName.GetProformaGeneralMast, "POST", param, calledBy)
}

const GetCompitionVehicleInfoCallBack = async (res, calledBy) => {
    console.log("GetCompitionVehicleInfoCallBack", JSON.stringify(res))
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
        if(calledBy === "BRAND"){
            setCompVehBrandData(res?.result?.selectMasterList[0]?.basicList)
        }else if(calledBy === "MODEL"){
            setCompVehModelData(res?.result?.selectMasterList[0]?.basicList)
        }else{
            setCompVehVarientData(res?.result?.selectMasterList[0]?.basicList)
        }
    } else {
        constant.showMsg(res.message)
    }
}


const fn_clickCheck=(item,index,data,listIndex)=>{
   let dislikeArr = data
   let newArray = dislikeData
   if(dislikeArr[index].select){
    dislikeArr[index].select = false
    newArray[listIndex].dislikeValues = dislikeArr
    setDislikeData([...newArray])
   }else{
    dislikeArr[index]["select"] = true
    newArray[listIndex].dislikeValues = dislikeArr
    setDislikeData([...newArray])

   }
}

const fn_ListHeaderClick=async(data,index)=>{
   let newObj = data
   let newArray = []
   let arr = dislikeData
   if(newObj.select){
    newObj["select"] = false
    await newObj?.dislikeValues.map((item,index)=>{
       item["select"] = false
       newArray.push(item)
      })
      newObj.dislikeValues = newArray
      arr.splice(index,1,newObj)
      setDislikeData([...arr])
   }else{
    newObj["select"] = true
    await newObj?.dislikeValues.map((item,index)=>{
       item["select"] = true
       newArray.push(item)
      })
      newObj.dislikeValues = newArray
      arr.splice(index,1,newObj)
      setDislikeData([...arr])
   }
 
}

  const subListRender=(item,index,data,listIndex)=>{
    return(
      <Pressable style={styles.listButton2}  onPress={()=>{fn_clickCheck(item,index,data,listIndex)}}>
      <FastImage source={item?.select ? images.checkIcon : images.unCheckIcon} resizeMode='contain' style={styles.checkIconStyle} />
       <Text style={styles.listText2}>{item?.description}</Text>
     </Pressable>
    )
  }

  const renderItem=(data,listIndex)=>{
    return(
      <View style={styles.listMainView}>
         <Pressable style={styles.listButton} onPress={()=>fn_ListHeaderClick(data,listIndex)} >
           <FastImage source={data?.select ? images.checkIcon : images.unCheckIcon} resizeMode='contain' style={styles.checkIconStyle} />
            <Text style={styles.listText}>{data?.groupDesc}</Text>
          </Pressable>
          <View style={styles.listSubView}>
            <FlatList data={data?.dislikeValues}
             renderItem={({item,index})=>subListRender(item,index,data?.dislikeValues,listIndex)}
            />
         
          </View>

      </View>
    )
  }

  const fn_GetVehicleList=()=>{
    // dispatch(emptyLoader_Action(true))
    let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "branchCode": selectedBranch?.branchCode,
        "prospectNo": Number(data?.prospectID),
        "loginUserCompanyId": userData?.companyId,
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
       
        }
    tokenApiCall(GetVehicleListCallBack, APIName.GetVehiclesRequiredList, "POST", param)

  }

  const GetVehicleListCallBack = async (res) => {
    console.log("GetCompitionVehicleInfoCallBack", JSON.stringify(res))
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
      setShowList({show:true,data:res?.result?.vehicleRequiredList})
    } else {
        constant.showMsg(res.message)
    }
}

  const fn_Closure=(d)=>{
    setClosureValue(d)
    if(d.code==='000001'){
        setShowDisLike(true)
        setShowDisLikeAndBrand(true)
      setShowList(s=>{return{...s,show:false}})
    }else if(d.code === '000002'){
      setShowDisLike(true)
      setShowDisLikeAndBrand(false)
      setShowList(s=>{return{...s,show:false}})
    }else if(d.code ==='A'){
      setShowDisLike(false)
      setShowDisLikeAndBrand(false)
      fn_GetVehicleList()
    }else{
      setShowDisLike(false)
      setShowDisLikeAndBrand(false)
      setShowList(s=>{return{...s,show:false}})
    }
  }

  const fn_OtherModelSelect=(d)=>{
    setOtherModel(d)
    fn_GetVehicleActionClose(d) 
  }

  const fn_GetVehicleActionClose = (d) => {
    dispatch(emptyLoader_Action(true))
    let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "calledBy": "EDITION,ASSEMBLY,MODEL,VARIANT",
        "edition": "",
        "assembly": "",
        "subModel": "",
        "model": d.code,
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
            if (item.listType === 'VARIANT') {
                setVarientData(item.vehicleMaster)
            }
        })
        dispatch(emptyLoader_Action(false))
    } else {
        dispatch(emptyLoader_Action(false))
        constant.showMsg(res.message)
    }
}

const fn_ListHeader=()=>{
  return(
    <View style={styles.otherListMainView}>
      <View style={styles.otherListSubView2} >
       <Text style={styles.otherListText}>Assembly</Text>
      </View>
      <View style={styles.otherListSubView3} >
       <Text style={styles.otherListText}>Model</Text>
      </View>
      <View style={styles.otherListSubView3} >
       <Text style={styles.otherListText}>Exterior Color</Text>
      </View>
      <View style={styles.otherListSubView4} >
       <Text style={styles.otherListText}>Order QTY</Text>
      </View>
      <View style={styles.otherListSubView} >
       <Text style={styles.otherListText}>Tentative Delv Date</Text>
      </View>
    </View>
  )
}

const listrenderItem=(item,index)=>{
  return(
    <View style={styles.otherListMainView2}>
      <View style={styles.otherListSubView6} >
       <Text style={styles.otherListText2}>{item?.assemblyDescription}</Text>
      </View>
      <View style={styles.otherListSubView7} >
       <Text style={styles.otherListText2}>{item?.modelDescription}</Text>
      </View>
      <View style={styles.otherListSubView7} >
       <Text style={styles.otherListText2}>{item?.exteriorDescription}</Text>
      </View>
      <View style={styles.otherListSubView8} >
      <SelectDropList
              list={actionType_Data}
              title={item?.quantity}
              disable={true}
              buttonExt={styles.dropList2}
              textExt={styles.dropListText2}
              on_Select={(d) => null}
            />
      </View>
      {console.log("neww",moment(new Date()).add(61, 'd').format("YYYY-MM-DD"))}
      <Pressable style={styles.otherListSubView5} onPress={()=>setTentativeDateModel({show:true,index:index,obj:item})} >
      <SelectDropList
              list={actionType_Data}
              title={item.dateValue != undefined ? item.dateValue : " "}
              disable={true}
              buttonExt={styles.dropList3}
              textExt={styles.dropListText3}
              on_Select={(d) =>null}
            />
      </Pressable>
    </View>
  )
}

const fn_ListFooter=()=>{
  return(
    <View style={{flex:1,backgroundColor:constant.whiteColor,height:constant.moderateScale(15),borderBottomLeftRadius:constant.moderateScale(10),borderBottomRightRadius:constant.moderateScale(10)}} />
  )
}
  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor:constant.whiteColor, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: constant.moderateScale(20) }}>
          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={actionType_Data}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setActionTypeValue(d)}
            />
          </View>

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
            <Text style={styles.detailText}>Performed</Text>
            <SelectDropList
              list={perform_Data}
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) => setPerformValue(d)}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed Date<Text style={styles.text2}>*</Text></Text>
            <Pressable style={styles.calenderMainView} onPress={() => setActionCal_Modal(true)}>
              <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{performDate}</TextInput>
              <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
            </Pressable>
          </View>

          <View style={[styles.detailMainView, { alignItems: 'flex-start' }]}>
            <Text style={[styles.detailText, { marginTop: '3%' }]}>Action Comment</Text>
            <TextInput placeholder='Enter Comment' onChangeText={(d) => setcomment(d)} style={styles.commentInput} >{comment}</TextInput>
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Date</Text>
            <Pressable style={styles.calenderMainView} onPress={() => setclosureCal_Modal(true)}>
              <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{closureDate}</TextInput>
              <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
            </Pressable>
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Type</Text>
            <SelectDropList
              list={closureData}
              title=' '
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) =>fn_Closure(d)}

            />
          </View>

          <View style={[styles.detailMainView, { alignItems: 'flex-start' }]}>
            <Text style={[styles.detailText, { marginTop: '3%' }]}>Remarks</Text>
            <TextInput placeholder='Enter Remarks' onChangeText={(d) => setRemark(d)} style={styles.commentInput} >{remark}</TextInput>
          </View>
       {closureValue?.code==='C' &&   <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Dealer</Text>
            <SelectDropList
              list={dealerData}
              title=' '
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) =>{setDealerValue(d)}}
            />
          </View>
       }
          {showDislikeAndBrand &&  <View>
          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={compVehBrandData}
              title=' '
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) =>{
                setCompVehBrandSelected(d)
                fn_GetCompitionVehicleInfo(d?.code, "", "MODEL")
              }}

            />
          </View>
          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={compVehModelData}
              title=' '
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) =>{
                setCompVehModelSelected(d)
                fn_GetCompitionVehicleInfo(compVehBrandSelected?.code, d?.code, "VARIENT")
              }}

            />
          </View>

          <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Varient<Text style={styles.text2}>*</Text></Text>
            <SelectDropList
              list={compVehVarientData}
              title=' '
              buttonExt={styles.dropList}
              textExt={styles.dropListText}
              on_Select={(d) =>setCompVehVarientSelected(d)}

            />
          </View>
          </View>
        }

        {showDislike &&  <Pressable style={styles.tabButton} >
            <Text style={styles.tabButtonText}>Dissatisfaction Reasons</Text>
            <View style={styles.horixontalLine} />
          </Pressable>
}
          {showDislike &&
          <FlatList 
           data={dislikeData}
           renderItem={({item,index})=>renderItem(item,index)}
          />
          }

     {showList?.show &&  <View style={{elevation:1,borderRadius:constant.moderateScale(10),marginHorizontal:constant.moderateScale(5),marginTop:constant.moderateScale(15)}}>
            <FlatList 
             data={showList?.data}
             renderItem={({item,index})=>listrenderItem(item,index)}
             ListHeaderComponent={()=>fn_ListHeader()}
             ListFooterComponent={()=>fn_ListFooter()}
            />
          </View>
     }
      
        </View>
        <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

      </ScrollView>

      <CalenderModal
        isVisible={actionCal_Modal}
        onRequestClose={() => setActionCal_Modal(false)}
        onDateClick={(data) => fn_ActionDateSelect(data)}
      />

      <CalenderModal
        isVisible={closureCal_Modal}
        onRequestClose={() => setclosureCal_Modal(false)}
        onDateClick={(data) => fn_ClosureDateSelect(data)}
      />
       <CalenderModal
        isVisible={tentativeDateModel?.show}
        onRequestClose={() => setTentativeDateModel(s=>{return{...s,show:false}})}
        onDateClick={(data) => fn_TentativeDateSelect(data)}
        type={2}
      />
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
  performaButton: {
    marginBottom: constant.moderateScale(30),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(70),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
  },
  tabButton: {
    justifyContent: 'center',
    paddingVertical: constant.moderateScale(4),
    marginHorizontal: constant.moderateScale(10),
    marginBottom:constant.moderateScale(8)
  },
  tabButtonText: {
    fontSize: constant.moderateScale(15),
    color:'#686868',
    fontFamily: constant.typeRegular,
    marginTop: constant.moderateScale(4),

  },

  horixontalLine: {
    height: constant.moderateScale(2),
    width: constant.moderateScale(70),
    backgroundColor: 'red',
    position: 'absolute',
    bottom: -constant.moderateScale(0.5),
    borderRadius: constant.resW(20)
  },
  listMainView:{
    borderRadius:constant.moderateScale(10),
    backgroundColor:'#F0F0F0',
    marginBottom:constant.moderateScale(10),
    marginHorizontal:constant.moderateScale(8),
    elevation:1
  },
  listSubView:{
   backgroundColor:constant.whiteColor,
   borderBottomLeftRadius:constant.moderateScale(10),
   borderBottomRightRadius:constant.moderateScale(10)
  },
  checkIconStyle:{
    height: constant.moderateScale(23),
    width: constant.moderateScale(23),
  },
  listButton: {
    paddingVertical: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(15),
    flexDirection:'row',
    alignItems:"center",

  },
  listButton2: {
    paddingVertical: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(15),
    flexDirection:'row',
    alignItems:"center",

  },
  listText: {
    fontSize: constant.moderateScale(16),
    color: constant.blackColor,
    fontFamily: constant.typeRegular,
    marginLeft:constant.moderateScale(10)

  },
  listText2: {
    fontSize: constant.moderateScale(15),
    color: '#686868',
    fontFamily: constant.typeThin,
    marginLeft:constant.moderateScale(10)

  },
  otherListMainView:{
  flexDirection:'row', 
  borderTopLeftRadius:constant.moderateScale(10),
  borderTopRightRadius:constant.moderateScale(10),
  backgroundColor:'#F0F0F0',
  // marginTop:constant.moderateScale(15),
  // marginHorizontal:constant.moderateScale(5),
  paddingHorizontal:constant.moderateScale(8)
  },
  otherListSubView:{
  flex:1,
  paddingVertical:constant.moderateScale(10)
  },
  otherListSubView2:{
    flex:0.7,
    paddingVertical:constant.moderateScale(10)
    },
    otherListSubView3:{
      flex:0.6,
      paddingVertical:constant.moderateScale(10)
      },
      otherListSubView4:{
        flex:0.7,
        paddingVertical:constant.moderateScale(10)
        },
  otherListText:{
    fontSize: constant.moderateScale(12),
    color: constant.blackColor,
    fontFamily: constant.typeMedium,
    flexWrap:'wrap'
  },
  otherListMainView2:{
    flexDirection:'row', 
    backgroundColor:constant.whiteColor,
    // marginHorizontal:constant.moderateScale(5),
    paddingHorizontal:constant.moderateScale(8)
    },
    otherListSubView5:{
    flex:1,
    paddingVertical:constant.moderateScale(10)
    },
    otherListSubView6:{
      flex:0.7,
      paddingVertical:constant.moderateScale(10)
      },
      otherListSubView7:{
        flex:0.6,
        paddingVertical:constant.moderateScale(10)
        },
        otherListSubView8:{
          flex:0.7,
          paddingVertical:constant.moderateScale(10)
          },
    otherListText2:{
      fontSize: constant.moderateScale(11),
      color: '#3B3B3B',
      fontFamily: constant.typeRegular,
      flexWrap:'wrap'
    },
    dropList2: {
      borderWidth: 1,
      height: constant.moderateScale(30),
      width:'90%',
      borderRadius: constant.moderateScale(5),
      borderColor: '#ABABAB',
      backgroundColor: constant.whiteColor,
    },
    dropListText2: {
      fontSize: constant.moderateScale(11),
      color: constant.textColor,
      fontFamily: constant.typeRegular,
    },
    dropList3: {
      borderWidth: 1,
      height: constant.moderateScale(30),
      width:'100%',
      borderRadius: constant.moderateScale(5),
      borderColor: '#ABABAB',
      backgroundColor: constant.whiteColor,
      paddingHorizontal:0,
    },
    dropListText3: {
      fontSize: constant.moderateScale(11),
      color: constant.textColor,
      fontFamily: constant.typeRegular,
    },
})