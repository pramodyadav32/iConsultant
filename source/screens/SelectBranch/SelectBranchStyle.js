import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: constant.blackColor,
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
        fontFamily: constant.typeRegular,
        fontSize: constant.moderateScale(15),
        color: constant.blackColor,
    },
    text3: {
        fontFamily: constant.typeRegular,
        fontSize: constant.moderateScale(15),
        color: constant.whiteColor,
    },
    inputMainView:{
        backgroundColor: constant.whiteColor,
        width: '100%',
        borderRadius: 5,
        marginTop: constant.moderateScale(9),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        elevation: 1,
        paddingVertical:constant.moderateScale(12),
        borderWidth:1,
        borderColor:constant.whiteColor
    },
    inputMainView2:{
        backgroundColor: constant.red,
        width: '100%',
        borderRadius: 5,
        marginTop: constant.moderateScale(9),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        elevation: 1,
        paddingVertical:constant.moderateScale(12),
        borderWidth:1,
        borderColor:constant.whiteColor
    }
   

})

export default styles