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

export default function CloseInfo(props) {
    const { cardClick } = props
    const dispatch = useDispatch()
    const [actionTypeData,setActionTypeData] = useState([])
    const [actionTypeValue,setActionTypeValue] = useState({})
    const [modelData,setModelData] = useState([])
    const [modelValue,setModelValue] = useState({})
    const [performData,setPerformData] = useState([])
    const [performValue,setPerformValue] = useState({})
    const [performDate,setPerformdate] = useState('')
    const [comment,setcomment] = useState('')
    const [closureDate,setClosureDate] = useState('')
    const [closureData,setClosureData] = useState([])
    const [closureValue,setClosureValue] = useState({})
    const [remark,setRemark] = useState('')

  const fn_Create =()=>{

   }

    return (
        <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={{flex:1,backgroundColor:constant.whiteColor,borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingBottom:constant.moderateScale(20)}}>

      <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={actionTypeData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setActionTypeValue(d)}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={modelData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setModelValue(d)}

           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed</Text>
           <SelectDropList 
             list={performData}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=> setPerformValue(d)}

           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Performed Date<Text style={styles.text2}>*</Text></Text>
         <Pressable style={styles.calenderMainView}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{performDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>

        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Action Comment</Text>
                <TextInput placeholder='Enter Comment' onChangeText={(d)=>setcomment(d)} style={styles.commentInput} >{comment}</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Date</Text>
         <Pressable style={styles.calenderMainView}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}>{closureDate}</TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>
       
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Closure Type</Text>
           <SelectDropList 
             list={closureData}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
             on_Select={(d)=>setClosureValue(d)}

           />
        </View>

        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Remarks</Text>
                <TextInput placeholder='Enter Remarks' onChangeText={(d)=>setRemark(d)} style={styles.commentInput} >{remark}</TextInput>
        </View>
    </View>
    <Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

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
        performaButton: {
            marginBottom: constant.moderateScale(30),
            marginTop: constant.moderateScale(10),
            marginHorizontal: constant.moderateScale(70),
            paddingVertical: constant.moderateScale(10),
            borderWidth: 1,
            borderColor: constant.whiteColor,
        },
   
})