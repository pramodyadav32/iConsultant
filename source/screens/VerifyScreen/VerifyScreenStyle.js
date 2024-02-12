import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: constant.whiteColor,
    },
    loginTopImage: {
        height: constant.resW(7),
        width: constant.resW(7),
    },
    backButton: {
        alignSelf: 'flex-start',
        paddingTop: '5%',
        paddingRight: '10%'
    },
    loginText: {
        color: constant.blackColor,
        fontFamily: constant.typeSemibold,
        fontSize: constant.font22,
        marginTop: constant.resW(7)
    },

    verifyButton: {
        marginTop: "10%",
        marginHorizontal: '0%',
        marginTop: constant.resW(93)
    },
    text2: {
        color: constant.blackColor,
        fontFamily: constant.typeMedium,
        fontSize: constant.font14,
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: "10%"
    },
    text3: {
        color: constant.blue,
    },
    otpInputContainer: {
        marginHorizontal: "0%",
        marginTop:'12%',
      },
      otpFormTextInputStyle: {
        width: constant.resW(13),
        height: constant.resW(14),
        backgroundColor: constant.whiteColor,
        borderWidth: 1,
        borderColor: constant.silver,
        borderRadius: 12,
        color: constant.blackColor,
        borderBottomWidth: 0.7,
        fontSize: constant.font24,
        marginHorizontal: "0%",
        fontFamily: constant.typeMedium,
        includeFontPadding:false,

      },

})

export default styles