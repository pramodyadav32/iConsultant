import React, { useState } from "react"
import { View, Modal, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import * as constant from '../utilities/constants'
import { useSelector } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import FastImage from "react-native-fast-image"
import images from "../utilities/images"
import moment from "moment"

const CalenderModal = (props) => {
    const { isVisible, onRequestClose,onDateClick } = props
    const [selectDate, setSelectDate] = useState(moment(new Date).format("yyyy-MM-DD"))
    const tabWidth = constant.resW(38);
    const [monthChange, setMonthChange] = useState(moment(new Date).format("MMMM - YYYY"))

   

    const dayRender = (date, state, marking) => {
        console.log("se" + selectDate)
        console.log("day", moment(date.dateString).isSame(selectDate))
        return (
            moment(date.dateString).isSame(selectDate) ?
                <ImageBackground source={images.dateIcon} style={styles.calenderDateImage} >
                    <TouchableOpacity
                        onPress={() => { fn_Cal_dateSelect(date, state, marking)  }}
                        style={styles.cal_DayButton}>
                        <Text style={[styles.cal_DayText, { color: '#fff' }]} >
                            {date.day}
                        </Text>
                        <View />
                    </TouchableOpacity>
                </ImageBackground>
                :
                <ImageBackground source={images.dateIcon} tintColor={constant.whiteColor} style={styles.calenderDateImage} >
                    <TouchableOpacity
                        onPress={() => { fn_Cal_dateSelect(date, state, marking) }}
                        style={styles.cal_DayButton}>
                        <Text style={[styles.cal_DayText, { color: moment(date.dateString).day() === 0 ? 'red' : 'black' }]} >
                            {date.day}
                        </Text>
                        <View />
                    </TouchableOpacity>
                </ImageBackground>
        )
    };

    const fn_Cal_dateSelect = (date, state, marking) => {
        setSelectDate(date.dateString)
        onDateClick(date)
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
                <View style={styles.modalSubView}>
                    <AntDesign name='close' style={styles.closeIcon} onPress={() => onRequestClose()} />
                    <View style={styles.innerView}>
                        <Calendar
                            initialDate={'2024-02-01'}
                            minDate={'2012-05-10'}
                            maxDate={'2012-05-30'}
                            onDayPress={day => {
                                console.log('selected day', day);
                            }}
                            onDayLongPress={day => {
                                console.log('selected day', day);
                            }}
                            monthFormat={'MMMM - yyyy'}
                            onMonthChange={month => {
                                setMonthChange(moment(month.dateString).format("MMMM - YYYY"))
                                console.log('month changed', month);
                            }}
                            renderArrow={direction =>
                                <FastImage source={direction === 'left' ? images.leftarrow : images.rightArrow} resizeMode='contain' tintColor={'#FE0F17'} style={styles.cal_Arrow} />
                            }
                            hideExtraDays={true}
                            disableMonthChange={false}
                            firstDay={0}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            onPressArrowRight={addMonth => addMonth()}

                            headerStyle={{
                                borderRadius: 10,
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: '#FFFFFF',
                                elevation: 1,
                                borderRadius: 10,
                                // marginHorizontal: constant.moderateScale(5),
                                marginVertical: constant.moderateScale(5),
                                paddingVertical: '0%'
                            }}
                            theme={{
                                monthTextColor: 'red',
                                textMonthFontFamily: constant.typeRegular,
                                textDayHeaderFontFamily: constant.typeMedium,
                                textMonthFontSize: constant.moderateScale(16),
                                textDayHeaderFontSize: constant.moderateScale(12),
                            }}
                            dayComponent={({ date, state, marking }) => dayRender(date, state, marking)}
                            markedDates={{
                                '2024-02-01': { marked: true },
                                '2024-02-02': { marked: true },
                                '2024-02-03': { marked: true, },
                                '2024-02-01': { marked: true },
                            }}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    )
}

CalenderModal.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default CalenderModal

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        // alignItems: "center"
    },
    closeIcon: {
        fontSize: constant.moderateScale(20),
        color: constant.red,
        fontFamily: constant.typeRegular,
        marginLeft: constant.moderateScale(5),
        alignSelf: 'flex-end',
        paddingRight: constant.moderateScale(5),
        paddingLeft: constant.moderateScale(10),
        paddingBottom: constant.moderateScale(2),
        paddingTop: constant.moderateScale(10)
    },
    modalSubView: {
        //  width:constant.resW(96)
        paddingHorizontal: constant.moderateScale(30)
    },
    innerView: {
        //   backgroundColor:'#00000010',
        //   paddingVertical:constant.moderateScale(13),
        //   paddingHorizontal:constant.moderateScale(15),
        //   borderRadius:15,
    },
    cal_Arrow: {
        height: constant.moderateScale(15),
        width: constant.moderateScale(15)
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    cal_DayButton: {
        height: constant.moderateScale(25),
        width: constant.moderateScale(25),
        justifyContent: 'center',
        alignItems: 'center',

    },
    cal_DayText: {
        fontSize: constant.moderateScale(11),
        color: constant.red,
        fontFamily: constant.typeRegular,
    },

})