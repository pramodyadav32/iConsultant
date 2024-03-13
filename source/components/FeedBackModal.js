import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import * as constant from "../utilities/constants";
import {
  apiCall,
  APIName,
  tokenApiCall,
  brandCode,
} from "../utilities/apiCaller";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import SelectDropList from "./SelectDropList";
import FastImage from "react-native-fast-image";
import images from "../utilities/images";
import Button from "./Button";

const FeedBackModal = (props) => {
  const { isVisible, onRequestClose, QuestionList, data, consultantList } =
    props;
  const { userData, selectedBranch } = useSelector(
    (state) => state.AuthReducer
  );
  const [questionData, setQuestionData] = useState(QuestionList);
  const [driverName, setDriverName] = useState("");
  const [consultantData, setConsultantData] = useState();
  const [startKms, setStartKms] = useState(0);
  const [endKms, setEndKms] = useState(0);
  const [customerResponse, setCustomerResponse] = useState();
  const [remarks, setRemarks] = useState("");
  const [potentialPurchase, setPotentialPurchase] = useState();
  const [timeFrame, setTimeFrame] = useState();
  const [brandModel, setBrandModel] = useState("");
  const [otherModel, setOtherModel] = useState("");

  const customerResponseList = [
    {
      code: "X",
      description: "No, Customer has Not specified a Response",
    },
    {
      code: "Y",
      description: "Yes, Customer has specified a Response",
    },
  ];

  const potentialPurchaseList = [
    {
      code: "1",
      description: "Definitely",
    },
    {
      code: "2",
      description: "Very Likely",
    },
    {
      code: "3",
      description: "Likely",
    },
    {
      code: "4",
      description: "Not Likely",
    },
  ];

  const timeFrameList = [
    {
      code: "1",
      description: "15 Days",
    },
    {
      code: "2",
      description: "15 Days - 3 months",
    },
    {
      code: "3",
      description: "3 - 6 months",
    },
    {
      code: "4",
      description: "6 months",
    },
  ];

  useEffect(() => {
    setQuestionData(QuestionList);
  }, [QuestionList]);

  const fn_Header = () => {
    return (
      <View
        style={[
          styles.feedBackMainView,
          {
            backgroundColor: "#ABABAB40",
            paddingVertical: constant.moderateScale(10),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        ]}
      >
        <View style={styles.feedBackSubView1}>
          <Text style={[styles.feedBackText, { marginTop: "0%" }]}>
            Feedback Question
          </Text>
        </View>
        <View style={styles.feedBackSubView}>
          <Text style={[styles.feedBackText, { marginTop: "0%" }]}>Weight</Text>
        </View>
        <View style={styles.feedBackSubView2}>
          <Text style={[styles.feedBackText, { marginTop: "0%" }]}>
            Response
          </Text>
        </View>
        <View style={styles.feedBackSubView}>
          <Text style={[styles.feedBackText, { marginTop: "0%" }]}>Point</Text>
        </View>
      </View>
    );
  };

  const fn_SelectResponse = (d, item, index) => {
    let data = questionData;
    data[index].answer = d;
    setQuestionData([...data]);
  };

  const fn_Create = () => {
    // if (Object.keys(actionTypeValue).length === 0) {
    //     constant.showMsg("Please select action type")
    // } else if (Object.keys(modelValue).length === 0) {
    //     constant.showMsg("Please select Model")
    // } else if (Object.keys(performValue).length === 0) {
    //     constant.showMsg("Please select Performed")
    // } else if (performData==='') {
    //     constant.showMsg("Please select Performed Date")
    // } else {
    let newListArray = [];
    let scoreTotal = 0

    QuestionList.map((item, index) => {
        let obj = {
          cssQSRNO: Number(item?.questionId),
          cssQResponseType: "string",
          cssRSRNO: Number(item?.answer?.responseDisplaySerial),
          cssScore: Number(item?.answer?.responseId),
          cssQWeight: 0,
        };
        scoreTotal = scoreTotal + Number(item?.answer?.responseId)
        newListArray.push(obj);
    });

    const param = {
      brandCode: userData?.brandCode,
      countryCode: userData?.countryCode,
      companyId: userData?.companyId,
      prospectNo: Number(data?.prospectId),
      serial: 0,
      scoreYN: "string",
      version: "string",
      maxScore: 0,
      score: scoreTotal,
      remark: remarks,
      tdStartKM: Number(startKms),
      tdEndKM: Number(endKms),
      purchasePotential: potentialPurchase?.code,
      timeFrame: timeFrame?.code,
      otherModelInterest: otherModel,
      brandModelInterest: brandModel,
      model: "",
      variant: "",
      driverName: driverName,
      tdGivenBy: "string",
      tdPosition: "string",
      tdCurrentVeh: "string",
      loginUserCompanyId: userData?.userCompanyId,
      loginUserId: userData?.userId,
      ipAddress: "1::1",
      feedbackResponseList: newListArray
    };
    console.log("param", param);
    tokenApiCall(
      saveBasicInfoCallBack,
      APIName.SaveProspectBasicInfo,
      "POST",
      param
    );

    // }
  };

  const saveBasicInfoCallBack = (res) => {
    console.log("res", res);
    if (res.statusCode === 200) {
      constant.showMsg("Data saved.");
      onRequestClose()
    } else {
      dispatch(emptyLoader_Action(false));
      constant.showMsg(res.message);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles.modalMainView}>
        <View style={styles.modalSubView}>
          <AntDesign
            name="close"
            style={styles.closeIcon}
            onPress={() => onRequestClose()}
          />
          <View style={styles.innerView}>
            <View style={styles.detailMainView}>
              <View style={[styles.driveListDetailSubView, {}]}>
                <Text style={styles.listText3}>Test Drive Feedback</Text>
                <View style={styles.horizontalLine} />
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Driver's Name</Text>
                <TextInput
                  placeholder=""
                  onChangeText={(d) => setDriverName(d)}
                  style={styles.calenderInput}
                ></TextInput>
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Consultant</Text>
                <SelectDropList
                  list={consultantList}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setConsultantData(d)}
                />
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Start KMS</Text>
                <TextInput
                  placeholder=""
                  onChangeText={(d) => setStartKms(d)}
                  keyboardType="numeric"
                  style={styles.calenderInput}
                ></TextInput>
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>End KMS</Text>
                <TextInput
                  placeholder=""
                  onChangeText={(d) => setEndKms(d)}
                  keyboardType="numeric"
                  style={styles.calenderInput}
                ></TextInput>
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Customer Response</Text>
                <SelectDropList
                  list={customerResponseList}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setCustomerResponse(d)}
                />
              </View>

              <View
                style={{
                  backgroundColor: "#F9F9F9",
                  marginVertical: constant.moderateScale(5),
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: constant.whiteColor,
                  paddingHorizontal: constant.moderateScale(0),
                  paddingBottom: constant.moderateScale(10),
                  elevation: 1,
                }}
              >
                <FlatList
                  data={QuestionList}
                  ListHeaderComponent={() => fn_Header()}
                  renderItem={({ item, index }) => {
                    {
                      console.log("item", item);
                    }
                    return (
                      <View style={styles.feedBackMainView}>
                        <View style={styles.feedBackSubView1}>
                          <Text
                            style={[styles.feedBackText2, { marginTop: "0%" }]}
                          >
                            {item?.questionText}
                          </Text>
                        </View>
                        <View style={styles.feedBackSubView}>
                          <Text
                            style={[styles.feedBackText2, { marginTop: "0%" }]}
                          >
                            5
                          </Text>
                        </View>
                        <View style={styles.feedBackSubView2}>
                          <SelectDropList
                            list={item?.responseList}
                            title=" "
                            desName="1"
                            buttonExt={styles.feedBackDropList}
                            textExt={styles.feedBackDropListText}
                            on_Select={(d) => fn_SelectResponse(d, item, index)}
                          />
                        </View>
                        <View style={styles.feedBackSubView}>
                          <Text
                            style={[styles.feedBackText, { marginTop: "0%" }]}
                          >
                            {item?.answer?.responseId}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>

              <View
                style={[styles.detailMainView, { alignItems: "flex-start" }]}
              >
                <Text style={[styles.detailText, { marginTop: "3%" }]}>
                  Custumer Remarks (if any)
                </Text>
                <TextInput
                  placeholder="Enter Remark"
                  onChangeText={(d) => setRemarks(d)}
                  style={styles.commentInput}
                ></TextInput>
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Potential to Purchase</Text>
                <SelectDropList
                  list={potentialPurchaseList}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setPotentialPurchase(d)}
                />
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>time Frame</Text>
                <SelectDropList
                  list={timeFrameList}
                  buttonExt={styles.dropList}
                  textExt={styles.dropListText}
                  on_Select={(d) => setTimeFrame(d)}
                />
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>
                  {brandCode} models of intrst
                </Text>
                <TextInput
                  placeholder=""
                  onChangeText={(d) => setBrandModel(d)}
                  style={styles.calenderInput}
                ></TextInput>
              </View>

              <View style={styles.detailMainView}>
                <Text style={styles.detailText}>Other models of intrst</Text>
                <TextInput
                  placeholder=""
                  onChangeText={(d) => setOtherModel(d)}
                  style={styles.calenderInput}
                ></TextInput>
              </View>
            </ScrollView>
            <View
              style={[
                styles.detailMainView,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: constant.moderateScale(20),
                },
              ]}
            >
              <Button
                title="Save"
                buttonExt={styles.SaveButton}
                click_Action={() => fn_Create()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

FeedBackModal.defaultProps = {
  onRequestClose: function () {},
  isVisible: false,
};

export default FeedBackModal;

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000090",
    // justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: constant.whiteColor,
    width: (constant.screenWidth * 8.8) / 10,
    height: (constant.screenWidth * 8) / 10,
  },
  closeIcon: {
    fontSize: constant.moderateScale(20),
    color: constant.red,
    fontFamily: constant.typeRegular,
    marginLeft: constant.moderateScale(5),
    alignSelf: "flex-end",
    paddingRight: constant.moderateScale(5),
    paddingLeft: constant.moderateScale(10),
    paddingBottom: constant.moderateScale(2),
    paddingTop: constant.moderateScale(10),
  },
  modalSubView: {
    width: constant.resW(96),
    maxHeight: constant.resH(60),
    marginTop: constant.moderateScale(70),
  },
  innerView: {
    backgroundColor: constant.whiteColor,
    paddingVertical: constant.moderateScale(13),
    paddingHorizontal: constant.moderateScale(3),
    borderRadius: 15,
  },
  detailMainView: {
    paddingHorizontal: "0%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: constant.moderateScale(5),
    paddingHorizontal: constant.moderateScale(8),
  },
  detailText: {
    fontSize: constant.moderateScale(14),
    color: "#424242",
    width: constant.moderateScale(115),
    fontFamily: constant.typeLight,
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
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
  },
  dropListText: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  timeDropListText: {
    fontSize: constant.moderateScale(13),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  mobileSubView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  searchButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchStyle: {
    height: constant.moderateScale(50),
    width: constant.moderateScale(50),
  },
  detailMainView2: {
    paddingHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2%",
  },
  bottomMainView: {
    backgroundColor: constant.whiteColor,
    marginHorizontal: "1%",
    borderRadius: 10,
    elevation: 1,
    marginTop: "3%",
    paddingBottom: "2%",
  },
  calenderStyle: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    marginRight: "2%",
  },
  calenderMainView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    paddingLeft: "3%",
  },
  calenderInput: {
    height: constant.moderateScale(40),
    flex: 1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    fontFamily: constant.typeLight,
    fontSize: constant.moderateScale(14),
    borderWidth: 1,
    // height:constant.moderateScale(90),
    flex: 1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    color: constant.blackColor,
    paddingHorizontal: constant.moderateScale(10),
  },
  proceedButton: {
    width: constant.moderateScale(135),
    alignSelf: "center",
    marginTop: constant.resW(30),
    marginBottom: constant.resW(5),
  },
  proccedButtonText: {},
  dropNameList: {
    borderWidth: 1,
    height: constant.moderateScale(40),
    borderRadius: 8,
    width: constant.resW(17),
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    paddingHorizontal: 0,
  },
  dropNameListText: {
    fontSize: constant.moderateScale(14),
    color: constant.textColor,
    fontFamily: constant.typeLight,
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
  SaveButton: {
    width: constant.moderateScale(150),
  },
  driveListDetailSubView: {
    height: constant.moderateScale(30),
    width: "50%",
  },
  listText3: {
    fontSize: constant.moderateScale(12),
    color: "#434343",
    fontFamily: constant.typeMedium,
  },
  horizontalLine: {
    height: constant.moderateScale(2),
    width: constant.moderateScale(48),
    backgroundColor: constant.red,
    borderRadius: constant.moderateScale(100),
    marginTop: constant.moderateScale(3),
  },

  feedBackMainView: {
    paddingHorizontal: constant.moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-between',
    marginTop: constant.moderateScale(5),
  },
  feedBackSubView: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  feedBackSubView1: {
    flex: 1.2,
  },
  feedBackSubView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  feedBackText: {
    fontSize: constant.moderateScale(12),
    color: "#424242",
    // width:constant.moderateScale(115),
    fontFamily: constant.typeRegular,
  },

  feedBackDropList: {
    borderWidth: 1,
    height: constant.moderateScale(30),
    // flex:1,
    borderRadius: 10,
    borderColor: "#ABABAB",
    backgroundColor: constant.whiteColor,
    width: "100%",
  },
  feedBackDropListText: {
    fontSize: constant.moderateScale(15),
    color: constant.textColor,
    fontFamily: constant.typeLight,
  },
  feedBackText2: {
    fontSize: constant.moderateScale(12),
    color: "#424242",
    fontFamily: constant.typeLight,
  },
});
