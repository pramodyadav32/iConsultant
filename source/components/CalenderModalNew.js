import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import * as constant from "../utilities/constants";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Calendar, LocaleConfig } from "react-native-calendars";
import FastImage from "react-native-fast-image";
import images from "../utilities/images";
import moment from "moment";

const CalenderModalNew = (props) => {
  const { isVisible, onRequestClose, onDateClick, type } = props;
  const [selectDate, setSelectDate] = useState("");
  const tabWidth = constant.resW(38);
  const [monthChange, setMonthChange] = useState(
    moment(new Date()).format("MMMM - YYYY")
  );

  const [isYearModalVisible, setYearModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    console.log("sdkjfbsdjfbdsjhfbdsjhbsdhfb")
    setSelectDate("")
    // setMonthChange(moment(new Date()).format("MMMM - YYYY"));
    // setSelectedYear(moment().year()); 
    // setCurrentDate(moment().format("YYYY-MM-DD"));
    // setCurrentMonth(moment());
  }, []);

  const dayRender = (date, state, marking) => {
    return moment(date.dateString).isSame(selectDate) ? (
      <ImageBackground
        source={images.dateIcon}
        style={styles.calenderDateImage}
      >
        <TouchableOpacity
          onPress={() => {
            fn_Cal_dateSelect(date, state, marking);
          }}
          style={styles.cal_DayButton}
        >
          <Text style={[styles.cal_DayText, { color: "#fff" }]}>
            {date.day}
          </Text>
          <View />
        </TouchableOpacity>
      </ImageBackground>
    ) : (
      <ImageBackground
        source={images.dateIcon}
        tintColor={constant.whiteColor}
        style={styles.calenderDateImage}
      >
        {type === 1 ? (
          <TouchableOpacity
            onPress={() => {
              moment(date.dateString).isBefore(
                moment(new Date()).format("YYYY-MM-DD")
              )
                ? null
                : fn_Cal_dateSelect(date, state, marking);
            }}
            style={styles.cal_DayButton}
          >
            <Text
              style={[
                styles.cal_DayText,
                {
                  color: moment(date.dateString).isBefore(
                    moment(new Date()).format("YYYY-MM-DD")
                  )
                    ? moment(date.dateString).day() === 0
                      ? "#1D539470"
                      : "#00000040"
                    : moment(date.dateString).day() === 0
                    ? constant.baseColor
                    : "black",
                },
              ]}
            >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>
        ) : moment(date.dateString).isBefore(
            moment(new Date()).format("YYYY-MM-DD")
          ) ? (
          <TouchableOpacity
            onPress={() => {
              null;
            }}
            style={styles.cal_DayButton}
          >
            <Text
              style={[
                styles.cal_DayText,
                {
                  color: moment(date.dateString).isBefore(
                    moment(new Date()).format("YYYY-MM-DD")
                  )
                    ? moment(date.dateString).day() === 0
                      ? "#1D5394"
                      : "#00000040"
                    : moment(date.dateString).day() === 0
                    ? constant.baseColor
                    : "black",
                },
              ]}
            >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>
        ) : moment(date.dateString).isAfter(
            moment(new Date()).add(61, "d").format("YYYY-MM-DD")
          ) ? (
          <TouchableOpacity
            onPress={() => {
              null;
            }}
            style={styles.cal_DayButton}
          >
            <Text
              style={[
                styles.cal_DayText,
                {
                  color:
                    moment(date.dateString).day() === 0
                      ? "#1D5394"
                      : "#00000040",
                },
              ]}
            >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              fn_Cal_dateSelect(date, state, marking);
            }}
            style={styles.cal_DayButton}
          >
            <Text
              style={[
                styles.cal_DayText,
                {
                  color: moment(date.dateString).isBefore(
                    moment(new Date()).format("YYYY-MM-DD")
                  )
                    ? moment(date.dateString).day() === 0
                      ? "#1D5394"
                      : "#00000040"
                    : moment(date.dateString).day() === 0
                    ? constant.baseColor
                    : "black",
                },
              ]}
            >
              {date.day}
            </Text>
            <View />
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  };

  const fn_Cal_dateSelect = (date, state, marking) => {
    const selectedMonth = moment(currentMonth).month(); // Gets month as an integer (0 for January, 1 for February, etc.)

    const fullDate = moment()
      .year(selectedYear)
      .month(selectedMonth)
      .date(date.day)
      .format("YYYY-MM-DD");
    const timestamp = moment(fullDate, "YYYY-MM-DD").valueOf();
    let data = { timestamp: fullDate };
    setSelectDate(fullDate);
    onDateClick(data);
  };

  const fn_Cal_dateSelect2 = (date) => {
    // const selectedMonth = moment(currentMonth).month(); // Gets month as an integer (0 for January, 1 for February, etc.)
    // console.log("currentMonth = ", currentMonth)
    // console.log("selectedYear = ", selectedYear)
    // console.log("date?.day = ", date?.day)
    // console.log("date?.month = ", date?.month)
    const fullDate = moment()
      .year(selectedYear)
      .month(date?.month)
      .date(date.day)
      .format("YYYY-MM-DD");
    const timestamp = moment(fullDate, "YYYY-MM-DD").valueOf();
    let data = { timestamp: fullDate };
    setSelectDate(fullDate);
    onDateClick(data);
  };

  const toggleYearModal = () => {
    setYearModalVisible(!isYearModalVisible);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentDate(moment().year(year).format("YYYY-MM-DD")); // Set currentDate to reflect the selected year
    toggleYearModal();
  };

  const currentYear = moment().year();
  const startYear = currentYear - 16;
  const endYear = currentYear + 16;
  
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  

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
            <Calendar
              // minDate={moment(new Date()).format("YYYY-MM-D")}
              monthFormat={"MMMM - yyyy"}
              // onMonthChange={month => {
              //   setMonthChange(moment(month.dateString).format("MMMM - YYYY"));
              //   console.log('month changed', month);
              // }}
              // maxDate={moment(new Date()).add(61, 'd').format("YYYY-MM-DD")}
              onDayPress={(day) => {
                console.log("selected day", day);
                fn_Cal_dateSelect2(day);
              }}
              onDayLongPress={(day) => {
                // console.log("selected day", day);
              }}
              onMonthChange={(month) => {
                setCurrentMonth(month.dateString);
                setMonthChange(moment(month.dateString).format("MMMM - YYYY"));
                console.log("month changed", month);
              }}
              renderArrow={(direction) => (
                <FastImage
                  source={
                    direction === "left" ? images.leftarrow : images.rightArrow
                  }
                  resizeMode="contain"
                  tintColor={constant.baseColor}
                  style={styles.cal_Arrow}
                />
              )}
              renderHeader={(date) => (
                <TouchableOpacity onPress={toggleYearModal}>
                  <Text style={{ fontSize: 18, color: constant.baseColor }}>
                    {moment(currentMonth).format("MMMM")} - {selectedYear}
                  </Text>
                </TouchableOpacity>
              )}
              hideExtraDays={true}
              disableMonthChange={false}
              firstDay={0}
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              headerStyle={{
                borderRadius: 10,
              }}
              style={{
                borderWidth: 1,
                borderColor: "#FFFFFF",
                elevation: 1,
                borderRadius: 10,
                // marginHorizontal: constant.moderateScale(5),
                marginVertical: constant.moderateScale(5),
                paddingVertical: "0%",
              }}
              theme={{
                monthTextColor: constant.baseColor,
                textMonthFontFamily: constant.typeRegular,
                textDayHeaderFontFamily: constant.typeMedium,
                textMonthFontSize: constant.moderateScale(16),
                textDayHeaderFontSize: constant.moderateScale(12),
              }}
              // dayComponent={({ date, state, marking }) =>
              //   dayRender(date, state, marking)
              // }
              // markedDates={{
              //   "2024-02-01": { marked: true },
              //   "2024-02-02": { marked: true },
              //   "2024-02-03": { marked: true },
              //   "2024-02-01": { marked: true },
              // }}
            />
            <Modal
              visible={isYearModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={toggleYearModal}
            >
              <View style={modalStyles.modalContainer}>
                <View style={modalStyles.modalContent}>
                  <FlatList
                    data={years}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleYearSelect(item)}>
                        <Text style={modalStyles.yearItem}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity onPress={toggleYearModal}>
                    <Text style={modalStyles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </Modal>
  );
};

