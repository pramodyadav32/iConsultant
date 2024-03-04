import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ImageBackground, View, Text, ScrollView, StatusBar, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import images from '../../utilities/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { userData_Action, emptyLoader_Action } from '../../redux/actions/AuthAction'
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button';
import * as constant from '../../utilities/constants'
import * as common from '../../utilities/common_fn'
import { apiCall, APIName } from '../../utilities/apiCaller'
import * as common_fn from '../../utilities/common_fn'
import SelectDropList from '../../components/SelectDropList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CustumerInfo(props) {
    const { data,prospectMaster, prospectDetail} = props
    const dispatch = useDispatch()
    const [activeIndex,setActiveIndex] = useState(true)
    const [active, setActive] = useState(1)
    const [stateData, setStateData] = useState([])
    const [stateValue, setStateValue] = useState({})
    const [cityData, setCityData] = useState([])
    const [cityValue, setCityValue] = useState({})
    const [title, setTitle] = useState([])
    const [titleValue, setTitleValue] = useState({})
    const [titleSonValue,setTitleSonValue] = useState({"code" : "","description":" "})
    const [name,setName] = useState("")
    const [sonName,setSonName] = useState("")
    const [mobileno,setMobileno] = useState("")
    const [email,setEmail] = useState("")
    const [panData,setPanData] = useState("")
    const [empName,setEmpName] = useState("")
    const [empMail,setEmpMail] = useState("")
    const [destination,setDestination] = useState("")
    const [prospectTypeData,setProspectData] = useState([])
    const [prospectTypeValue,setProspectTypeValue] = useState({})
    const [gender,setGender] = useState(true)
    const [materialStaus,setMaterialStatus] = useState(true)

   


    const fn_TabClick = (type) => {
        console.log("type")
        type === active ? setActive(0) : setActive(type)
        // setActive(type)
      
    }


 

    return (
        <View style={{ flex: 1, paddingBottom: constant.moderateScale(15) }}>
           <ScrollView showsVerticalScrollIndicator={false}>
           <View style={{flex:1,backgroundColor:constant.whiteColor,borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingBottom:constant.moderateScale(20)}}>

           <ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(1)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>User Details</Text>
                 <FastImage source={ active===1 ? images.downArrow : images.rightArrow} style={active===1 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===1 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Occupation<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Age<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Designation</Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Annual Family Income</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Gender</Text>
            <View style={styles.mobileSubView}>
           <Pressable style={styles.radioButton} onPress={()=>setGender(true)}>
            <MaterialCommunityIcons name={gender ? 'radiobox-marked' : 'radiobox-blank'} style={gender ? styles.readioIcon2 : styles.readioIcon} />
            <Text style={styles.materialText}  >Male</Text>
           </Pressable>
           <Pressable style={styles.radioButton} onPress={()=>setGender(false)}>
            <MaterialCommunityIcons name={gender ? 'radiobox-blank' :'radiobox-marked' } style={ gender ? styles.readioIcon : styles.readioIcon2} />
            <Text style={styles.materialText}  >Female</Text>
           </Pressable>
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Material Status</Text>
            <View style={styles.mobileSubView}>
           <Pressable style={styles.radioButton} onPress={()=>setMaterialStatus(true)}>
            <MaterialCommunityIcons name={materialStaus ? 'radiobox-marked' :'radiobox-blank'} style={[materialStaus ? styles.readioIcon2 : styles.readioIcon]} />
            <Text style={styles.materialText}  >Single</Text>
           </Pressable>
           <Pressable style={styles.radioButton} onPress={()=>setMaterialStatus(false)}>
            <MaterialCommunityIcons name={materialStaus ? 'radiobox-blank' : 'radiobox-marked' } style={materialStaus ? styles.readioIcon : styles.readioIcon2} />
            <Text style={styles.materialText}  >Married</Text>
           </Pressable>
            </View>
        </View>
         

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Anniversary date</Text>
            <Pressable style={styles.calenderMainView} onPress={()=>null}>
       <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}></TextInput>
       <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
    </Pressable>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Family Size</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
       <Text style={styles.detailText}>DOB</Text>
    <Pressable style={styles.calenderMainView} onPress={()=>null}>
       <TextInput placeholder='Please Select' editable={false} style={styles.calenderInput}></TextInput>
       <FastImage source={images.calender} resizeMode='contain' style={styles.calenderStyle} />
    </Pressable>
   </View>
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Notes</Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={[styles.input1,{height:constant.moderateScale(80),textAlignVertical:'top'}]} >{destination}</TextInput>
        </View>
     
        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(2)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Purchased / Financed</Text>
                 <FastImage source={ active===2 ? images.downArrow : images.rightArrow} style={active===2 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===2 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Purchase Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Payment Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Competion Models<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Down Payment (Rs.)<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>
        
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>EMI/Interest rate (Rs.)<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Loan Tenure in months<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Bank/Financer Name</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 
        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(3)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Usage [SCAB]</Text>
                 <FastImage source={ active===3 ? images.downArrow : images.rightArrow} style={active===3 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===3 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage Frequency</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Type of Travelling</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Payment Type<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Type of Body Built<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Additional Leaf Spring<Text style={styles.text2}>*</Text></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>
        
        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}>Distance Per Day</Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Average Speed</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Load body<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Driven Mostly by</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Reason to Choose ISUZU<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Trigger to Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Cabin<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Any Modifications intend to do<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={[styles.detailMainView,{marginBottom:constant.moderateScale(10)}]}>
            <Text style={styles.detailText}></Text>
                <TextInput onChangeText={(d)=>setDestination(d)} style={styles.input1} >{destination}</TextInput>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Reason to Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(4)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Vehicles Owned</Text>
                 <FastImage source={ active===4 ? images.downArrow : images.rightArrow} style={active===4 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===4 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage<Text style={styles.text2}>*</Text></Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Body Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Year of Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Qty</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        </View>
}

<ImageBackground source={images.listHeaderCard} resizeMode='stretch' style={styles.headerImageStyle}>
                 <Pressable onPress={()=>fn_TabClick(5)} style={{flex:1,paddingVertical:constant.moderateScale(15),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                 <Text style={styles.up_ListText}>Vehicles Replaced</Text>
                 <FastImage source={ active===5 ? images.downArrow : images.rightArrow} style={active===5 ?styles.upRightArrow2 : styles.upRightArrow} />
                 </Pressable>
                 </ImageBackground>
   {active ===5 && <View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Usage</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Body Type</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Brand</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

 
        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Model</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View>

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Variant</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Year of Purchase</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        <View style={styles.detailMainView}>
            <Text style={styles.detailText}>Qty</Text>
            <View style={styles.mobileSubView}>
            <SelectDropList 
             list={[]}
             buttonExt={styles.dropList}
             textExt={styles.dropListText}
            //  on_Select={(d)=>setProspectTypeValue(d)}
           />
            </View>
        </View> 

        </View>
}
</View>
<Button title='Save' click_Action={() => fn_Create()} buttonExt={styles.performaButton} />

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
        marginLeft:constant.moderateScale(18)
      },
      upRightArrow:{
        height:constant.moderateScale(16),
        width:constant.moderateScale(16),
        marginRight:constant.moderateScale(10)
      },
      upRightArrow2:{
        height:constant.moderateScale(25),
        width:constant.moderateScale(25),
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
            width:constant.resW(19),
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
            materialText:{
                color:'#000000',
                fontFamily:constant.typeRegular,
                fontSize:constant.moderateScale(13),
                marginLeft:constant.moderateScale(7)
            },
            radioButton:{
            flexDirection:'row',
            alignItems:'center',
            flex:1,
            paddingVertical:constant.moderateScale(5)
            },
            readioIcon:{
             fontSize:constant.moderateScale(25),
             color:'#BEBEBE',

            },
            readioIcon2:{
                fontSize:constant.moderateScale(25),
                color:constant.red,
                
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