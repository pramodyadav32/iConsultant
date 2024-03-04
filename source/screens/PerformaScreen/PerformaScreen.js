import React, { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, SafeAreaView, Pressable, Text, Image, ImageBackground, StatusBar, Animated, TextInput, StyleSheet } from 'react-native';
import * as constant from '../../utilities/constants'
import styles from './PerformaStyle';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../components/HomeHeader';
import FastImage from 'react-native-fast-image';
import images from '../../utilities/images';
import * as common_fn from '../../utilities/common_fn'
import { APIName, imageUrl, tokenApiCall } from '../../utilities/apiCaller';
import CommonHeader from '../../components/CommonHeader';
import SelectDropList from '../../components/SelectDropList';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DataSheetModal from '../../components/DataSheetModal';
import AddPackageModel from './AddPackageModel';
import PerformaBasicInfo from './PerformaBasicInfo';

const data = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data2 = [
   { 'key': 1, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 2, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },
   { 'key': 3, "title": 'Your Profile', 'source': images.profile, 'screenName': 'HomeScreen' },

]

const data3 = [
   { 'key': 1, "title": 'Basic Info', },
   { 'key': 2, "title": 'Accessories', },
   { 'key': 3, "title": 'Package', },
   { 'key': 4, "title": 'Insurance', },
   { 'key': 5, "title": 'Registration', },
   { 'key': 6, "title": 'Term', },

   
]

