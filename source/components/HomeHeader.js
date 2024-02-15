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
            {/* <Image source={images.drawerIcon} style={styles.drawerIconStyle} resizeMode="contain" /> */}
        </Pressable>
     <View style={styles.midView}>
     <Text style={styles.title}>{title}</Text>
     </View>
     <View style={styles.rightView}>
   {showInfo &&  <Pressable style={styles.infoButton}>
        {/* <Image 12source={require('../assets/dummy/')} style={styles.infoImage} resizeMode="contain" /> */}
     </Pressable>
}
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
    fontSize:constant.font22,
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
    position:'absolute',
    top:0,
    right:'15%'
    },
    infoImage:{
        width:constant.resW(5),
        height:constant.resW(5),
    },
    midView:{
     flex:1,
     justifyContent:'center'
    },
    rightView:{
        flex:0.5,
        justifyContent:'center',
    },
    drawerButton:{
    flex:0.4
   
    },
    drawerIconStyle:{
        width:constant.resW(8),
        height:constant.resW(8), 
        marginLeft:constant.resW(5)

    }
   
})