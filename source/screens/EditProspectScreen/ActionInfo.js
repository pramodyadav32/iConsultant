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

export default function ActionInfo(props) {
    const { cardClick,updateClick } = props
    const dispatch = useDispatch()


    return (
        <View style={{ flex: 1, paddingHorizontal: '1%', paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
      
           <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(10), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
                
                <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
                    <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText3}>Active Action</Text>
                        <View style={styles.horizontalLine} />
                    </View>
                  
                </View>

                <View style={[styles.driveListDetailView, {marginTop:constant.moderateScale(10) }]}>
                    <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText2}>Action</Text>
                        <Text style={styles.listText3}>Test Drive</Text>
                    </View>
                    <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Due on </Text>
                        <Text style={styles.listText3}>14-Feb-2024</Text>
                    </View>
                </View>

                <View style={[styles.driveListDetailView, {marginTop:constant.moderateScale(10) }]}>
                    <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Stutus</Text>
                        <Text style={styles.listText3}>Active</Text>
                    </View>
                    <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Completed on</Text>
                        <Text style={styles.listText3}>-</Text>
                    </View>
                </View>

                <View style={[styles.driveListDetailView, {marginTop:constant.moderateScale(10) }]}>
                    <View style={styles.driveListDetailSubView}>
                        <Text style={styles.listText2}>Remarks</Text>
                        <Text style={styles.listText3}>-</Text>
                    </View>
                    <View style={styles.driveListDetailSubView2}>
                        <Text style={styles.listText2}>Projected Closure Data</Text>
                        <Text style={styles.listText3}>Standard</Text>
                    </View>
                </View>

                <View style={[styles.driveListDetailView, {marginTop:constant.moderateScale(15) }]}>
                <View style={styles.buttonView2}>
                    
                    </View>
                    <View style={styles.buttonView}>
                       <Button title='Update'
                        buttonExt={styles.updateButton}
                        click_Action={()=>updateClick()}
                       />
                    </View>
                </View>



            </View>

            <View style={{ backgroundColor: '#F9F9F9',
             borderWidth: 2, borderRadius: 10,
              borderColor: constant.whiteColor, paddingHorizontal: constant.moderateScale(10), 
              paddingBottom: constant.moderateScale(10), elevation: 1,
              marginTop:constant.moderateScale(10) }}>
                  <View style={styles.detailMainView}>
                  <View style={[styles.driveListDetailSubView, {}]}>
                        <Text style={styles.listText3}>New Action</Text>
                        <View style={styles.horizontalLine} />
                    </View>
        </View>
            <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Action Type<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model<Text style={styles.text2}>*</Text></Text>
           <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Date<Text style={styles.text2}>*</Text></Text>
         <Pressable style={styles.calenderMainView}>
            <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}></TextInput>
            <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
         </Pressable>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Time</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title='03:00 PM'
             buttonExt={styles.dropList}
             textExt={styles.timeDropListText}
           />
           <Text> </Text>
            <SelectDropList 
             list={[]}
             title='03:00 PM'
             buttonExt={styles.dropList}
             textExt={styles.timeDropListText}
           />
        
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>VIN</Text>
                <TextInput placeholder='Type here' style={styles.input1} ></TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Regn.<Text style={styles.text2}>*</Text></Text>
                <TextInput placeholder='Type here' style={styles.input1} ></TextInput>
        </View>

        <View style={[styles.detailMainView,{alignItems:'flex-start'}]}>
            <Text style={[styles.detailText,{marginTop:'3%'}]}>Action Comment</Text>
                <TextInput placeholder='Enter Comment' style={styles.commentInput} ></TextInput>
        </View>

             </View>
    
     </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    driveListDetailView:{
         flexDirection:"row",
        },
        driveListDetailSubView:{
        height:constant.moderateScale(30),
        width:'50%'
        },
        driveListDetailSubView2:{
          flex:1,
            height:constant.moderateScale(30)
            },
        listText2:{
            fontSize:constant.moderateScale(10),
            color:'#434343',
            fontFamily:constant.typeRegular,
        },
      
        listText3:{
            fontSize:constant.moderateScale(12),
            color:'#434343',
            fontFamily:constant.typeMedium,
        },
        horizontalLine:{
            height:constant.moderateScale(2),
            width:constant.moderateScale(35),
            backgroundColor:constant.red,
            borderRadius:constant.moderateScale(100),
            marginTop:constant.moderateScale(3)
          },
          buttonView:{
            flex:1,
            
            //  height:constant.moderateScale(30)
                  
          },
          buttonView2:{
            flex:0.2,
            //  height:constant.moderateScale(30)
                  
          },
          updateButton:{
            width:constant.moderateScale(180),
            paddingVertical:constant.moderateScale(6)
          },


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
            timeDropListText:{
                fontSize:constant.moderateScale(13),
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
            proceedButton:{
             width:constant.moderateScale(135),
             alignSelf:'center',
             marginTop:constant.resW(30),
             marginBottom:constant.resW(5)
            },
            proccedButtonText:{
        
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