import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    drawerStyle:{
    borderBottomWidth:0
    },
    topButtonView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal:constant.moderateScale(8)
  },
  userButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '48%',
      backgroundColor: 'red',
      paddingVertical: constant.moderateScale(14),
      borderRadius: 5,
      paddingHorizontal:constant.moderateScale(10),
      borderWidth:1.5,
      borderColor:constant.whiteColor,
      elevation:2
  },

  userStyle: {
      height: constant.moderateScale(18),
      width: constant.moderateScale(18),
  },
  userText: {
      fontFamily: constant.typeMedium,
      fontSize: constant.moderateScale(15),
      color: constant.whiteColor,
  },

  //ActionToday

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
      width:constant.moderateScale(70),
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
    
    //upcomming
    headerImageStyle:{
      height:undefined,
      width:undefined,
      marginHorizontal:constant.moderateScale(8),
     marginBottom:'1%',

    },
    up_ListText:{
      fontSize:constant.moderateScale(17),
      color:'#3B3B3B',
      fontFamily:constant.typeMedium,
      marginLeft:constant.moderateScale(26)
    },
    upRightArrow:{
      height:constant.moderateScale(25),
      width:constant.moderateScale(25),
      marginRight:constant.moderateScale(10)
    },
    upRightArrow2:{
      height:constant.moderateScale(15),
      width:constant.moderateScale(15),
      marginRight:constant.moderateScale(10)
    },
    homeBoxStyle:{
      backgroundColor:constant.whiteColor,
      height:constant.moderateScale(130),
      width:constant.resW(46),
      borderRadius:10,
      borderColor:constant.whiteColor,
      borderWidth:1,
      elevation:3,
      shadowColor: constant.blackColor,
      shadowOpacity: 0,
      shadowOffset: { width: 20, height: 30},
      shadowRadius: 4,
      paddingHorizontal:constant.moderateScale(10),
      paddingVertical:constant.moderateScale(10),
      justifyContent:'space-between',
      // backgroundColor:"green",
    },
   
    homeHorz:{
      height:5,
      width:constant.resW(45.5),
      backgroundColor:"red",
      position:"absolute",
       borderBottomLeftRadius:20,
       borderBottomRightRadius:20,
    },
    boxText:{
      fontSize:constant.moderateScale(13),
      color:'#3B3B3B',
      fontFamily:constant.typeMedium,
    },
    homeSubBox:{
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between',
    },
    homeSubBox1:{
     flexDirection:'row',
     alignItems:'flex-end',
    },
    dashBoardIcon:{
      height:constant.moderateScale(30),
      width:constant.moderateScale(30),
      marginLeft:constant.moderateScale(16),
      marginBottom:constant.moderateScale(4),
     
    },
    homeSubBoxText:{
      fontSize:constant.moderateScale(32),
      color:'#2E2E2E',
      fontFamily:constant.typeRegular,
      includeFontPadding:false,
      paddingLeft:constant.moderateScale(10),
   
    },
 
})

export default styles;