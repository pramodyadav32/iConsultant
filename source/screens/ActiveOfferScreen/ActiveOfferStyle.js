import React from 'react'
import { StyleSheet } from 'react-native'
import * as constant from '../../utilities/constants'
const styles = StyleSheet.create({
    headerMainView:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     paddingHorizontal:constant.moderateScale(10),
     paddingTop:constant.moderateScale(10),
    },
    headerSubView:{

    },
    horLine:{
    height:4,
    width:constant.moderateScale(50),
    backgroundColor:'red',
    marginTop:constant.moderateScale(3)
    },
    headerText:{
        fontFamily: constant.typeMedium,
        fontSize: constant.moderateScale(15),
        color:'#3B3B3B',
    },
    headerText2:{
        fontFamily: constant.typeMedium,
        fontSize: constant.moderateScale(22),
        color: '#FE0F17',
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
    listText:{
        fontFamily: constant.typeRegular,
        fontSize: constant.moderateScale(14),
        color:'#3B3B3B',
    },
    listText2:{
        fontFamily: constant.typeLight,
        fontSize: constant.moderateScale(13),
        color:'#686868',
    },
 
})

export default styles;