CalenderModalNew.defaultProps = {
  onRequestClose: function () {},
  isVisible: false,
  type: 1,
};

export default CalenderModalNew;

const styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: "#00000090",
    justifyContent: "center",
    // alignItems: "center"
  },
  closeIcon: {
    fontSize: constant.moderateScale(20),
    color: constant.baseColor,
    fontFamily: constant.typeRegular,
    marginLeft: constant.moderateScale(5),
    alignSelf: "flex-end",
    paddingRight: constant.moderateScale(5),
    paddingLeft: constant.moderateScale(10),
    paddingBottom: constant.moderateScale(2),
    paddingTop: constant.moderateScale(10),
  },
  modalSubView: {
    //  width:constant.resW(96)
    paddingHorizontal: constant.moderateScale(30),
  },
  innerView: {
    //   backgroundColor:'#00000010',
    //   paddingVertical:constant.moderateScale(13),
    //   paddingHorizontal:constant.moderateScale(15),
    //   borderRadius:15,
  },
  cal_Arrow: {
    height: constant.moderateScale(15),
    width: constant.moderateScale(15),
  },
  cal_SubView: {
    flex: 1,
    backgroundColor: constant.whiteColor,
    marginHorizontal: constant.moderateScale(6),
    borderRadius: 8,
    marginBottom: constant.moderateScale(6),
  },
  calenderheaderText: {
    fontSize: constant.moderateScale(16),
    color: constant.red,
    fontFamily: constant.typeRegular,
  },
  calenderDateImage: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
  },
  cal_DayButton: {
    height: constant.moderateScale(25),
    width: constant.moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
  },
  cal_DayText: {
    fontSize: constant.moderateScale(11),
    color: constant.red,
    fontFamily: constant.typeRegular,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 300,
    maxHeight: 400,
  },
  yearItem: {
    paddingVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
  closeButton: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
});
