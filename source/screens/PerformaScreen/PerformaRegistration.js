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
    { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
    { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
 
 ]

export default function PerformaRegistration(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const [selectState,setSelectState] = useState(false)
  
  
 
  
 
   return (
      <View style={{ flex: 1, backgroundColor: '#E1E1E1' }}>  
 <ScrollView showsVerticalScrollIndicator={false}>
     
         <View style={styles.cal_SubView2}>

         <View style={{flex:1,backgroundColor:'#F9F9F9',borderWidth:1,borderColor:constant.whiteColor,borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Distict</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Zone</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>SubZone</Text>
              <Text style={styles.text6}>-</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Chatges Applicable On</Text>
              <Text style={styles.text6}>Current Date</Text>
            </View> 
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Regn Location</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Regn Code</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Style</Text>
              <Text style={styles.text6}>STANDARD</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>MV/VY</Text>
              <Text style={styles.text6}>2024/2024</Text>
            </View> 
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>Style</Text>
              <Text style={styles.text6}>STANDARD</Text>
            </View> 
            <View style={[styles. bottomMainView2,{}]}>
            <Text style={styles.text5}>MV/VY</Text>
              <Text style={styles.text6}>2024/2024</Text>
            </View> 
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Source</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            <View style={[styles.detailMainView,{marginTop:constant.moderateScale(10)}]}>
              <Text style={styles.detailText}>Billing Location</Text>
              <SelectDropList
                list={[]}
                buttonExt={styles.dropList}
                textExt={styles.dropListText}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
            </View>

            </View>
            <View style={{flex:1,backgroundColor:'#F9F9F9',borderRadius:10,marginHorizontal:constant.moderateScale(3),paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingVertical:constant.moderateScale(10),marginBottom:constant.moderateScale(20)}}>
          
          <View style={[styles.callHeaderMainView,{paddingHorizontal:constant.moderateScale(3)}]}>
           <View style={styles.callHeaderSubView}>
            <Text style={styles.text8}>Version</Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>Price</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <Text style={styles.text8}>Add on Amnt</Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>Total</Text>
           </View>
          </View >

          <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>Registration to be done by Custumer</Text>
            </View> 
            
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>Permanent Regn./Road Tax</Text>
            </View> 
            
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput style={styles.dropList3} ></TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
          </View >

          <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>Temporary Registration</Text>
            </View>           
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput style={styles.dropList3} ></TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
          </View >

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>Life-Time Tax</Text>
            </View>           
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput style={styles.dropList3} ></TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
          </View >

            <View style={{flex:1,flexDirection:'row'}}>
            <View style={[styles. bottomMainView,{}]}>
                <FastImage source={images.unCheckIcon} style={styles.checkboxStyle} />
              <Text style={styles.text4}>Hypothecation Charges</Text>
            </View>           
            </View>

            <View style={[styles.callHeaderMainView,{marginTop:constant.moderateScale(5)}]}>
           <View style={styles.callHeaderSubView}>
           <SelectDropList
                list={[]}
                buttonExt={styles.dropList2}
                textExt={styles.dropListText2}
               //  on_Select={(d)=>setActionTypeValue(d)}
              />
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <TextInput style={styles.dropList3} ></TextInput>        
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>-</Text>
           </View>
          </View >

          <View style={[styles.callHeaderMainView2]}>
           <View style={[styles.callHeaderSubView,{alignItems:'flex-end'}]}>
            <Text style={[styles.text8,{paddingRight:constant.moderateScale(20)}]}>Total</Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>0</Text>
           </View>
           <View style={styles.callHeaderSubView3}>
            <Text style={styles.text8}></Text>
           </View>
           <View style={styles.callHeaderSubView2}>
            <Text style={styles.text8}>0</Text>
           </View>
          </View >

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
    performaButton:{
        marginBottom:constant.moderateScale(30),
        marginTop:constant.moderateScale(10),
        marginHorizontal:constant.moderateScale(70),
        paddingVertical:constant.moderateScale(10),
        borderWidth:1,
        borderColor:constant.whiteColor,
       },
       detailMainView:{
        paddingHorizontal:constant.moderateScale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:constant.moderateScale(5)
        },
        detailText:{
            fontSize:constant.moderateScale(14),
            color:'#424242',
            width:constant.moderateScale(150),
            fontFamily:constant.typeLight
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
        selectMainView:{
            paddingHorizontal:constant.moderateScale(10),
            flexDirection:'row',
            alignItems:'center',
            // justifyContent:'space-between',
            marginTop:constant.moderateScale(8)
        },
        selectCheckIcon:{
            height:constant.moderateScale(25),
            width:constant.moderateScale(25)
        },
        middleMainView:{
            paddingHorizontal:constant.moderateScale(10),
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:constant.moderateScale(8)
        },
        text2:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
            marginRight:constant.moderateScale(15)
        },
        text3:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
            marginRight:constant.moderateScale(11)
        },
        bottomMainView:{
            paddingHorizontal:constant.moderateScale(8),
            flexDirection:'row',
            alignItems:'center',
            flex:1,
            paddingVertical:constant.moderateScale(5)
            },
            checkboxStyle:{
                height:constant.moderateScale(20),
                width:constant.moderateScale(20)
            },
            text4:{
                fontSize:constant.moderateScale(14),
                color:constant.textColor,
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(8)
            },
            text5:{
                fontSize:constant.moderateScale(12),
                color:'#00000042',
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(11)
            },
            text6:{
                fontSize:constant.moderateScale(14),
                color:'#000',
                fontFamily:constant.typeRegular,
                marginLeft:constant.moderateScale(11),
                marginTop:constant.moderateScale(2)
            },
            bottomMainView2:{
                // paddingHorizontal:constant.moderateScale(8),
                // flexDirection:'row',
                // alignItems:'center',
                flex:1,
                paddingVertical:constant.moderateScale(5)
                },
                text7:{
                    fontSize:constant.moderateScale(14),
                    color:'#000',
                    fontFamily:constant.typeLight,
                    marginLeft:constant.moderateScale(11)  
                },
                text8:{
                    fontSize:constant.moderateScale(14),
                    color:'#000',
                    fontFamily:constant.typeRegular,
                    marginLeft:constant.moderateScale(10)  
                },
                callHeaderMainView:{
                flexDirection:'row',
                paddingBottom:constant.moderateScale(10),
                paddingHorizontal:constant.moderateScale(10)


                },
                callHeaderMainView2:{
                    flexDirection:'row',
                    // paddingBottom:constant.moderateScale(10),
                    paddingHorizontal:constant.moderateScale(3),
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
    
                    },
                callHeaderSubView:{
                flex:1,
                justifyContent:'center',
                },
                callHeaderSubView2:{
                    flex:0.3,
                    alignItems:'flex-end',
                        justifyContent:'center',
                    paddingRight:constant.moderateScale(10)
                    },
                    callHeaderSubView3:{
                        flex:0.6,
                        alignItems:'center',
                        justifyContent:'center',
                        },
                        dropList2:{
                            borderWidth:1,
                            height:constant.moderateScale(40),
                            width:'90%',
                            borderRadius:10,
                            borderColor:'#ABABAB',
                            backgroundColor:constant.whiteColor,
                          },
                          dropListText2:{
                              fontSize:constant.moderateScale(15),
                              color:constant.textColor,
                              fontFamily:constant.typeLight,
                          },
                          dropList3:{
                            borderWidth:1,
                            height:constant.moderateScale(40),
                            width:'80%',
                            borderRadius:10,
                            borderColor:'#ABABAB',
                            backgroundColor:constant.whiteColor,
                            fontSize:constant.moderateScale(15),
                            color:constant.textColor,
                            fontFamily:constant.typeLight,
                            textAlign:'right',
                            paddingHorizontal:constant.moderateScale(5)
                          },
                         

 })