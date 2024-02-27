import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    listImage:{
        height:constant.moderateScale(100),
        width:constant.moderateScale(100),
        },
        listSubImage:{
            height:constant.moderateScale(70),
            width:constant.moderateScale(80),
            marginLeft:constant.moderateScale(5)
           
        },
        listImageMainView:{
         flex:1,
         elevation:3
        //  justifyContent:'space-between',
        //  backgroundColor:'red'
        },
        listText:{
            fontFamily: constant.typeRegular,
            fontSize: constant.moderateScale(8),
            color:'#3B3B3B',
            alignSelf:'center',
        },
    listMainView:{
    marginHorizontal:constant.moderateScale(10),
    backgroundColor:'#F9F9F9',
    borderWidth:2,
    borderColor:constant.whiteColor,
    elevation:2,
    paddingVertical:constant.moderateScale(10),
    paddingHorizontal:constant.moderateScale(10),
    borderRadius:10,
    },
   
    listText2:{
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(13),
        color:'#686868',
    },
    detailMainView:{
        paddingHorizontal:"3%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5)
        },
        detailText:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            width:constant.moderateScale(115),
            fontFamily:constant.typeLight
        },
      
        dropList:{
          borderWidth:1,
          height:constant.moderateScale(40),
          flex:1,
          borderRadius:10,
          borderColor:'#ABABAB',
          backgroundColor:constant.whiteColor,
        },
        dropListText:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
        },
       middleMainView:{
        backgroundColor:'#F5F5F5',
        borderRadius:10,
        marginHorizontal:constant.moderateScale(4),
        borderWidth:2,
        borderColor:constant.whiteColor,
        elevation:1,
        marginVertical:constant.moderateScale(10),
        paddingBottom:constant.moderateScale(10)
    },

        driveListDetailView:{
            // flex:1,
            flexDirection:"row",
            marginHorizontal:constant.moderateScale(10),
            marginTop:constant.moderateScale(15)
           },
           driveListDetailSubView:{
           flex:1,
           },
           listText4:{
            fontSize:constant.moderateScale(10),
            color:'#727272',
            fontFamily:constant.typeRegular,
        },
        driveListDetailSubView2:{
            flex:1,
            },
        list3:{
            fontSize:constant.moderateScale(12),
            color:'#434343',
            fontFamily:constant.typeRegular,
        },
        bottomMainView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:constant.moderateScale(10)
        },
        bottomSubView:{
         flex:1,
         justifyContent:'flex-start',
        },
        bottomSubView2:{
        flex:0.7,
        justifyContent:'flex-end',
        },
        text5:{
            fontSize:constant.moderateScale(13),
            color:'#424242',
            fontFamily:constant.typeLight,
      
        },
        input:{
            fontSize:constant.moderateScale(12),
            color:'#424242',
            fontFamily:constant.typeRegular,
            borderWidth:1,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            borderRadius:10,
            height:constant.moderateScale(35),
            elevation:0.6,
            textAlign:'right',
            paddingHorizontal:constant.moderateScale(10)
      
        },
        text6:{
            fontSize:constant.moderateScale(7),
            color:'#434343',
            fontFamily:constant.typeLight,
      
        },
        text7:{
            fontSize:constant.moderateScale(7),
            color:'#3B3B3B',
            fontFamily:constant.typeRegular,
      
        },
        emiButtonStyle:{
       borderWidth:1,
       borderColor:constant.red,
       borderRadius:10,
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:constant.moderateScale(10),
       flexDirection:'row',
       alignSelf:'center',
       paddingVertical:constant.moderateScale(8),
       width:constant.moderateScale(220),
       marginTop:constant.moderateScale(20),
       marginBottom:constant.moderateScale(80)
        },
        emiButtonText:{
            fontSize:constant.moderateScale(20),
            color:'#FE0F17',
            fontFamily:constant.typeRegular,
      
        },
        emiButtonText2:{
            fontSize:constant.moderateScale(20),
            color:'#FE0F17',
            fontFamily:constant.typeRegular,
      
        },
 
})

export default styles;