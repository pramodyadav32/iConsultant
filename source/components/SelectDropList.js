import React,{useRef,useEffect} from "react"
import { View, StyleSheet,Text, Image, } from "react-native"
import * as constant from '../utilities/constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown'
import images from "../utilities/images"
import FastImage from "react-native-fast-image"

const SelectDropList = (props) => {
    const dropdownRef = useRef({}); 
    const{title,list,on_Select,buttonExt,textExt,imageIcon,imageSize,desName,disable,refType, dropdownIndexValue}= props
// console.log("dropdownIndexValue", dropdownIndexValue)
    useEffect(()=>{
     if(refType){
        dropdownRef.current.reset()
     }
    },[refType])

    return (
        <SelectDropdown
        data={list}
        ref={dropdownRef}
        defaultButtonText={title}
        disabled={disable}
        defaultValueByIndex={dropdownIndexValue}
        onSelect={(selectedItem, index) => {
             on_Select(selectedItem)
            console.log(selectedItem, index)
        }}
        buttonStyle={[styles.selectButton,buttonExt]}
        buttonTextStyle={[styles.title,textExt]}
        renderDropdownIcon={isOpened => {
            return (
                <View style={{alignItems:'center',justifyContent:'center'}}>
                 <AntDesign name={isOpened ?'up' : 'down'} style={styles.upIcon} />
             </View>
            );
          }}
          dropdownIconPosition="right"
          rowStyle={{}}
          rowTextStyle={{}}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
           if( desName === '1')
            return selectedItem.description
            else if(desName === '2')
            return selectedItem.itemDescription
            else if(desName === '5')
            return selectedItem.drivenByDescription
            else if(desName === '15')
            return selectedItem.dataDescription
            else if(desName === '16')
            return selectedItem.r_Text
            else
            return selectedItem.categoryDescription
        }}
        rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            // return item.description
            if( desName === '1')
            return item.description
            else if(desName === '2')
            return item.itemDescription
            else if(desName === '5')
            return item.drivenByDescription
            else if(desName === '15')
            return item.dataDescription
            else if(desName === '16')
            return item.r_Text
            else
            return item.categoryDescription
        }}
    />
    )
}

SelectDropList.defaultProps = {
    on_Select: function () { },
    title: 'Please Select',
    buttonExt:{},
    textExt:{},
    imageIcon:false,
    imageSize:constant.resW(1),
    disable:false,
    refType:false
    
}

export default SelectDropList;

const styles = StyleSheet.create({
    MainView: {
      
    },
    selectButton:{
    backgroundColor:'#F7FAFC',
    height:'67%',
    width:'20%',
    },
    title:{
    color:constant.blackColor,
    fontFamily:constant.typeBold,
    fontSize:constant.font5,
    textAlign:'left'
    },

    downIcon:{
        // color:constant.silver,
        // fontSize:constant.font15,
        // paddingHorizontal:'2.5%',
        // paddingVertical:'0.3%'
        height:constant.resW(5),
        width:constant.resW(5),
    },
    upIcon:{
        color:constant.blackColor,
        fontFamily:constant.typeBold,
        fontSize:constant.moderateScale(13),
    },
    downArrow:{
        color:constant.blackColor,
    fontFamily:constant.typeBold,
    fontSize:constant.font5,
    }
   
})