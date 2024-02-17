import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: constant.whiteColor,
    },
    bgImage: {
        height: '100%',
        width: '100%',
    },
    mainView: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: constant.moderateScale(35),
        width: constant.moderateScale(180),
        alignSelf: 'center',
    },
    text1: {
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(20),
        color: constant.whiteColor,
        marginBottom: constant.moderateScale(40)
    },
    detailMainView: {
        backgroundColor: '#FFFFFF29',
        paddingHorizontal: '5%',
        width: '80%',
        borderRadius: 15,
        paddingTop: constant.moderateScale(18),
        paddingBottom: constant.moderateScale(20),
        borderWidth: 1,
        borderColor: '#FFFFFF29'
    },
    text2: {
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(12),
        color: constant.whiteColor,
        alignSelf: 'center',
        marginBottom: constant.moderateScale(20)
    },
    topButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        backgroundColor: 'red',
        paddingVertical: constant.moderateScale(14),
        borderRadius: 5
    },
    userButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        backgroundColor: '#ABABAB',
        paddingVertical: constant.moderateScale(14),
        borderRadius: 5
    },
    userStyle: {
        height: constant.moderateScale(13),
        width: constant.moderateScale(13),
    },
    userText: {
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(13),
        color: constant.whiteColor,
        marginLeft: constant.moderateScale(8)
    },
    inputMainView: {
        backgroundColor: constant.whiteColor,
        width: '100%',
        borderRadius: 5,
        marginTop: constant.moderateScale(9),
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1
    },
    scanIconStyle: {
        height: constant.moderateScale(15),
        width: constant.moderateScale(15),
        marginLeft: constant.moderateScale(10),
        marginRight: constant.moderateScale(5)
    },
    inputStyle: {
        flex: 1,
        height: constant.resW(11),
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(13),
        color: constant.blackColor,
    },
    eyeStyle: {
        height: constant.moderateScale(20),
        width: constant.moderateScale(20),
        marginRight: constant.moderateScale(10)

    },
    userIconStyle: {
        height: constant.moderateScale(15),
        width: constant.moderateScale(15),
        marginLeft: constant.moderateScale(10),
        marginRight: constant.moderateScale(5)
    },
    loginButton: {
        marginTop: constant.moderateScale(50),
        borderRadius: 5,
    }

})

export default styles