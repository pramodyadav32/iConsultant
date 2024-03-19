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

export default function PerformaTerm(props) {
   const { navigation,term_Data, moveToPerformaInvoice } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [active, setActive] = useState(false)
   const [listData,setListData] = useState([])

   useEffect(()=>{
    setListData(term_Data)
   },[term_Data])
 
   const fn_SelectTerm=(item,index)=>{
    let newArr = listData
    if(item.select){
        item.select = false
        newArr.splice(index,1,item)
        setListData([...newArr])
    }else{
        item["select"] = true
        newArr.splice(index,1,item)
        setListData([...newArr])
    }
   }


   const accessoriesList=({item,index})=>{
    return(
       <Pressable onPress={()=>fn_SelectTerm(item,index)} style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
       <View style={[styles.driveListDetailSubView,{}]}>
       <FastImage source={item?.select ? images.checkIcon : images.unCheckIcon} style={styles.checkbox} />
       </View>
       <View style={[styles.costListSubView3,{}]}>
       <Text style={styles.costListText3}>{item?.description}</Text>
       </View>
       
       </Pressable>
    )
   }
 
  
 
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
      <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>
              
                 <FlatList 
                  data={listData}
                  renderItem={accessoriesList}
                  ListHeaderComponent={()=>common_fn.listSpace(constant.moderateScale(10))}

                  ListFooterComponent={()=>common_fn.listSpace(constant.moderateScale(20))}
                 />
          
  
         </View>
         <Button title='Next' click_Action={() => moveToPerformaInvoice()} buttonExt={styles.performaButton} />
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
        borderBottomRightRadius:10,
        paddingHorizontal:constant.moderateScale(5)
       },
    costListMainView:{
        flexDirection:"row",
        marginHorizontal:constant.moderateScale(5),
        marginTop:constant.moderateScale(10),
    
    },
    driveListDetailSubView:{
        flex:0.13,
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
      includeFontPadding:false
  },
  costListSubView3:{
    flex:1,
    // alignItems:'center',
    // justifyContent:'flex-end',
    },
  
     
    performaButton:{
        marginBottom:constant.moderateScale(30),
        marginTop:constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(70),
        paddingVertical:constant.moderateScale(10),
        borderWidth:1,
        borderColor:constant.whiteColor,
       },
       checkbox:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25),
       },
      
 })
