import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
  
    cal_Arrow:{
    height:constant.moderateScale(15),
    width:constant.moderateScale(15)
    },
    cal_SubView:{
     flex:1,
     backgroundColor:constant.whiteColor,
     marginHorizontal:constant.moderateScale(6),
     borderRadius:8,
     marginBottom:constant.moderateScale(6),
    },
    calenderheaderText:{
        fontSize:constant.moderateScale(16),
        color:constant.red,
        fontFamily:constant.typeRegular,
    },
    cal_DayButton:{
         width: 30, 
          height: 30, 
           justifyContent: 'center',
             alignItems: 'center', 
 
    },
    cal_DayText:{
        fontSize:constant.moderateScale(11),
        color:constant.red,
        fontFamily:constant.typeRegular,
    },
    tabMainView:{
        paddingBottom:'1%',
        height:constant.moderateScale(50)
        },
        tabSubView:{
         flex:1,
        //  borderBottomWidth:0.8,
         borderBottomColor:'red',
         flexDirection:'row',
         justifyContent:'space-between',
         marginHorizontal:'3%',
         paddingTop:constant.moderateScale(5),
        },
        tabButton:{
        width:constant.resW(35),
        justifyContent:'center'
        },
        tabButtonText:{
            fontSize:constant.moderateScale(15),
            color:constant.red,
            fontFamily:constant.typeMedium,
        marginTop:constant.moderateScale(4),
    
        },
        tabButton2:{
            width:constant.resW(35),
            justifyContent:'center'  
        },
        tabButtonText2:{
        fontSize:constant.moderateScale(15),
        color:constant.textColor,
        fontFamily:constant.typeLight,
        marginTop:constant.moderateScale(4),
    
        },
        horixontalLine:{
            height:constant.moderateScale(2.5),
            width:constant.moderateScale(45),
            backgroundColor:'red',
            position:'absolute',
            bottom:constant.moderateScale(6),
            borderRadius:constant.resW(20)
        },

        //TestDrive

        test_MainView:{
        flex:1,
     
        },
        driveListMainView:{
        backgroundColor:'#F9F9F9',
        marginHorizontal:'2%',
        paddingHorizontal:'2%',
        borderRadius:10,
        paddingTop:constant.moderateScale(8),
        paddingVertical:constant.moderateScale(15)

        },
        driveListTopView:{
            flexDirection:'row',
            // alignItems:'center',
            justifyContent:'space-between'

        },
        driveText1:{
            fontSize:constant.moderateScale(18),
            color:'#2E2E2E',
            fontFamily:constant.typeRegular,
        },
        listDriveIcon:{
            height:constant.moderateScale(40),
            width:constant.moderateScale(40),
            marginRight:constant.moderateScale(10),
        },
        driveListDetailView:{
         flex:1,
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
})

export default styles;