import React from 'react'
import {StyleSheet} from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    safeView:{
    flex:1,
    paddingHorizontal:'5%',
    backgroundColor:constant.whiteColor,
    },
    loginTopImage:{
        height:constant.resW(18),
        width:constant.resW(100),
        alignSelf:'center',
        marginTop:'8%',
    },
    loginText:{
    color:constant.blackColor,
    fontFamily:constant.typeSemibold,
    fontSize:constant.font22,
    marginTop:constant.resW(7)
    },
    loginTopView:{

    },
    loginText2:{
        color:constant.blackColor,
        fontFamily:constant.typeRegular,
        fontSize:constant.font15,
        marginTop:constant.resW(3),
        marginBottom:'1%'
    },
    inputLogin:{
        color:constant.blackColor,
        fontFamily:constant.typeRegular,
        fontSize:constant.font16,
        borderWidth:1,
        borderColor:constant.silver,
        height:constant.resW(12),
        paddingHorizontal:'5%',
        borderRadius:10,
        includeFontPadding:false,
        textAlignVertical:'center'
    },
    interestList:{
        height:constant.resW(12),
        width:constant.resW(90),
        borderRadius:10,
        borderWidth:1,
        borderColor:constant.silver,
        backgroundColor:constant.whiteColor,
    },
    interestListText:{
        color:constant.blackColor,
        fontFamily:constant.typeRegular,
        fontSize:constant.font16,
    },
    verifyButton:{
   marginTop:"10%",
   marginHorizontal:'0%'
    },
    text2:{
        color:constant.blackColor,
        fontFamily:constant.typeMedium,
        fontSize:constant.font14,
        alignSelf:'center' ,
        marginTop:'5%',
        marginBottom:"10%"
    },
    text3:{
        color:constant.blue,
  
    },
})

export default styles