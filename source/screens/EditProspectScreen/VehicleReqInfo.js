import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
// import styles from './EditProspectStyle'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function VehicleReqInfo(props) {
    const { cardClick } = props
    const [count,setCount] = useState(0)
    const dispatch = useDispatch()


    return (
        <View style={{ flex: 1, paddingHorizontal: '1%', paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
     
     <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Edition<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Varient</Text>
                <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Style<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Exterior<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Internal</Text>
                <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>MY/VY</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title='2024'
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
           <Text> </Text>
            <SelectDropList 
             list={[]}
             title='2024'
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Assembly Type</Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.bottomMainView}>
        <View style={styles.detailMainView2}>
            <Text style={styles.detailText}>Fuel</Text>
           <SelectDropList 
             list={[]}
             title='Please Select'
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView2}>
            <Text style={styles.detailText}>Reference</Text>
            <TextInput style={styles.refInput} >Available</TextInput>
         
        </View>
        <View style={styles.detailMainView2}>
            <Text style={styles.detailText}>Count</Text>
        <View style={styles.coutMainView}>
         <Pressable style={styles.coutButton}>
           <FastImage source={images.minussign} tintColor={constant.red} resizeMode='contain' style={styles.minusStyle} />
         </Pressable>
        <View style={styles.countInput}>
        <Text style={styles.countInputText}>{count}</Text>
        </View>

         <Pressable style={styles.coutButton}>
         <FastImage source={images.add} tintColor={constant.red} resizeMode='contain' style={styles.minusStyle} />
         </Pressable>
        </View>         
        </View>
      
        </View>
     
     </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
        text2:{
            fontSize:constant.moderateScale(14),
            color:constant.red,  
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
        mobileSubView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
        },
        input1:{
            borderWidth:1,
            height:constant.moderateScale(40),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            paddingHorizontal:"3%",
            fontSize:constant.moderateScale(15)
        },
        searchButtonStyle:{
        alignItems:'center',
        justifyContent:'center',
        },
        searchStyle:{
            height:constant.moderateScale(50),
            width:constant.moderateScale(50),
        },
        detailMainView2:{
            paddingHorizontal:"2%",
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:"2%"
            },
        bottomMainView:{
        backgroundColor:constant.whiteColor,
        marginHorizontal:'1%',
        borderRadius:10,
        elevation:1,
        marginTop:'3%',
        paddingBottom:'2%'
        },
        calenderStyle:{
            height:constant.moderateScale(25),
            width:constant.moderateScale(25),
            marginRight:'2%'
        },
        calenderMainView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ABABAB',
        paddingLeft:"3%",
    
        },
        calenderInput:{
            height:constant.moderateScale(40),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            fontSize:constant.moderateScale(14)
        },
      
        dropNameList:{
            borderWidth:1,
            height:constant.moderateScale(40),
            borderRadius:8,
            width:constant.resW(17),
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
           paddingHorizontal:0
          },
          dropNameListText:{
              fontSize:constant.moderateScale(14),
              color:constant.textColor,
              fontFamily:constant.typeLight,
          },
          refInput:{
            height:constant.moderateScale(40),
            flex:1,
            backgroundColor:constant.whiteColor,
            color:'#4AAA38',
            fontFamily:constant.typeMedium,
            fontSize:constant.moderateScale(15)
          },
          coutMainView:{
           flex:1,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'center'
          },
          coutButton:{
        //   backgroundColor:constant.red,
          height:constant.moderateScale(40),
          width:constant.moderateScale(40),
          borderRadius:7,
          alignItems:'center',
          justifyContent:'center'
          },
          counttext:{
            fontFamily:constant.typeMedium,
            fontSize:constant.font34,
            color:constant.red,
            
          },
          countInput:{
            height:constant.moderateScale(35),
             borderWidth:1,
            borderRadius:8,
            backgroundColor:constant.whiteColor,
            width:constant.moderateScale(100),
          alignItems:'center',
          justifyContent:'center' ,
          marginHorizontal:constant.moderateScale(10)   ,
          borderColor:constant.red  
          },
          countInputText:{
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            fontSize:constant.moderateScale(15),
          },
          commentInput:{
            borderWidth:1,
            height:constant.moderateScale(90),
            flex:1,
            borderRadius:10,
            borderColor:'#ABABAB',
            backgroundColor:constant.whiteColor,
            color:constant.blackColor,
            fontFamily:constant.typeLight,
            paddingHorizontal:"3%",
            fontSize:constant.moderateScale(14),
            textAlignVertical:'top'
        },
        minusStyle:{
            height:constant.moderateScale(20),
            width:constant.moderateScale(20),
        }
})