export default function PerformaScreen(props) {
   const { navigation } = props
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.AuthReducer)
   const tabWidth = constant.resW(49);
   const [active, setActive] = useState(1)
   const [animatedValue] = useState(new Animated.Value(1));
   const [detailModal,setDetailModal] = useState(false)
   const [packageModel,setPackageModel] = useState(false)
   const [addListModel,setAddListModel] = useState(false)
   const interpolateX = animatedValue.interpolate({
      inputRange: [0, 1, 2, 3, 4], // Adjust based on the number of tabs
      outputRange: [0, constant.resW(3), constant.resW(26), tabWidth, constant.resW(79)],
   });

   useEffect(()=>{
   //  fn_GetProspectBasicInfo()
   fn_GetProspectDetail()
   },[])

   const fn_GetProspectBasicInfo = () => {
      let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "prospectNo": 8325,
        "loginUserCompanyId": "ORBIT",
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
      }
      tokenApiCall(GetProspectBasicInfoCallBack, APIName.GetProspectBasicInfo, "POST", param)
    }
  
    const GetProspectBasicInfoCallBack = (res) => {
      console.log("search", JSON.stringify(res))
      if (res.statusCode === 200) {
  
      } else {
        constant.showMsg(res.message)
      }
    }

    const fn_GetProspectDetail= () => {
      let param = {
        "brandCode": userData?.brandCode,
        "countryCode": userData?.countryCode,
        "companyId": userData?.companyId,
        "prospectNo": 8325,
        "loginUserCompanyId": "ORBIT",
        "loginUserId": userData?.userId,
        "ipAddress": "1::1"
      }
      tokenApiCall(GetProspectDetailCallBack, APIName.GetProspectDetails, "POST", param)
    }
  
    const GetProspectDetailCallBack = (res) => {
      console.log("search", JSON.stringify(res))
      if (res.statusCode === 200) {
  
      } else {
        constant.showMsg(res.message)
      }
    }



   const renderItem = () => {
      return (
         <ImageBackground source={images.performaCard} resizeMode='stretch' imageStyle={{ borderRadius: 10 }} style={styles.listBgStyle}>
            <Pressable style={styles.driveListMainView}  >
               <Pressable style={styles.driveListTopView1} onPress={()=>setDetailModal(true)}>
                  <Text style={styles.text2}>OLM</Text>
                  <AntDesign name='close' style={styles.closeIcon} />
               </Pressable>
               <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1.8,marginTop:constant.moderateScale(7) }}>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(2) }]}>
                     <View style={styles.driveListDetailSubView}>
                     <FastImage source={require('../../assets/dummy/car.png')} resizeMode='contain' style={styles.carImage} />

                     </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Prospect Name</Text>
                           <Text numberOfLines={2} style={[styles.listName3, { width: '90%' }]}>Mr.Amarjeet Singh</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>Model</Text>
                           <Text style={styles.listName3}>D-MAX</Text>
                        </View>
                        <View style={styles.driveListDetailSubView2}>
                           <Text style={styles.listText2}>MY/VY</Text>
                           <Text style={styles.listName3}>2024/2024</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                     <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Vehicle Cost</Text>
                           <Text style={styles.listName3}>907,300.00</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Temp Regn</Text>
                           <Text style={styles.listName3}>NIL</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Hypo Charges</Text>
                           <Text style={styles.listName3}>22-Jan-2024</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Service Charges</Text>
                           <Text style={styles.listName3}>22-Jan-2024</Text>
                        </View>
                     </View>
                     <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(8) }]}>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Extd Warr Pack</Text>
                           <Text style={styles.listName3}>NIL</Text>
                        </View>
                       
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Accessories (Performa)</Text>
                           <Text style={styles.listName3}>3500.00</Text>
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           {/* <Text style={styles.listText2}>Accessories (Performa)</Text> */}
                           {/* <Text style={styles.listName3}>3500.00</Text> */}
                        </View>
                        <View style={styles.driveListDetailSubView}>
                           <Text style={styles.listText2}>Total</Text>
                           <Text style={styles.listName3}>910950.00</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </Pressable>
         </ImageBackground>
      )
   }

   const fn_TabClick = (type) => {
      setActive(type)
      Animated.timing(animatedValue, {
         toValue: type,
         duration: 800, // Adjust the duration of the animation
         useNativeDriver: false,
      }).start();
   }

   const actionRenderItem = ({ item, index }) => {
      return (
         <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
            <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
               <View style={[styles.driveListDetailSubView, {}]}>
                  <Text style={styles.listText2}>Action</Text>
                  <Text style={styles.listText3}>Test Drive</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Due on </Text>
                  <Text style={styles.listText3}>14-Feb-2024</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Stutus</Text>
                  <Text style={styles.listText3}>Active</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Completed on</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
            </View>

            <View style={styles.driveListDetailView}>
               <View style={styles.driveListDetailSubView}>
                  <Text style={styles.listText2}>Remarks</Text>
                  <Text style={styles.listText3}>-</Text>
               </View>
               <View style={styles.driveListDetailSubView2}>
                  <Text style={styles.listText2}>Projected Closure Data</Text>
                  <Text style={styles.listText3}>Standard</Text>
               </View>
            </View>



         </View>
      )
   }

   const prospectInfoRenderItem=({item,index})=>{
      return(
         <View style={{ backgroundColor: '#F9F9F9', borderWidth: 1, borderRadius: 10, borderColor: constant.whiteColor, marginHorizontal: constant.moderateScale(5), paddingBottom: constant.moderateScale(10), elevation: 1 }}>
         <View style={[styles.driveListDetailView, { marginTop: constant.moderateScale(10) }]}>
            <View style={[styles.driveListDetailSubView, {}]}>
               <Text style={styles.listText2}>Address(Regn)</Text>
               <Text style={styles.listText3}>-</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>State </Text>
               <Text style={styles.listText3}>Haryana</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>City</Text>
               <Text style={styles.listText3}>Faridabad</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>Sub-Zone</Text>
               <Text style={styles.listText3}>-</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>District</Text>
               <Text style={styles.listText3}>Faridabad</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>PIN</Text>
               <Text style={styles.listText3}>121001</Text>
            </View>
         </View>

         <View style={styles.driveListDetailView}>
            <View style={styles.driveListDetailSubView}>
               <Text style={styles.listText2}>Phone</Text>
               <Text style={styles.listText3}>9888888888</Text>
            </View>
            <View style={styles.driveListDetailSubView2}>
               <Text style={styles.listText2}>Fax</Text>
               <Text style={styles.listText3}>46364</Text>
            </View>
         </View>

      </View>
      )
   }

   const fn_Create = () => {
      props.navigation.navigate("EditProspectScreen")
   }

  const accessoriesList=({item,index})=>{
   return(
      <View style={[styles. costListMainView,{marginTop:constant.moderateScale(10)}]}>
      <View style={[styles.driveListDetailSubView,{}]}>
         <Text style={styles.costListText2}> </Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}>00.00</Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}>0</Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}>00.00</Text>
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
         <Text style={styles.costListText2}>MRP</Text>
      </View>
      <View style={styles.costListSubView3}>
         <Text style={styles.costListText2}>QTY</Text>
      </View>
      <View style={styles.costListSubView3}>
         <Text style={styles.costListText2}>Total Amt</Text>
      </View>
     </View>
   )
  }

  const accessoriesFooterList=()=>{
   return(
      <View style={[styles. costListMainView,{backgroundColor:'#F0F0F0',borderBottomRightRadius:10,borderBottomLeftRadius:10,paddingVertical:constant.moderateScale(7),paddingHorizontal:10,marginHorizontal:0}]}>
      <View style={[styles.driveListDetailSubView,{}]}>
         <Text style={styles.costListText2}>Total</Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}> </Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}>0</Text>
      </View>
      <View style={[styles.costListSubView3,{}]}>
      <Text style={styles.costListText3}>00.00</Text>
      </View>
      </View>
   )
  }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E1E1E1' }}>
         <StatusBar translucent={false} backgroundColor={constant.blackColor} />
         <CommonHeader title='Performa' mainExt={styles.drawerStyle} onBack={() => navigation.goBack()} />
         <View>
            <FlatList
               data={data}
               renderItem={renderItem}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(5))}
               ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
               ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}
            />
         </View>

         <View style={styles.cal_SubView}>
         <View style={styles.tabSubView}>
          <FlatList
          horizontal
          data={data3}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=>common_fn.listVer_Space(constant.moderateScale(15))}
          renderItem={({item,index}) => {
            return(
              <Pressable style={index === active ? styles.tabButton : styles.tabButton2} onPress={() => fn_TabClick(index, item)} >
              <Text style={active === index ? styles.tabButtonText : styles.tabButtonText2}>{item?.title}</Text>
              {active === index && <View style={styles.horixontalLine} />}
            </Pressable>
            )
          }}
        />
          </View>
        
            {
               active === 0 &&
             <PerformaBasicInfo />
            }
            {
               active === 1 &&
               <View style={{ flex: 1, paddingHorizontal: '1%',paddingBottom:constant.moderateScale(15)  }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{backgroundColor:'#F9F9F9',borderRadius:10,paddingHorizontal:constant.moderateScale(0),marginTop:constant.moderateScale(13),paddingBottom:constant.moderateScale(0)}}>
                 <FlatList 
                  data={data2}
                  ListHeaderComponent={()=>accessoriesHeaderList()}
                  renderItem={accessoriesList}
                  ListFooterComponent={()=>accessoriesFooterList()}
                 />
                </View>
          
                  </ScrollView>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                  <Button title='Add To List' click_Action={() => setAddListModel(true)} buttonExt={styles.button1} />
                  <Button title='Add Packages' click_Action={() => setPackageModel(true)} buttonExt={styles.button1} />

                  </View>
               </View>
            }
            {active === 3 &&
               <View style={{ flex: 1 }}>
                   <FlatList
                     data={data2}
                     showsVerticalScrollIndicator={false}
                     renderItem={prospectInfoRenderItem}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}

                  />
            
               </View>
            }
            {active === 4 &&
               <View style={{ flex: 1 }}>
                  <FlatList
                     data={data2}
                     renderItem={actionRenderItem}
                     showsVerticalScrollIndicator={false}
                     ListHeaderComponent={() => common_fn.listSpace(constant.moderateScale(1))}
                     ItemSeparatorComponent={() => common_fn.listSpace(constant.moderateScale(7))}
                     ListFooterComponent={() => common_fn.listSpace(constant.moderateScale(10))}

                  />
               </View>
            }
         </View>
         {/* <Button title='Create Proforma' click_Action={() => fn_Create()} buttonExt={styles.performaButton} /> */}
     

      <AddPackageModel
       isVisible={packageModel}
       onRequestClose={()=>setPackageModel(false)} 
      />
      </SafeAreaView>
   )
}

