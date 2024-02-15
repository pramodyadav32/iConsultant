import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: constant.whiteColor,
    },
    mainView:{
        flex: 1,
        backgroundColor: '#000000',
        alignItems:'center',
        // justifyContent:'center',
    },
    logoStyle:{
    height:constant.moderateScale(100),
    width:constant.moderateScale(180),
    alignSelf:'center',
    // backgroundColor:'red',
    
    },
    text1:{
        fontFamily:constant.typeLight,
        fontSize:constant.moderateScale(20),
        color:constant.whiteColor,
    },
    detailMainView:{
    backgroundColor:'#FFFFFF29',
    paddingHorizontal:'5%',
    width:'80%',
    borderRadius:10,
    paddingTop:constant.moderateScale(18),
    paddingBottom:constant.moderateScale(20)
    },
    text2:{
        fontFamily:constant.typeLight,
        fontSize:constant.moderateScale(12),
        color:constant.whiteColor,
        alignSelf:'center',
        marginBottom:constant.moderateScale(20)
    },
    topButtonView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    },
    userButton:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     width:'48%',
     backgroundColor:'red',
     paddingVertical:constant.moderateScale(14),
     borderRadius:5
    },
    userButton2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'48%',
        backgroundColor:'#ABABAB',
        paddingVertical:constant.moderateScale(14),
        borderRadius:5
       },
    userStyle:{
        height:constant.moderateScale(13),
        width:constant.moderateScale(13),
    },
    userText:{
        fontFamily:constant.typeLight,
        fontSize:constant.moderateScale(13),
        color:constant.whiteColor,
        marginLeft:constant.moderateScale(8)
    },
    inputMainView:{
    //  flex:1,
     backgroundColor:constant.whiteColor,
     width:'100%'
    },
    scanStyle:{
        height:constant.moderateScale(13),
        width:constant.moderateScale(13),
    },
    inputStyle:{
    flex:1,
    },
    eyeStyle:{

    },
  
})

export default styles