import React from "react"
import { View, StyleSheet,Text, Pressable, Image, } from "react-native"
import * as constant from '../utilities/constants'
import images from "../utilities/images"
import {DrawerActions } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";

const CommonHeader = (props) => {
    const{title,onBack,showInfo,mainExt,edit,editClick,notifyClick}= props
    const dispatch = useDispatch()

    return (
     <View style={[styles.MainView,mainExt]}>
        <Pressable style={styles.drawerButton} onPress={onBack}>
            <FastImage source={images.backIcon} resizeMode='contain' style={styles.drawerIconStyle}  />
        </Pressable>
     <View style={styles.midView}>
     <Text style={styles.title}>{title}</Text>
     </View>
     <View style={styles.rightView}>
  {showInfo && <Pressable style={styles.infoButton}>
   <FastImage source={images.bellIcon} style={styles.bellIcon} resizeMode="contain" />
     </Pressable>
}
{edit && <Pressable style={styles.infoButton} onPress={()=>editClick()}>
   <FastImage source={images.editIcon} style={styles.editIcon} resizeMode="contain" />
     </Pressable>
}
</View>
     </View> 
    )
}

CommonHeader.defaultProps = {
    onRequestClose: function () { },
    isVisible: false,
    showInfo:true,
    edit : false,
    editClick:function () { },
    notifyClick : function () {} ,
}

export default CommonHeader;

const styles = StyleSheet.create({
    MainView: {
      
        backgroundColor: constant.blackColor,
        alignItems: "center",
        flexDirection:'row',
        height:constant.moderateScale(50),
        // borderBottomWidth:1,
        // borderBottomColor:constant.gainsboro,
    },
    title:{
    color:constant.whiteColor,
    fontFamily:constant.typeRegular,
    fontSize:constant.moderateScale(16),
    includeFontPadding:false,
    },
 
    infoButton:{
    alignItems:'center',
    justifyContent:'flex-end',
    // backgroundColor:'red',
    // marginRight:constant.resW(3),
    paddingHorizontal:'12%',
    paddingVertical:"4%"
  
    },

   bellIcon:{
    width:constant.moderateScale(18),
    height:constant.moderateScale(18), 
   },
   editIcon:{
    width:constant.moderateScale(25),
    height:constant.moderateScale(25), 
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
    flex:0.2,   
    },
    drawerIconStyle:{
        width:constant.moderateScale(20),
        height:constant.moderateScale(20), 
        marginLeft:constant.moderateScale(15)

    }
   
})