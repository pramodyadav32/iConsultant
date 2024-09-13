import React, { useEffect, useState } from "react"
import { View, Modal, StyleSheet,Text, FlatList, Pressable} from "react-native"
import * as constant from '../utilities/constants'
import { useSelector } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as common from '../utilities/common_fn'
import { OtpInput } from "react-native-otp-entry";
import Button from "./Button"

const OtpVarifyModel = (props) => {
    const {isVisible,onRequestClose,verifyOtp,mobile_Data} = props
    const [otpText, setOtpText] = useState("");

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.modalMainView}>
              <View style={styles.modalSubView}>
              <AntDesign name='close' style={styles.closeIcon} onPress={()=>onRequestClose()} />
              <View style={styles.innerView}>
              <Text style={styles.listName}>{"Enter OTP "}</Text>
              <Text style={styles.listName2}>{"to verify Mobile Number"}</Text>
              <OtpInput
                numberOfDigits={6}
                focusColor={constant.baseColor}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => {
                    setOtpText(text)
                    console.log(`OTP is ${text}`)
                }}
                textInputProps={{
                    accessibilityLabel: "One-Time Password",
                }}
                theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
                />
               
               <View style={[styles.detailMainView,{alignItems:'center',justifyContent:'center',marginTop:constant.moderateScale(20)}]}>
                <Button title='Submit OTP'
                    buttonExt={styles.SaveButton}
                    click_Action={()=>{verifyOtp(otpText)}}
                />
                </View>
              </View>
              </View>
            </View>
        </Modal>
    )
}

OtpVarifyModel.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
}

export default OtpVarifyModel;

const styles = StyleSheet.create({
    modalMainView: {
        flex: 1,
        backgroundColor: "#00000090",
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: constant.whiteColor,
        width: constant.screenWidth * 8.8 / 10,
        height: constant.screenWidth * 8 / 10,
    },
    detailMainView:{
        paddingHorizontal:"3%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5)
    },
    SaveButton:{
        width:constant.moderateScale(150)
    },
    closeIcon:{
        fontSize:constant.moderateScale(20),
        color:constant.red,
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(5),
        alignSelf:'flex-end',
        paddingRight:constant.moderateScale(5),
        paddingLeft:constant.moderateScale(10),
        paddingBottom:constant.moderateScale(2),
        paddingTop:constant.moderateScale(10)
      },
      modalSubView:{
     width:constant.resW(96)
      },
      innerView:{
      backgroundColor:'#F9F9F9',
      paddingVertical:constant.moderateScale(13),
      paddingHorizontal:constant.moderateScale(10),
      borderRadius:15,
      },
      cardHorLine:{
        height:2,
        width:constant.moderateScale(40),
        backgroundColor:constant.red,
        borderRadius:30,
        marginTop:constant.moderateScale(3),
        marginRight:constant.moderateScale(20)
        },
        listName:{
            fontSize:constant.moderateScale(16),
            color:'#424242',
            fontFamily:constant.typeMedium,
            marginBottom:constant.moderateScale(5)
        },
        listName2:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            fontFamily:constant.typeMedium,
            marginBottom:constant.moderateScale(15)
        },
        driveListDetailView:{
            // flex:1,
            flexDirection:"row",
            
           },
           driveListDetailSubView:{
           flex:1,
           },
           driveListDetailSubView2:{
               flex:1,
               },
           listText2:{
               fontSize:constant.moderateScale(10),
               color:'#434343',
               fontFamily:constant.typeRegular,
           },
           listText3:{
               fontSize:constant.moderateScale(12),
               color:'#434343',
               fontFamily:constant.typeMedium,
           },
           listName3:{
            fontSize:constant.moderateScale(12),
            color:'#434343',
            fontFamily:constant.typeMedium,
        },
})