import React from 'react'
import Snackbar from 'react-native-snackbar';
import images from './images';
import * as constant from './constants'
import { ActivityIndicator, View,Text,StyleSheet } from 'react-native';

export const showMsg = (msg) => {
  Snackbar.show({
    text: msg,
    backgroundColor: constant.baseColor,
    fontFamily:constant.typeRegular,
    duration: Snackbar.LENGTH_LONG,
  })
}

export function validEmail(text) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return (reg.test(text))
}

export const listSpace = (h = 10) => {
  return (
    <View style={{ height: h }} />
  )
}
export const listVer_Space = (h = 10) => {
  return (
    <View style={{ width: h }} />
  )
}

export const emptyData=()=>{
return(
  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
  <ActivityIndicator color={constant.baseColor} size={'large'} />
  </View>
)
}

export const listEmpty=(msg,h = 0)=>{
  return(
  <View style={[styles.emptyView,{marginTop:h}]}>
  <Text style={styles.emptyListText} >{msg}</Text>
 </View>
  )
}


const styles = StyleSheet.create({
  emptyListText:{
    fontSize:constant.moderateScale(18),
    color:'#434343',
    fontFamily:constant.blackColor,

},
emptyView:{
flex:1,
 alignItems:'center',
 justifyContent:'center',
 marginTop:constant.moderateScale(150)
},
})