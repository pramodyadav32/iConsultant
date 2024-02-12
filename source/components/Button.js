import React from "react"
import { View, StyleSheet,Text, Pressable, Image, } from "react-native"
import * as constant from '../utilities/constants'

const Button = (props) => {
    const{title,click_Action,buttonExt,textExt}= props
    return (
    <Pressable style={[styles.infoButton,buttonExt]} onPress={()=>click_Action()}>
    <Text style={[styles.title,textExt]}>{title}</Text>
     </Pressable>
    )
}

Button.defaultProps = {
    onRequestClose: function () { },
    buttonExt:{},
    textExt:{}
}

export default Button;

const styles = StyleSheet.create({
 
    title:{
    color:constant.whiteColor,
    fontFamily:constant.typeMedium,
    fontSize:constant.font15,
    marginTop:'1%'
    // includeFontPadding:false
    },
    infoButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:constant.baseColor,
    marginHorizontal:'5%',
    paddingVertical:'2.5%',
    borderRadius:10,
    elevation:2
    },  
})