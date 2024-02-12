import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    profilePicView:{
    alignSelf:'center',
    width: constant.resW(37),
    height: constant.resW(37),
    borderRadius:constant.resW(60),
    marginTop:'7%',
    marginBottom:'3%'
    },
    profilePic:{
        width: constant.resW(37),
        height: constant.resW(37),
        borderRadius:constant.resW(60),

    },
    profilePicEditView:{
        width: constant.resW(10.5),
        height: constant.resW(10.5),
        borderRadius:constant.resW(60),
        backgroundColor:constant.whiteColor,
        position:'absolute',
        bottom:-1,
        right:6,
        alignItems:'center',
     justifyContent:'center',
    },
    profilePicEditSubView:{
     backgroundColor:constant.baseColor,
     width: constant.resW(9.5),
     height: constant.resW(9.5),
     borderRadius:constant.resW(60),
     alignItems:'center',
     justifyContent:'center',
    },
    profilePicEditIcon:{
        width: constant.resW(4.5),
        height: constant.resW(4.5),
    },
    profileText:{
        fontFamily:constant.typeSemibold,
        fontSize:constant.font19,
        color:constant.blackColor,
        alignSelf:'center',
    },
    listView:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:'5%',
        paddingVertical:'4%',
        paddingRight:"5%",
      },
      listSubView:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        },
        listImage:{
          height:constant.resW(5),
          width:constant.resW(5),
        },
        listTitle:{
          fontFamily:constant.typeMedium,
          fontSize:constant.font19,
          color:constant.blackColor,
          marginLeft:'5%',
        },
        leftIconStyle:{
          height:constant.resW(7),
          width:constant.resW(7),
          tintColor:constant.baseColor,
        },
        bottomView:{
        backgroundColor:constant.baseColor,
        marginBottom:constant.resW(18),
        paddingVertical:"4%"
        },
        bottomViewText:{
          fontFamily:constant.typeBold,
          fontSize:constant.font15,
          color:constant.whiteColor,
          alignSelf:'center'
        },
        seprateLine:{
        height:constant.resW(0.1),
        borderWidth:0.2,
        borderColor:constant.gainsboro
        },

        //vendeorProfiles

        orderD_BiderMainView:{
            flexDirection:'row',
            // alignItems:'center',
            backgroundColor:constant.gray,
            marginBottom:'4%',
            marginHorizontal:'4%',
            paddingVertical:'3.5%',
            paddingHorizontal:'2.5%',
            borderRadius:15
          },
          orderBiderImage:{
            width: constant.resW(25),
            height: constant.resW(25),
            borderRadius:10
          },
          listBiderSubView:{
            flex:1,
            marginLeft:'3%'
            },
          orderBiderTitle:{
            fontFamily:constant.typeRegular,
            fontSize:constant.font19,
            color:constant.blackColor,
            marginTop:'1%'
          },
          orderBiderDes:{
            fontFamily:constant.typeRegular,
            fontSize:constant.font15,
            color:'#8F9BB3',
            marginVertical:"3.5%"
          },
        
          orderBiderText:{
            fontFamily:constant.typeSemibold,
            fontSize:constant.font18,
            color:constant.blue,
            includeFontPadding:false,
          },

          //venderProfile

          v_SafeView:{
            flex:1,
            backgroundColor:constant.baseLight
          },
          v_HeaderView:{
         backgroundColor:constant.baseLight,
         borderBottomWidth:0
          },
          v_ImageView:{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#F2FAFE',
            marginBottom:'3%',
            borderRadius:15,
            alignSelf:'center',
            justifyContent:'center',
            width: constant.resW(30),
            height: constant.resW(30),
            marginTop:'4%',
          },
          v_Image:{
            width: constant.resW(23),
            height: constant.resW(23),
            borderRadius:10
          },
          v_MainView:{
          flex:1,
          backgroundColor:constant.whiteColor,
          borderTopLeftRadius:constant.resW(15),
          borderTopRightRadius:constant.resW(15),
          },
          v_name:{
            fontFamily:constant.typeSemibold,
            fontSize:constant.font21,
            color:constant.blackColor,
            alignSelf:'center'
          },
          v_place:{
            fontFamily:constant.typeRegular,
            fontSize:constant.font14,
            color:'#838383',
            alignSelf:'center'
          },
          v_Hor_Line:{
          width:"90%",
          height:0.1,
          borderWidth:0.4,
          alignSelf:'center',
          marginTop:'3%',
          marginBottom:'5%',
          borderColor:'#CCCCCC'
          },
          tabMainView:{
          backgroundColor:constant.gray,
          marginHorizontal:'5%',
          borderRadius:10,
          paddingHorizontal:'1%',
          alignItems:'center',
          justifyContent:'space-between',
          flexDirection:'row',
          paddingVertical:'0.8%'
          },
          tabViewButton:{
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:constant.baseLight,
          width:'34%',
          paddingVertical:'1.5%',
          borderWidth:0.5,
          borderRadius:10,
          borderColor:constant.silver
          },
          tabViewButtonText:{
            fontFamily:constant.typeRegular,
            fontSize:constant.font15,
            color:constant.blackColor,
          },
          jobDesTitle:{
            fontFamily:constant.typeMedium,
            fontSize:constant.font18,
            color:constant.blackColor,
            marginLeft:'5%',
            marginTop:'3%',
            marginBottom:'2%'
          },
          jobDes:{
            fontFamily:constant.typeRegular,
            fontSize:constant.font15,
            color:'#838383',
            marginHorizontal:'5%'
          },
          part0Else:{
            width: constant.resW(55),
            height: constant.resW(55),
          },
          part1ElseImage:{
            width: constant.resW(25),
            height: constant.resW(25), 
          },
          portfolioButton:{
          backgroundColor:'red',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          width: constant.resW(28),
          height: constant.resW(28), 
          },
          portfolioButton2:{
            backgroundColor:'red',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            width: constant.resW(59),
            height: constant.resW(60),
            },
          tabViewMain: {
            flexDirection: "row",
            marginHorizontal: constant.resW(5),
            marginVertical: constant.resW(2),
            justifyContent:'space-between',
          },
          profileButton:{
            position:'absolute',
            bottom:20,
            left:0,
            right:0,

          },
          profileButtonText:{
          fontFamily:constant.typeMedium,
          fontSize:constant.font19
          },

})

export default styles