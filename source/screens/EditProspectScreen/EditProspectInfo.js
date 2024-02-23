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

export default function EditProspectInfo(props) {
    const { cardClick } = props
    const dispatch = useDispatch()
    const [activeIndex,setActiveIndex] = useState(true)
    const [active, setActive] = useState(1)


    const fn_TabClick = (type) => {
        setActive(type)
      
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: '1%', paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>setActiveIndex(true)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Customer Info</Text>
                 <FastImage source={ activeIndex ? images.downArrow : images.rightArrow} style={styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {activeIndex && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Prospect Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>


        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Name</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title='Mr.'
             buttonExt={styles.dropNameList}
             textExt={styles.dropNameListText}
           />
            <TextInput style={[styles.input1,{marginLeft:'2%'}]} >Alfred Rosario</TextInput>
        
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Son of</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title='Mr.'
             buttonExt={styles.dropNameList}
             textExt={styles.dropNameListText}
           />
            <TextInput style={[styles.input1,{marginLeft:'2%'}]} >Alfred Rosario</TextInput>
        
            </View>
        </View>
 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Mobile No.<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
                <TextInput style={styles.input1} keyboardType='numeric'>+91 8470068493</TextInput>
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Email ID</Text>
                <TextInput style={styles.input1} >a.r@gmail.com</TextInput>
        </View>


        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>I-Tax PAN</Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Employer Name</Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Employer Mail</Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Designation</Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>setActiveIndex(false)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Address Info</Text>
                 <FastImage source={ activeIndex ? images.downArrow : images.rightArrow} style={styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>

                 {activeIndex=== false && <View>

                    <View style={styles.tabMainView}>
                    <View style={styles.tabSubView}>
                            <Pressable style={active === 1 ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(1)} >
                                <Text style={active === 1 ? styles.tabButtonText : styles.tabButtonText2}>Add(Regn.)</Text>
                                {active === 1 && <View style={styles.horixontalLine} />}
                            </Pressable>
                            <Pressable style={active === 2 ? [styles.tabButton, { width: constant.resW(20), }] : [styles.tabButton2, { width: constant.resW(20) }]} onPress={() => fn_TabClick(2)} >
                                <Text style={active === 2 ? styles.tabButtonText : styles.tabButtonText2}>Add(Res.)</Text>
                                {active === 2 && <View style={styles.horixontalLine} />}
                            </Pressable>
                            <Pressable style={active === 3 ? [styles.tabButton, { width: constant.resW(20), }] : [styles.tabButton2, { width: constant.resW(20) }]} onPress={() => fn_TabClick(3)} >
                                <Text style={active === 3 ? styles.tabButtonText : styles.tabButtonText2}>Add(Off.)</Text>
                                {active === 3 && <View style={styles.horixontalLine} />}

                            </Pressable>
                    </View>
                </View>

                    <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Address (Regn.)</Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
                <TextInput style={styles.input1} ></TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>State</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>City</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>District</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Pin</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Phone</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             title=' '
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Copy to Add(Res)</Text>
            <View style={styles.mobileSubView}>
          
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Copy to Add(Off)</Text>
            <View style={styles.mobileSubView}>
          
            </View>
        </View>

       
        </View>
}
     </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerImageStyle:{
        height:undefined,
        width:undefined,
        marginHorizontal:constant.moderateScale(8),
       marginBottom:constant.moderateScale(2),
       elevation:1
  
      },
      up_ListText:{
        fontSize:constant.moderateScale(13),
        color:'#3B3B3B',
        fontFamily:constant.typeRegular,
        marginLeft:constant.moderateScale(26)
      },
      upRightArrow:{
        height:constant.moderateScale(18),
        width:constant.moderateScale(18),
        marginRight:constant.moderateScale(10)
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
        //    paddingHorizontal:0
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

        tabMainView:{
            paddingBottom:'1%',
            height:constant.moderateScale(50),
           
            },
            tabSubView:{
             flex:1,
             borderBottomWidth:0.5,
             borderBottomColor:'#FE0F1780',
             flexDirection:'row',
             justifyContent:'space-between',
             marginHorizontal:'3%',
             paddingTop:constant.moderateScale(7),
            },
            tabButton:{
            width:constant.resW(20),
            justifyContent:'center'
            },
            tabButtonText:{
                fontSize:constant.moderateScale(15),
                color:constant.red,
                fontFamily:constant.typeMedium,
            marginTop:constant.moderateScale(4),
        
            },
            tabButton2:{
                width:constant.resW(20),
                justifyContent:'center'  
            },
            tabButtonText2:{
            fontSize:constant.moderateScale(15),
            color:constant.textColor,
            fontFamily:constant.typeLight,
            marginTop:constant.moderateScale(4),
        
            },
            horixontalLine:{
                height:constant.moderateScale(2.5),
                width:constant.moderateScale(45),
                backgroundColor:'red',
                position:'absolute',
                bottom:-constant.moderateScale(2),
                borderRadius:constant.resW(20)
            },
})