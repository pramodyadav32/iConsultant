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
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../../components/HomeHeader";
import FastImage from "react-native-fast-image";
import images from "../../utilities/images";
import * as common_fn from "../../utilities/common_fn";
import { APIName, imageUrl, tokenApiCall } from "../../utilities/apiCaller";
import CommonHeader from "../../components/CommonHeader";
import SelectDropList from "../../components/SelectDropList";
import Button from "../../components/Button";
import AddPartListModel from "./AddPartListModel";
import AddPackageModel from "./AddPackageModel";
import { emptyLoader_Action } from "../../redux/actions/AuthAction";

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

export default function PerformaAccessories(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const tabWidth = constant.resW(49);
  const [active, setActive] = useState(1);
  const [animatedValue] = useState(new Animated.Value(1));
  const [detailModal, setDetailModal] = useState(false);
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [packageModel, setPackageModel] = useState(false);
  const [addListModel, setAddListModel] = useState({ show: false, data: [] });
  const [totalAmount, setTotalAmount] = useState();
  const [totalQty, setTotalQty] = useState();
  const [partList, setPartList] = useState([]);
  

  const accessoriesList = ({ item, index }) => {
    return (
      <View
        style={[
          styles.costListMainView,
          { marginTop: constant.moderateScale(10) },
        ]}
      >
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>{item?.description}</Text>
        </View>

        <View style={styles.costListSubView3}>
          <TextInput
            keyboardType="numeric"
            style={styles.curr_IssueInput}
            onChangeText={(d) => fn_AddNegociatedPrice(item, index, d)}
          >{item?.negociatedPrice}</TextInput>
        </View>
        <View style={styles.costListSubView3}>
          <TextInput
            keyboardType="numeric"
            style={styles.curr_IssueInput}
            onChangeText={(d) => fn_AddQty(item, index, d)}
          >{item?.quantity}
          </TextInput>
        </View>

        <View style={[styles.costListSubView3, {}]}>
          {/* <Text style={styles.costListText2}>{item?.price}</Text> */}
          <TextInput
            keyboardType="numeric"
            editable={false}
            style={styles.curr_IssueInput1}
            onChangeText={(d) => fn_AddQty(item, index, d)}
          >{item?.totalAmount}
          </TextInput>
        </View>
      </View>
    );
  };

  const fn_AddNegociatedPrice = (item, index, d) => {
    let newArr = accessoriesData;
    item.negociatedPrice = d;
   item.totalAmount =  d.length===0 ? 0 : Number(d) * Number(item.quantity)
    newArr.splice(index, 1, item);
    setAccessoriesData([...newArr]);
  };

  const fn_AddQty = (item, index, d) => {
    let newArr = accessoriesData;
    item.quantity = d;
    item.totalAmount =  d.length===0 ? 0 : Number(d) * Number(item.negociatedPrice)
    newArr.splice(index, 1, item);
    setAccessoriesData([...newArr]);
  };

  const accessoriesHeaderList = () => {
    return (
      <View style={[styles.costListMainView, {}]}>
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>Description</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>MRP</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>QTY</Text>
        </View>
        <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Total Amt</Text>
        </View>
      </View>
    );
  };

  const accessoriesFooterList = () => {
    return (
      <View
        style={[
          styles.costListMainView,
          {
            backgroundColor: "#F0F0F0",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            paddingVertical: constant.moderateScale(7),
            paddingHorizontal: 10,
            marginHorizontal: 0,
          },
        ]}
      >
        <View style={[styles.driveListDetailSubView, {}]}>
          <Text style={styles.costListText2}>Total</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText3}> </Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText2}>{fn_calculateQtyTotal()}</Text>
        </View>
        <View style={[styles.costListSubView3, {}]}>
          <Text style={styles.costListText2}>{fn_calculateAmountTotal()}</Text>
        </View>
      </View>
    );
  };

  const fn_AddList = () => {
    // setAddListModel(true)
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      docLocation: selectedBranch.branchCode,
      docCode: "SRP",
      docFY: "2023-2024",
      docNo: 43,
      calledBy: "PART",
      package: "",
      searchString: "im",
      partCategory: "1",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(AddListCallBack, APIName.GetMstAccessories, "POST", param);
  };

  const AddListCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
      setAddListModel({
        show: true,
        data: res?.result?.proformaMstAccessoriesList?.searchResultList,
      });
      // updatePartList(res?.result?.proformaMstAccessoriesList?.searchResultList)
      
    } else {
      constant.showMsg(res.message);
    }
  };

  const updatePartList = (partList) => {
 let updatedPartList = partList.map((list, index) => {
      return { ...list, negociatedPrice: list?.price };
    });
    setAddListModel({
      show: true,
      data: updatedPartList,
    });
 };

  const fn_AddPackage = () => {
    // setPackageModel(true)
    dispatch(emptyLoader_Action(true));
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      docLocation: selectedBranch.branchCode,
      docCode: "SRP",
      docFY: "2023-2024",
      docNo: 43,
      calledBy: "PACKAGE",
      package: "",
      searchString: "im",
      partCategory: "1",
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(AddPackageCallBack, APIName.GetMstAccessories, "POST", param);
  };

  const AddPackageCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {
    } else {
      constant.showMsg(res.message);
    }
  };

  const fn_ListDataSelect = (d) => {
    console.log("part item gggggg = ", d);
    d["totalAmount"] = 0
    d["negociatedPrice"] = d?.price
    setAccessoriesData([...accessoriesData, ...[d]]);
    setAddListModel((s) => {
      return { ...s, show: false };
    });
  };

  const fn_calculateAmountTotal = () => {
    let totalAmount = 0;
    accessoriesData?.map((item) => {
      totalAmount = totalAmount + Number(item?.negociatedPrice)*item?.quantity;
    });
    return totalAmount
  };

  const fn_calculateQtyTotal = () => {
   let totalQty = 0;
   accessoriesData?.map((item) => {
     totalQty =  totalQty + (item?.quantity.length===0 ? 0 :  parseInt(item?.quantity));
   });
   return totalQty
 };

 const saveAccessoriesAndPackages = () => {
   dispatch(emptyLoader_Action(true));
   let tempArr = []
   accessoriesData?.map((item) => {
      let obj = {
         "packageCode": "",
         "itemCategory": "",
         "itemGroup": "",
         "partNo": item?.partNo,
         "qty": item?.quantity,
         "unit": "",
         "discountPer": item?.negociatedPrice,
         "mrp": item?.price
       }
       tempArr.push(obj)
    });
    let param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      "docLocation": "MADU01",
      "docCode": "SRP",
      "docFY": "2023-2024",
      "docNo": 53,
      "action": "A",
      "packageCode": "",
      "partNo": "",
      "loginUserId": userData?.userId,
      "ipAddress": "1:1",
      "proformaItemList": tempArr
    }
    tokenApiCall(AddPartCallBack, APIName.SaveAccessoriesAndPackages, "POST", param);
  };

  const AddPartCallBack = (res) => {
    console.log("search", JSON.stringify(res));
    dispatch(emptyLoader_Action(false));
    if (res.statusCode === 200) {

    } else {
      constant.showMsg(res.message);
    }
  };

 
  return (
    <View style={{ flex: 1, backgroundColor: "#E1E1E1" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cal_SubView2}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#F9F9F9",
              borderRadius: 10,
              marginHorizontal: constant.moderateScale(3),
              paddingHorizontal: constant.moderateScale(0),
              marginTop: constant.moderateScale(13),
              paddingBottom: constant.moderateScale(0),
            }}
          >
            <FlatList
              data={accessoriesData}
              style={{ height: constant.moderateScale(330) }}
              ListHeaderComponent={() => accessoriesHeaderList()}
              renderItem={accessoriesList}
              ListFooterComponent={() => accessoriesFooterList()}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="Add To List"
              click_Action={() => fn_AddList()}
              buttonExt={styles.button1}
            />
            {/* <Button title='Add Packages' click_Action={() => fn_AddPackage()} buttonExt={styles.button1} /> */}
          </View>
        </View>
        <Button
          title="Next"
          click_Action={() => saveAccessoriesAndPackages()}
          buttonExt={styles.performaButton}
        />
      </ScrollView>

      <AddPartListModel
        isVisible={addListModel.show}
        data={addListModel.data}
        onRequestClose={() =>
          setAddListModel((s) => {
            return { ...s, show: false };
          })
        }
        selectData={(d) => fn_ListDataSelect(d)}
      />
      <AddPackageModel
        isVisible={packageModel}
        onRequestClose={() => setPackageModel(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cal_SubView2: {
    flex: 1,
    backgroundColor: constant.whiteColor,
    marginBottom: constant.moderateScale(6),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  costListMainView: {
    flexDirection: "row",
    marginHorizontal: constant.moderateScale(5),
    marginTop: constant.moderateScale(10),
  },
  driveListDetailSubView: {
    flex: 1,
    // backgroundColor:'red'
  },
  costListSubView: {
    flex: 0.8,
    height: constant.moderateScale(30),
   
  },
  costListText2: {
    fontSize: constant.moderateScale(13),
    color: "#424242",
    fontFamily: constant.typeMedium,
  },
  costListText3: {
    fontSize: constant.moderateScale(12),
    color: "#434343",
    fontFamily: constant.typeLight,
  },
  costListSubView3: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-end",
    // backgroundColor:"green"
  },
  button1: {
    marginBottom: constant.moderateScale(10),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(0),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
    width: constant.moderateScale(150),
  },
  input1: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(15),
  },
  performaButton: {
    marginBottom: constant.moderateScale(30),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(70),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
  },
  curr_IssueInput:{
    borderWidth:1,
    height:constant.moderateScale(35),
    fontSize:constant.moderateScale(14),
    width:'90%',
    textAlign:'center',
    borderRadius:5,
    borderColor:'#ABABAB',
    fontFamily:constant.typeRegular,
  },
  curr_IssueInput1:{
    // borderWidth:1,
    height:constant.moderateScale(35),
    fontSize:constant.moderateScale(14),
    width:'90%',
    textAlign:'center',
    borderRadius:5,
    borderColor:'#ABABAB',
    fontFamily:constant.typeRegular,
    color:constant.blackColor
  }
});
