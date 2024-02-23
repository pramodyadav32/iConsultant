import React from "react"
import { View, StyleSheet,Text, Pressable, Image, } from "react-native"
import * as constant from '../utilities/constants'
import images from "../utilities/images"
import {DrawerActions } from '@react-navigation/native';
import { useDispatch } from "react-redux";

const HomeHeader = (props) => {
    const{title,infoShow,showInfo,mainExt,showDrawer}= props
    const dispatch = useDispatch()

    return (
     <View style={[styles.MainView,mainExt]}>
        <Pressable style={styles.drawerButton} onPress={()=>showDrawer.dispatch(DrawerActions.toggleDrawer())}>
            <Image source={images.menu} style={styles.drawerIconStyle}  resizeMode="contain" />
        </Pressable>
     <View style={styles.midView}>
     <Text style={styles.title}>{title}</Text>
     </View>
     <View style={styles.rightView}>
     <Pressable style={styles.infoButton}>
        <Image source={images.searchIcon} style={styles.infoImage}  resizeMode="contain" />
     </Pressable>
   <Pressable style={styles.infoButton}>
        <Image source={images.bellIcon} style={styles.infoImage}  resizeMode="contain" />
     </Pressable>
</View>
     </View> 
    )
}

HomeHeader.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
    showInfo:true
}

export default HomeHeader;

const styles = StyleSheet.create({
    MainView: {
      
        backgroundColor: constant.blackColor,
        alignItems: "center",
        flexDirection:'row',
        height:constant.moderateScale(50),
        borderBottomWidth:1,
        borderBottomColor:constant.gainsboro,
    },
    title:{
    color:constant.whiteColor,
    fontFamily:constant.typeRegular,
    fontSize:constant.moderateScale(16),
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
    width:constant.moderateScale(40),
    height:constant.moderateScale(40),
   
    },
    infoImage:{
        width:constant.moderateScale(20),
        height:constant.moderateScale(20),
    },
    midView:{
     flex:1,
     justifyContent:'center'
    },
    rightView:{
        flex:0.2,
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:constant.moderateScale(15),     
    },
    drawerButton:{
    flex:0.18,
    justifyContent:'center',   
    },
    drawerIconStyle:{
        width:constant.moderateScale(25),
        height:constant.moderateScale(25), 
        marginLeft:constant.moderateScale(15)

    }
   
})