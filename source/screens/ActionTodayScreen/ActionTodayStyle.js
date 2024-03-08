import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({

    inputView:{
    backgroundColor:constant.whiteColor,
    marginHorizontal:constant.moderateScale(10),
    borderRadius:constant.moderateScale(200),
    flexDirection:'row',
    alignItems:'center',
    marginTop:constant.moderateScale(10),
    height:constant.moderateScale(48),
    // paddingBottom:constant.moderateScale(10)
    },
    input:{
        fontSize:constant.moderateScale(15),
        color:'#434343',
        fontFamily:constant.typeRegular,
        flex:1,
        paddingHorizontal:constant.moderateScale(15)
    },
    searchIcon:{
        height:constant.moderateScale(55),
        width:constant.moderateScale(55),
        // marginRight:constant.moderateScale(2)
    },
    driveListMainView:{
        // backgroundColor:'#F9F9F9',
        marginHorizontal:'2%',
        // paddingHorizontal:'2%',
        borderRadius:10,
        marginTop:constant.moderateScale(15),
        marginBottom:constant.moderateScale(20),
        flex:1,
        // backgroundColor:'red'
    
        },
        driveListTopView:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
    
        },
        driveText1:{
            fontSize:constant.moderateScale(18),
            color:'#2E2E2E',
            fontFamily:constant.typeRegular,
        },
        listDriveIcon:{
            height:constant.moderateScale(20),
            width:constant.moderateScale(20),
            marginRight:constant.moderateScale(10),
        },
        driveListDetailView:{
        //  flex:1,
        // width:'100%',
         flexDirection:"row",
        //  alignItems:'center',
        //  justifyContent:'space-between',
        },
        driveListDetailSubView:{
          // width:'38%',
          // width:constant.resW(25)
        // alignItems:'center',
        // flex:1,
        height:constant.moderateScale(30),
        width:'50%'
        },
        driveListDetailSubView2:{
          // width:constant.resW(31),
          
          
            flex:1,
            height:constant.moderateScale(30)
            },
        listText2:{
            fontSize:constant.moderateScale(8),
            color:'#434343',
            fontFamily:constant.typeRegular,
        },
        fuelText2:{
          fontSize:constant.moderateScale(12),
          color:'#434343',
          fontFamily:constant.typeRegular,
        },
        listText3:{
            fontSize:constant.moderateScale(9.5),
            color:'#434343',
            fontFamily:constant.typeMedium,
        },
        ModelText3:{
          fontSize:constant.moderateScale(12),
          color:'#434343',
          fontFamily:constant.typeMedium,
        },
        listImageStyle:{
          // height:'100%',
          // width:'100%',
          position:'absolute',
          top:0,
          bottom:0,
          left:0,
          right:0,
          // flex:1,
          height:undefined,
          width:constant.resW(100)
          // backgroundColor:'transparent'
        },
        listBgStyle:{
          // flex:1,
          height:undefined,
          width:undefined,
          // flexDirection:'row'
          marginHorizontal:constant.moderateScale(8),
          // alignSelf:'center',
        //  backgroundColor:'red',
        //  marginBottom:'3%'
        },
        listCardMainView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between'
        },
        carImage:{
          height:constant.moderateScale(110),
          width:constant.moderateScale(130),
        },
        horizontalLine:{
          height:constant.moderateScale(2),
          width:constant.moderateScale(70),
          backgroundColor:constant.red,
          borderRadius:constant.moderateScale(100),
          marginTop:constant.moderateScale(4)
        },
})

export default styles;