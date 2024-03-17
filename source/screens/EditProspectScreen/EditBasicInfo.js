import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import images from "../../utilities/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  userData_Action,
  emptyLoader_Action,
  home_Refresh_Action,
} from "../../redux/actions/AuthAction";
import { CommonActions } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
// import styles from './EditProspectStyle'
import Button from "../../components/Button";
import * as constant from "../../utilities/constants";
import * as common from "../../utilities/common_fn";
import { apiCall, APIName, tokenApiCall } from "../../utilities/apiCaller";
import * as common_fn from "../../utilities/common_fn";
import SelectDropList from "../../components/SelectDropList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

export default function EditBasicInfo(props) {
  const { cardClick, data, prospectMaster, fn_SaveBasicInfo } = props;
  const dispatch = useDispatch();
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const [checkStatus, setCheckStatus] = useState(false);
  const [sourceData, setSourceData] = useState([]);
  const [sourceValue, setSourceValue] = useState({});
  const [dealCategoryData, setDealCategoryData] = useState([]);
  const [dealCategoryValue, setDealCategoryValue] = useState({});
  const [dealTypeData, setDealTypeData] = useState([]);
  const [dealTypeValue, setDealTypeValue] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const [companyValue, setCompanyValue] = useState({});
  const [corporateComment, setCorporateComment] = useState("");
  const [generalComment, setGeneralComment] = useState("");
  const [corporateCase, setCorporateCase] = useState("N");
  const [eventSourceData, setEventSourceData] = useState();
  const [eventSourceList, setEventSourceList] = useState([]);

  useEffect(() => {
    console.log("prospectMaster =====", JSON.stringify(prospectMaster))
    prospectMaster.map((item) => {
      if (item.listType === "SOURCE") {
        setSourceData(item.prospectMasterList);
        item.prospectMasterList.map((item) => {
          item?.code === data?.sourceCode ? setSourceValue(item) : null;
        });
      } else if (item.listType === "DEALCATEGORY") {
        setDealCategoryData(item.prospectMasterList);
      } else if (item.listType === "DEALTYPE") {
        setDealTypeData(item.prospectMasterList);
      } else if (item.listType === "CORPORATE") {
        item.prospectMasterList.map((item) => {
          item?.code === data?.dealCompany ? setCompanyValue(item) : null;
        });
        setCompanyData(item.prospectMasterList);
      }
    });
    setCorporateCase(data?.isCorporateCase);
    setCorporateComment(data?.corporateComment);
    setGeneralComment(data?.comment);
    fn_GetEventSource()
  }, [prospectMaster]);

  const fn_GetEventSource = () => {
    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      sourceCode: "07",
      refCode: "07",
      campaign: "",
      prospectOpenedOn: moment(data?.prospectOpenedOn, "DD-MMM-YYYY, hh:mm A").format("DD-MMM-YYYY"),
      loginUserId: userData?.userId,
      ipAddress: "1::1",
    };
    tokenApiCall(
      getEventSourceCallBack,
      APIName.GetCampaignsMaster,
      "POST",
      param
    );
  };

  const getEventSourceCallBack = (res) => {
    console.log("res", res);
    if (res.statusCode === 200) {
      setEventSourceList(res?.result?.campaignsMaster);
    } else {
      constant.showMsg(res.message);
    }
  };


  const fn_GetProspectMaster = (dealCategory, dealType, calledByDropdown) => {
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
        "corpDealCategory": dealCategory,
        "dealType": dealType,
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
    tokenApiCall(GetProspectMasterCallBack, APIName.GetProspectMaster, "POST", param, calledByDropdown)
}

