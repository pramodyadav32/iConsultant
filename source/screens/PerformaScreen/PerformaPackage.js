import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput, StyleSheet } from 'react-native';
import * as constant from '../../utilities/constants'
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';

const data2 = [
    { 'key': 1, "title": 'Your Profile',  },
    { 'key': 2, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 4, "title": 'Your Profile', },
    { 'key': 5, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },
    { 'key': 3, "title": 'Your Profile', },

 
 ]

export default function PerformaPackage(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(false)
   const [animatedValue] = useState(new Animated.Value(1));
   const [detailModal,setDetailModal] = useState(false)
   const [packageModel,setPackageModel] = useState(false)
   const [addListModel,setAddListModel] = useState(false)

   const accessoriesList=({item,index})=>{
    return(
       <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
       <View style={[styles.driveListDetailSubView,{}]}>
          <Text style={styles.costListText3}>Features </Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>0</Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>-</Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>0</Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>0</Text>
       </View>
       </View>
    )
   }
 
   const accessoriesHeaderList=()=>{
    return(
       <View style={[styles.costListMainView,{}]}>
       <View style={[styles.driveListDetailSubView,{}]}>
          <Text style={styles.costListText2}>Description</Text>
       </View>
       <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Price</Text>
       </View>
       <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Discount</Text>
       </View>
       <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>GST</Text>
       </View>
       <View style={styles.costListSubView3}>
          <Text style={styles.costListText2}>Total</Text>
       </View>
      </View>
    )
   }
 
   const accessoriesFooterList=()=>{
    return(
       <View style={[styles. costListMainView,{backgroundColor:'#F0F0F0',borderBottomRightRadius:10,borderBottomLeftRadius:10,paddingVertical:constant.moderateScale(7),paddingHorizontal:10,marginHorizontal:0}]}>
       <View style={[styles.driveListDetailSubView,{}]}>
          <Text style={styles.costListText2}>Total Payable</Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}> </Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}></Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}></Text>
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>00.00</Text>
       </View>
       </View>
    )
   }
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
      <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>

            <View style={[styles.topMainView,{marginTop:constant.moderateScale(5)}]}>
                <View style={styles.topSubView}>
                 <FastImage source={active ?images.checkIcon : images.unCheckIcon} style={styles.checkbox} />
                <Text style={styles.text3}>Handling Charges</Text>
                </View>
                <View style={styles.topSubView}>
                 <TextInput style={styles.input} ></TextInput>
                </View>
            </View>

            <View style={styles.topMainView}>
                <View style={styles.topSubView2}>
                <Text style={styles.text4}>Price</Text>
                <TextInput style={styles.input} ></TextInput>

                </View>
                <View style={styles.topSubView2}>
                <Text style={styles.text4}>Total Price</Text>

                <TextInput style={styles.input} ></TextInput>

                </View>
            </View>
                  <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(0)}}>
                 <FlatList 
                  data={data2}
                  style={{height:constant.moderateScale(330)}}
                  ListHeaderComponent={()=>accessoriesHeaderList()}
                  renderItem={accessoriesList}
                  ListFooterComponent={()=>accessoriesFooterList()}
                 />
                </View>
          
  
         </View>
         <Button title='Next' click_Action={() => null} buttonExt={styles.performaButton} />
       </ScrollView>
        </View>
   )
}


 const styles=StyleSheet.create({
    cal_SubView2:{
        flex:1,
        backgroundColor:constant.whiteColor,
        marginBottom:constant.moderateScale(6),
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
       },
    costListMainView:{
        flexDirection:"row",
        marginHorizontal:constant.moderateScale(5),
        marginTop:constant.moderateScale(10),
    
    },
    driveListDetailSubView:{
        flex:1,
        },
costListSubView:{
   flex:1,
    height:constant.moderateScale(30)
    },
    costListText2:{
      fontSize:constant.moderateScale(13),
      color:'#424242',
      fontFamily:constant.typeMedium,
  },
  costListText3:{
      fontSize:constant.moderateScale(12),
      color:'#434343',
      fontFamily:constant.typeLight,
  },
  costListSubView3:{
    flex:0.7,
    alignItems:'center',
    justifyContent:'flex-end',
    },
  
     
    performaButton:{
        marginBottom:constant.moderateScale(30),
        marginTop:constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(70),
        paddingVertical:constant.moderateScale(10),
        borderWidth:1,
        borderColor:constant.whiteColor,
       },
       topMainView:{
         marginHorizontal:constant.moderateScale(7),
         paddingVertical:constant.moderateScale(4),
         flexDirection:'row',
         justifyContent:'space-between'
       },
       topSubView:{
       flexDirection:'row',
       alignItems:'center',
       flex:0.49
       
       },
       topSubView2:{
        // flexDirection:'row',
        // alignItems:'center',
        justifyContent:'center',
        flex:0.49
        
        },
       checkbox:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25)
       },
       text3:{
        fontSize:constant.moderateScale(14),
        color:'#424242',
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(10)
       },
       text4:{
        fontSize:constant.moderateScale(14),
        color:'#424242',
        fontFamily:constant.typeRegular,
        marginBottom:constant.moderateScale(6)
       },
       input:{
        fontSize:constant.moderateScale(14),
        color:'#424242',
        fontFamily:constant.typeRegular,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ABABAB',
        flex:1,
        height:constant.moderateScale(40)
       },
 })
