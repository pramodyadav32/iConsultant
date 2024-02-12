import React from "react"
import { View, StyleSheet,Text, Pressable, Image, } from "react-native"
import * as constant from '../utilities/constants'
import images from "../utilities/images"
import {DrawerActions } from '@react-navigation/native';
import { useDispatch } from "react-redux";

const CommonHeader = (props) => {
    const{title,onBack,showInfo,mainExt,}= props
    const dispatch = useDispatch()

    return (
     <View style={[styles.MainView,mainExt]}>
        <Pressable style={styles.drawerButton} onPress={onBack}>
            <Image source={images.backIcon} style={styles.drawerIconStyle} resizeMode="contain" />
        </Pressable>
     <View style={styles.midView}>
     <Text style={styles.title}>{title}</Text>
     </View>
     <View style={styles.rightView}>
   {showInfo &&  <Pressable style={styles.infoButton}>
   <Text style={styles.infoButtonText}>Select All</Text>
     </Pressable>
}
</View>
     </View> 
    )
}

CommonHeader.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
    showInfo:false
}

export default CommonHeader;

const styles = StyleSheet.create({
    MainView: {
      
        backgroundColor: constant.whiteColor,
        alignItems: "center",
        flexDirection:'row',
        height:constant.resW(17),
        borderBottomWidth:1,
        borderBottomColor:constant.gainsboro,
    },
    title:{
    color:constant.blackColor,
    fontFamily:constant.typeSemibold,
    fontSize:constant.font21,
    includeFontPadding:false,
    },
    closeIcon:{
        color:constant.whiteColor,
        fontSize:constant.font10,
        paddingHorizontal:'2.5%',
        paddingVertical:'0.3%'
    },
    infoButton:{
    alignItems:'center',
    justifyContent:'center',
  
    },

    infoButtonText:{
        color:constant.baseColor,
        fontFamily:constant.typeRegular,
        fontSize:constant.font14,
        includeFontPadding:false,
        marginRight:constant.resW(4)
    },
    midView:{
     flex:1,
     justifyContent:'center',
    },
    rightView:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    drawerButton:{
    flex:0.25,   
    },
    drawerIconStyle:{
        width:constant.resW(7),
        height:constant.resW(7), 
        marginLeft:constant.resW(3)

    }
   
})