const GetProspectMasterCallBack = async (res, calledByDropdown) => {
    console.log("search1111", JSON.stringify(res))
    dispatch(emptyLoader_Action(false))
    if (res.statusCode === 200) {
        if(calledByDropdown === "DEAL_TYPE"){
          res?.result.map((item) => {
          if (item.listType === "DEALTYPE") {
            setDealTypeData(item.prospectMasterList);
          }
        });
        }else{
          res?.result.map((item) => {
          if (item.listType === "CORPORATE") {
            item.prospectMasterList.map((item) => {
              item?.code === data?.dealCompany ? setCompanyValue(item) : null;
            });
            setCompanyData(item.prospectMasterList);
          }
        });
        }
    } else {
        constant.showMsg(res.message)
    }
}


  const fn_Create = () => {
    if (Object.keys(sourceValue).length === 0) {
      constant.showMsg("Please select source");
    } else if (corporateCase === "Y" && Object.keys(dealCategoryValue).length === 0) {
      constant.showMsg("Please select Deal Category");
    } else if (corporateCase === "Y" && Object.keys(dealTypeValue).length === 0) {
      constant.showMsg("Please select Deal Type");
    } else if (corporateCase === "Y" && Object.keys(companyValue).length === 0) {
      constant.showMsg("Please select Company");
    } else {
      const param = {
        brandCode: userData?.brandCode,
        countryCode: userData?.countryCode,
        companyId: userData?.companyId,
        prospectLocation: selectedBranch.branchCode,
        prospectNo: Number(data?.prospectID),
        openedOn: moment(data?.prospectOpenedOn, "DD-MMM-YYYY, hh:mm A").format(
          "DD-MMM-YYYY"
        ), //moment(data?.prospectOpenedOn).format("DD-MMM-YYYY"),
        projectedClosureDate: moment(
          data?.projectedClosureDate,
          "DD-MMM-YYYY, hh:mm A"
        ).format("DD-MMM-YYYY"), //moment(data?.projectedClosureDate).format("DD-MMM-YYYY"),
        importance: data?.impCode === null ? "" : data?.impCode,
        financeCase:
          data?.financeCaseFlag === null ? "" : data?.financeCaseFlag,
        financeLocation:
          data?.financerLocation === null ? "" : data?.financerLocation,
        financer: "",
        activeRate: data?.rating === null ? "" : data?.rating,
        usage: data?.usageCode,
        source: sourceValue?.code,
        refFrom: data?.referenceId,
        corporateFlag: corporateCase,
        corporateComment: corporateCase === "Y" ? corporateComment : "",
        comment: generalComment === null ? "" : generalComment,
        approveFlag: corporateCase === "Y" ? dealCategoryValue?.code : "",
        dealType: corporateCase === "Y" ? dealTypeValue?.code : "",
        dealerCompanyDocket:corporateCase === "Y" ? Number(companyValue?.code) : 0,
        agencyLeadId: 0,
        agencyId: 0,
        refCustomer: 0, //data?.custReference,
        category: "",
        valueString: "",
        loginUserCompanyId: userData?.userCompanyId,
        loginUserId: userData?.userId,
        ipAddress: "1::1",
        branchCode: selectedBranch?.branchCode,
        campaign: eventSourceData === undefined ? "" : eventSourceData?.serial,
        competitionModels: "",
      };
      console.log("param", param);
      tokenApiCall(
        saveBasicInfoCallBack,
        APIName.SaveProspectBasicInfo,
        "POST",
        param
      );
    }
  };

  const saveBasicInfoCallBack = (res) => {
    console.log("res", res);
    if (res.statusCode === 200) {
      dispatch(home_Refresh_Action(true))
      res?.result?.resultCode === "Y"
        ? constant.showMsg("Data Saved Successfully.")
        : constant.showMsg("Error while data saving.");
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: constant.whiteColor,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingBottom: constant.moderateScale(20),
          }}
        >
          <View
            style={[
              styles.listDetailView,
              {
                marginTop: constant.moderateScale(15),
                marginHorizontal: constant.moderateScale(5),
              },
            ]}
          >
            <View style={[styles.listDetailSubView, {}]}>
              <Text style={styles.text2}>Opened on</Text>
              <Text style={styles.list3}>{data?.prospectOpenedOn}</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
              <Text style={styles.text2}>OLM Lead</Text>
              <Text style={styles.list3}>
                {data?.isOlmCase === "N" ? "No" : "Yes"}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Source</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <SelectDropList
                list={sourceData}
                title={sourceValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                on_Select={(d) => {
                    if(sourceValue?.code !== "07")  setEventSourceData(undefined)
                    setSourceValue(d)}
                }
              />
            </View>
          </View>

          {sourceValue?.code === "07" ? (
            <View
              style={[
                styles.basicDetailView,
                { marginTop: constant.moderateScale(10) },
              ]}
            >
              <View style={[styles.basicDetailSubView]}>
                {/* <Text style={styles.detailText}>Source</Text> */}
              </View>
              <View style={styles.basicDetailSubView2}>
                <SelectDropList
                  list={eventSourceList}
                  title="Select Campaign"
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setEventSourceData(d)}
                />
              </View>
            </View>
          ) : null}
          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Corporate Case</Text>
            </View>
            <Pressable
              style={styles.basicDetailSubView2}
              onPress={() =>
                corporateCase === "Y"
                  ? setCorporateCase("N")
                  : setCorporateCase("Y")
              }
            >
              <FastImage
                resizeMode="contain"
                source={
                  corporateCase === "Y" ? images.checkIcon : images.unCheckIcon
                }
                style={styles.uncheckBoxStyle}
              />
            </Pressable>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Deal Category</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <SelectDropList
                list={dealCategoryData}
                title=" "
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                disable={corporateCase === "Y" ? false : true}
                on_Select={(d) => {
                  setDealCategoryValue(d)
                  fn_GetProspectMaster(d?.code, "", "DEAL_TYPE")
                }
                }
              />
            </View>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Deal Type</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <SelectDropList
                list={dealTypeData}
                title=" "
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                disable={corporateCase === "Y" ? false : true}
                on_Select={(d) => {
                  console.log("aaaaaa = ", dealCategoryValue)
                  console.log("aaaaaa = ", d)
                  setDealTypeValue(d)
                  setCompanyValue({})
                  setCompanyData([])
                  fn_GetProspectMaster(dealCategoryValue?.code, d?.code, "CORPORATE")
                }
                }
              />
            </View>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Company</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <SelectDropList
                list={companyData}
                refType={Object.keys(companyValue).length===0 ?false : true}
                title={companyValue?.description}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
                disable={corporateCase === "Y" ? false : true}
                on_Select={(d) => setCompanyValue(d)}
              />
            </View>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>Corporate Case Comment</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <TextInput
                onChangeText={(d) => setCorporateComment(d)}
                style={styles.commentInput}
                editable={corporateCase === "Y" ? true : false}
              >
                {corporateComment}
              </TextInput>
            </View>
          </View>

          <View
            style={[
              styles.basicDetailView,
              { marginTop: constant.moderateScale(10) },
            ]}
          >
            <View style={[styles.basicDetailSubView]}>
              <Text style={styles.detailText}>General Comment</Text>
            </View>
            <View style={styles.basicDetailSubView2}>
              <TextInput
                onChangeText={(d) => setGeneralComment(d)}
                style={styles.commentInput}
              >
                {generalComment}
              </TextInput>
            </View>
          </View>
        </View>
        <Button
          title="Save"
          click_Action={() => fn_Create()}
          buttonExt={styles.performaButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  driveListDetailSubView2: {
    flex: 1,
    height: constant.moderateScale(30),
  },

  text2: {
    fontSize: constant.moderateScale(10),
    color: "#727272",
    fontFamily: constant.typeMedium,
    letterSpacing: 0.5,
  },
  listDetailView: {
    flexDirection: "row",
    marginHorizontal: constant.moderateScale(0),
    marginTop: constant.moderateScale(20),
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingVertical: constant.moderateScale(8),
    paddingHorizontal: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
    elevation: 1,
  },
  listDetailSubView: {
    flex: 1,
  },
  list3: {
    fontSize: constant.moderateScale(12),
    color: "#000000",
    fontFamily: constant.typeRegular,
  },

  dropList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    width: "100%",
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
  },
  dropListText: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },

  basicDetailView: {
    flexDirection: "row",
    marginHorizontal: constant.moderateScale(0),
    marginTop: constant.moderateScale(20),
    paddingHorizontal: constant.moderateScale(10),
  },
  basicDetailSubView: {
    flex: 0.5,
    justifyContent: "center",
  },
  basicDetailSubView2: {
    flex: 1,
    justifyContent: "center",
  },
  commentInput: {
    borderWidth: 1,
    height: constant.moderateScale(90),
    flex: 1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    paddingHorizontal: "3%",
    fontSize: constant.moderateScale(14),
    textAlignVertical: "top",
  },
  uncheckBoxStyle: {
    height: constant.moderateScale(28),
    width: constant.moderateScale(28),
    color: "#ABABAB",
  },
  detailText: {
    fontSize: constant.moderateScale(13),
    color: "#424242",
    width: constant.moderateScale(115),
    fontFamily: constant.typeLight,
  },
  performaButton: {
    marginBottom: constant.moderateScale(30),
    marginTop: constant.moderateScale(10),
    marginHorizontal: constant.moderateScale(70),
    paddingVertical: constant.moderateScale(10),
    borderWidth: 1,
    borderColor: constant.whiteColor,
  },
});
